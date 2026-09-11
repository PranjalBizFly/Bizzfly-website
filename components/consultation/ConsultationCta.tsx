"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useConsultation } from "./ConsultationProvider";
import buttons from "@/components/buttons/Button.module.css";

interface ConsultationCtaProps {
  children: ReactNode;
  /** Where the link goes if the modal cannot open. Always a real page. */
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "lg" | "md" | "sm";
  withArrow?: boolean;
  className?: string;
  /** Recorded with the submission, so an enquiry traces back to its CTA. */
  source?: string;
}

/**
 * A consultation CTA.
 *
 * Still an anchor to /contact/, not a button.
 *
 * That is the whole design. The modal is an enhancement over a link that
 * already works: with no JavaScript, with the script still loading, or if the
 * provider is missing, the CTA navigates to the contact page exactly as it
 * did before. Middle-click, ctrl-click and "open in new tab" keep working
 * because the element is a real link with a real href, and a crawler
 * following it finds a page rather than a dead button.
 *
 * Only a plain left click is intercepted, and only once the provider is
 * there to intercept it with.
 */
export function ConsultationCta({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  source,
}: ConsultationCtaProps) {
  const consultation = useConsultation();

  const classes =
    `${buttons.base} ${buttons[variant]} ${buttons[size]} ${className}`.trim();

  return (
    <Link
      href={href}
      className={classes}
      onClick={(event) => {
        /* Let the browser have the click when it means something else. */
        if (
          !consultation ||
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        consultation.open(source, event.currentTarget);
      }}
    >
      {children}
      {withArrow ? (
        <span className={buttons.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
