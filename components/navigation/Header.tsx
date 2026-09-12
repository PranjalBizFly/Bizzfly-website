"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PrimaryNavItem } from "@/types/content";

import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Chevron } from "./Chevron";
import { SearchIcon } from "./NavIcons";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import dynamic from "next/dynamic";

/*
  The search dialog and its index are not in the initial bundle. They load on
  first invocation (⌘K, "/", or the trigger), which keeps the cost off every
  page load for the majority of visitors who never open search.
*/
const SearchDialog = dynamic(
  () => import("@/components/search/SearchDialog").then((m) => m.SearchDialog),
  { ssr: false },
);
import { ConsultationCta } from "@/components/consultation";
import styles from "./Header.module.css";
import { titleCase } from "@/lib/titleCase";

const HOVER_INTENT_MS = 120;
const HOVER_CLOSE_MS = 200;

/**
 * Which interaction opened the panel.
 *
 * This distinction is the whole fix for "clicking Services does nothing".
 * Hover and click both wrote to one boolean before, so the ordinary path —
 * move the pointer onto the trigger, then click it — opened the panel on
 * hover and the click immediately toggled it shut again. The panel flashed
 * and closed, which reads as a dead control rather than as a menu.
 *
 * Tracking the source means a click on a hover-opened panel promotes it to
 * "click" and leaves it open, and only pointer-opened panels close when the
 * pointer leaves. A panel the visitor deliberately clicked open stays open
 * until they close it, click elsewhere, or press Escape.
 */
type OpenState = { index: number; source: "hover" | "click" } | null;

interface HeaderProps {
  /*
    Navigation is passed in from the server layout rather than imported.
    Importing content/navigation.ts here would pull every service, industry
    and use-case object — including their full body copy, FAQs and process
    steps — into the client bundle just to render menu labels.
  */
  nav: PrimaryNavItem[];
  cta: { label: string; href: string };
}

