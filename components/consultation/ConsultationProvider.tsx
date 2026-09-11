"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ConsultationModal } from "./ConsultationModal";

interface ConsultationContextValue {
  isOpen: boolean;
  /**
   * Opens the modal. `source` is the page or component the request came from,
   * and is submitted with the form so an enquiry can be traced to the CTA
   * that produced it.
   */
  open: (source?: string, trigger?: HTMLElement | null) => void;
  close: () => void;
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

/**
 * One consultation modal for the whole site.
 *
 * Mounted once in the root layout rather than per page, for three reasons
 * that all follow from the same fact — the modal holds a half-filled form.
 *
 * It survives closing. A visitor who opens it, closes it to check something
 * on the page and opens it again finds what they typed still there, because
 * the form is never unmounted. That is also what makes closing on a backdrop
 * click safe rather than destructive.
 *
 * It survives navigation. The layout does not remount between pages in the
 * App Router, so following a link with the modal open — or after filling half
 * of it in — does not throw the entry away.
 *
 * And there is exactly one of it: every CTA on the site opens the same
 * dialog, so the booking experience cannot drift between pages.
 */
export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("");
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback((from?: string, fromElement?: HTMLElement | null) => {
    /*
     * Remember what opened it, so focus goes back there on close.
     *
     * <dialog> restores focus on its own, but only to whatever had focus
     * when showModal ran. A CTA activated with Enter has focus; one activated
     * by a tap does not reliably, and focus then returns to the body — a
     * keyboard visitor lands back at the top of the page instead of at the
     * button they just pressed. The CTA passes itself, so the return is not
     * a guess about what the browser focused.
     */
    trigger.current =
      fromElement ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    if (from) setSource(from);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const returnTo = trigger.current;
    if (!returnTo?.isConnected) return;
    /*
     * After the dialog has actually closed, or the element gives focus
     * straight back to the dialog that is still closing over it.
     */
    requestAnimationFrame(() => returnTo.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={close} source={source} />
    </ConsultationContext.Provider>
  );
}

/**
 * Access to the modal from any client component.
 *
 * Returns null outside the provider rather than throwing: a CTA that cannot
 * find the modal should fall back to its href — which is the contact page,
 * and a working destination — not crash the page it is on.
 */
export function useConsultation(): ConsultationContextValue | null {
  return useContext(ConsultationContext);
}
