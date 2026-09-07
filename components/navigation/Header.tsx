"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PrimaryNavItem } from "@/types/content";

import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/buttons";
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
import styles from "./Header.module.css";

const HOVER_INTENT_MS = 120;

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openSearch = useCallback(() => {
    setSearchOpened(true);
    setSearchOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenIndex(null);
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

  /* Escape closes the panel; Cmd/Ctrl+K and "/" open search. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();

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
  }, [closePanel, searchOpen, openSearch]);

  const handleEnter = (index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // No intent delay if another panel is already open.
    const delay = openIndex === null ? HOVER_INTENT_MS : 0;
    hoverTimer.current = setTimeout(() => setOpenIndex(index), delay);
  };

  const handleLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenIndex(null), 200);
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
        ref={headerRef}
        className={`${styles.header} is-inverse`}
        data-condensed={condensed}
        onMouseLeave={handleLeave}
      >
        <Container>
          <div className={styles.inner}>
            <Link href="/" className={styles.brand} aria-label="BizzFly — home">
              {/*
                clearspace is handled by the header's own geometry rather than
                by padding on the mark: the 80px bar leaves 25px above and
                below a 30px logo, and the nav starts a further 24px away.
                Both clear the 23.2px the cap-height rule requires, without
                spending 46px of horizontal room the nav needs at 1024px.
                alt is empty because the link is already labelled.
              */}
              <BrandLogo
                variant="reversed"
                alt=""
                clearspace={false}
                priority
                className={styles.brandFull}
              />
              {/*
                Between lg and xl the full nav, search and CTA leave no room
                for the 132px lockup — it pushed the CTA off-screen. The
                official symbol stands in for that band only. It is the same
                artwork, not a redrawn or condensed lockup.
              */}
              <BrandLogo
                variant="symbol-reversed"
                alt=""
                clearspace={false}
                priority
                className={styles.brandCompact}
              />
            </Link>

            <nav className={styles.nav} aria-label="Primary">
              {nav.map((item, index) => {
                const hasPanel = Boolean(item.panel);
                const open = openIndex === index;
                const panelId = `megamenu-${index}`;

                return (
                  <div
                    key={item.label}
                    className={styles.navItem}
                    data-open={open}
                    onMouseEnter={() => hasPanel && handleEnter(index)}
                  >
                    {hasPanel ? (
                      <button
                        type="button"
                        className={styles.navLink}
                        aria-expanded={open}
                        aria-controls={panelId}
                        data-active={isActive(item)}
                        onClick={() => setOpenIndex(open ? null : index)}
                      >
                        {item.label}
                        <span className={styles.chevron} aria-hidden="true">
                          &#9662;
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={styles.navLink}
                        data-active={isActive(item)}
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasPanel && open && item.panel ? (
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
              >
                <span aria-hidden="true">&#9906;</span>
                Search
                <kbd className={styles.kbd}>&#8984;K</kbd>
              </button>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.searchToggleMobile}`}
                onClick={openSearch}
                aria-label="Open search"
              >
                <span aria-hidden="true">&#9906;</span>
              </button>

              {/*
                Hidden below md: at 320–420px the bar already carries the
                logo, search and the menu button, and a fourth control
                pushes the CTA off the edge. The mobile drawer carries the
                toggle instead, so it is never unreachable.
              */}
              <ThemeToggle className={styles.themeToggle} />

              <Button href={cta.href} size="sm" className={styles.headerCta}>
                {cta.label}
              </Button>

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

      {openIndex !== null ? (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closePanel}
        />
      ) : null}

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
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      ) : null}
    </>
  );
}