export function Header({ nav, cta }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<OpenState>(null);
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  /*
   * Which modifier the shortcut chip prints.
   *
   * The handler below takes metaKey OR ctrlKey, so the shortcut has always
   * worked on both platforms — the chip just said "⌘K" to everyone, telling
   * the Windows and Linux majority to press a key their keyboard does not
   * have. Starts false so the server and the first client render agree, and
   * resolves on mount; the swap is one glyph, inside a chip that is already
   * sized for the wider "Ctrl" spelling.
   */
  const [isMac, setIsMac] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openIndex = open?.index ?? null;

  /*
    The keyboard handler and the outside-click handler both need the live
    open state, and neither should be torn down and rebuilt every time it
    changes. A ref gives them the current value without going in the
    dependency array.
  */
  const openRef = useRef<OpenState>(null);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  /*
    The chunk is fetched on intent rather than on click, so the dialog is
    already in memory by the time the pointer arrives. It is still not in the
    initial bundle — a visitor who never goes near search never pays for it.
  */
  const prefetchSearch = useCallback(() => {
    void import("@/components/search/SearchDialog");
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpened(true);
    setSearchOpen(true);
  }, []);

  /* Stable, so the dialog's document-level Escape listener is bound once
     rather than re-subscribed on every scroll-driven header render. */
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const closePanel = useCallback(() => {
    clearHoverTimer();
    setOpen(null);
  }, []);

  /* Escape returns the visitor to the control they opened the menu from. */
  const closePanelAndRestoreFocus = useCallback(() => {
    const current = openRef.current;
    clearHoverTimer();
    setOpen(null);
    if (current) triggerRefs.current[current.index]?.focus();
  }, []);

  /* Close menus on navigation. */
  useEffect(() => {
    closePanel();
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname, closePanel]);

  /* Condense on scroll. Passive listener, no layout read per frame. */
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    Anything outside the nav closes an open panel — the scrim below the
    header, but also the logo, the theme toggle and the bare strip of header
    beside them, none of which the scrim covers. Bound on pointerdown so the
    panel is gone before a click lands, and scoped to the nav element, which
    contains both the triggers and the panels: a pointerdown on a menu link
    is inside it, so following a link is untouched.
  */
  useEffect(() => {
    if (open === null) return;

    const onPointerDown = (event: PointerEvent) => {
      const node = navRef.current;
      if (node && !node.contains(event.target as Node)) closePanel();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closePanel]);

  /* Resolve the platform once, for the shortcut chip only. */
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMac(/Mac|iPhone|iPad|iPod/.test(ua));
  }, []);

  /* Escape closes the panel; Cmd/Ctrl+K and "/" open search. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openRef.current) {
        closePanelAndRestoreFocus();
        return;
      }

      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
        return;
      }
      if (event.key === "/" && !typing && !searchOpen) {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePanelAndRestoreFocus, searchOpen, openSearch]);

  /* Clear any pending open/close when the header unmounts. */
  useEffect(() => clearHoverTimer, []);

  const handleEnter = (index: number) => {
    clearHoverTimer();
    // No intent delay if another panel is already open.
    const delay = openRef.current === null ? HOVER_INTENT_MS : 0;
    hoverTimer.current = setTimeout(
      () => setOpen({ index, source: "hover" }),
      delay,
    );
  };

  /*
    Only pointer-opened panels close on pointer-out. Closing a click-opened
    panel the moment the pointer drifts off the header is the other half of
    the hover/click conflict: the visitor commits with a click and the menu
    still evaporates on a stray movement.
  */
  const handleHoverAway = () => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => {
      setOpen((current) => (current?.source === "hover" ? null : current));
    }, HOVER_CLOSE_MS);
  };

  const handleTriggerClick = (index: number) => {
    clearHoverTimer();
    setOpen((current) =>
      current && current.index === index && current.source === "click"
        ? null
        : { index, source: "click" },
    );
  };

  /*
    "/" is a prefix of every route, so Home has to match exactly or it would
    light up on every page.
  */
  const isActive = (item: PrimaryNavItem) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(item.href);

  return (
    <>
      <header
        className={styles.header}
        data-condensed={condensed}
        onMouseLeave={handleHoverAway}
      >
        <Container>
          <div className={styles.inner}>
            <Link href="/" className={styles.brand} aria-label="BizzFly, home">
              {/*
                clearspace is handled by the header's own geometry rather than
                by padding on the mark: the 80px bar leaves 25px above and
                below a 30px logo, and the nav starts a further 24px away.
                Both clear the 23.2px the cap-height rule requires, without
                spending 46px of horizontal room the nav needs at 1024px.
                alt is empty because the link is already labelled.
              */}
              <BrandLogo alt="" clearspace={false} priority />
            </Link>

            <nav ref={navRef} className={styles.nav} aria-label="Primary">
              {nav.map((item, index) => {
                const hasPanel = Boolean(item.panel);
                const isOpen = openIndex === index;
                const panelId = `megamenu-${index}`;

                return (
                  <div
                    key={item.label}
                    className={styles.navItem}
                    data-open={isOpen}
                    onMouseEnter={() =>
                      hasPanel ? handleEnter(index) : handleHoverAway()
                    }
                  >
                    {hasPanel ? (
                      <button
                        type="button"
                        ref={(node) => {
                          triggerRefs.current[index] = node;
                        }}
                        className={styles.navLink}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        aria-haspopup="true"
                        data-active={isActive(item)}
                        onClick={() => handleTriggerClick(index)}
                      >
                        {titleCase(item.label)}
                        <Chevron open={isOpen} className={styles.chevron} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={styles.navLink}
                        data-active={isActive(item)}
                      >
                        {titleCase(item.label)}
                      </Link>
                    )}

                    {hasPanel && isOpen && item.panel ? (
                      <MegaMenu
                        id={panelId}
                        label={item.label}
                        panel={item.panel}
                        onClose={closePanel}
                      />
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.searchTrigger}
                onClick={openSearch}
                onPointerEnter={prefetchSearch}
                onFocus={prefetchSearch}
              >
                <SearchIcon className={styles.searchIcon} />
                <span className={styles.searchLabel}>Search</span>
                <kbd className={styles.kbd}>{isMac ? "⌘" : "Ctrl"} K</kbd>
              </button>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.searchToggleMobile}`}
                onClick={openSearch}
                onPointerEnter={prefetchSearch}
                onFocus={prefetchSearch}
                aria-label="Open search"
              >
                <SearchIcon className={styles.searchIcon} />
              </button>

              {/*
                Hidden below md: at 320–420px the bar already carries the
                logo, search and the menu button, and a fourth control
                pushes the CTA off the edge. The mobile drawer carries the
                toggle instead, so it is never unreachable.
              */}
              <ThemeToggle className={styles.themeToggle} />

              {/*
                The header CTA opens the booking dialog rather than
                navigating, like every other conversion CTA on the site. It
                is still a link to the contact page underneath — see
                ConsultationCta — so nothing about it breaks without
                JavaScript, and it can still be opened in a new tab.
              */}
              <ConsultationCta
                href={cta.href}
                size="sm"
                className={styles.headerCta}
                source="Header"
              >
                {titleCase(cta.label)}
              </ConsultationCta>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.menuToggle}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <span aria-hidden="true">&#9776;</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/*
        Presentational only. Dismissal is owned by the document-level
        pointerdown handler above, which covers the header itself as well as
        the area this darkens — so the scrim no longer has to be a
        full-viewport <button> sitting in the accessibility tree.
      */}
      {open !== null ? <div className={styles.scrim} aria-hidden="true" /> : null}

      <MobileNav
        nav={nav}
        cta={cta}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => {
          setMobileOpen(false);
          openSearch();
        }}
      />

      {searchOpened ? (
        <SearchDialog open={searchOpen} onClose={closeSearch} />
      ) : null}
    </>
  );
}
