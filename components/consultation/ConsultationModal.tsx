"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ConsultationForm } from "./ConsultationForm";
import styles from "./Consultation.module.css";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The CTA or page the request came from, submitted with the form. */
  source?: string;
}

/**
 * The consultation dialog.
 *
 * BUILT ON <dialog>, NOT ON A DIV.
 *
 * The element gives, natively and correctly: the top layer, so no z-index
 * contest with the sticky header or the back-to-top button; a focus trap;
 * `inert` on everything behind it, so a screen reader cannot wander out of
 * the dialog into the page; Escape to close; and focus returned to the
 * element that opened it when it closes. Every one of those is a thing
 * hand-rolled modals get subtly wrong, and none of it is our code to break.
 *
 * What it does not give is a scroll lock or an animation, so those are here.
 *
 * The dialog element stays mounted while closed — only `showModal()` and
 * `close()` are driven by state — which is what keeps a half-filled form
 * intact across an accidental close.
 */
export function ConsultationModal({ isOpen, onClose, source }: ConsultationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pressedBackdrop = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  /**
   * Closing runs the animation first and only then tells the element to
   * close, because a dialog that closes is removed from the top layer
   * immediately — there would be nothing left on screen to animate.
   *
   * Reduced motion is handled by the tokens: --dur-base collapses to 1ms, so
   * the timeout resolves on the next tick instead of needing its own branch.
   */
  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) {
      onClose();
      return;
    }
    setIsClosing(true);
  }, [onClose]);

  /* Open and close the element in step with the state that owns it. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      setIsClosing(false);
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  /* The closing animation, then the actual close. */
  useEffect(() => {
    if (!isClosing) return;
    const panel = panelRef.current;
    const dialog = dialogRef.current;

    const finish = () => {
      setIsClosing(false);
      dialog?.close();
      onClose();
    };

    if (!panel) {
      finish();
      return;
    }

    /*
     * A timeout as well as the event: if the animation is interrupted — a
     * tab going to the background is the usual way — animationend never
     * fires and the dialog would be stuck half closed.
     */
    const timer = window.setTimeout(finish, 400);
    panel.addEventListener("animationend", finish, { once: true });
    return () => {
      window.clearTimeout(timer);
      panel.removeEventListener("animationend", finish);
    };
  }, [isClosing, onClose]);

  /*
   * Escape is the element's own behaviour; all this does is route it through
   * the same closing animation as the button, and keep React's state in step
   * with an element that would otherwise have closed itself behind its back.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      requestClose();
    };
    const onNativeClose = () => onClose();

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onNativeClose);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onNativeClose);
    };
  }, [requestClose, onClose]);

  /*
   * Background scroll lock.
   *
   * The scrollbar's width is added back as padding, because removing a
   * 15px-wide scrollbar shifts the whole page left underneath the backdrop —
   * a visible jolt on every open and close.
   */
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen]);

  /*
   * Backdrop click.
   *
   * The press and the release both have to land on the dialog itself — the
   * backdrop — rather than on the panel inside it. Checking only the click
   * would close the modal when a drag that started inside a textarea happened
   * to finish outside it, which is the exact "conflict with form interaction"
   * this has to avoid. Nothing is lost either way: the form is not unmounted,
   * so reopening restores what was typed.
   */
  const onPointerDown = (event: React.MouseEvent<HTMLDialogElement>) => {
    pressedBackdrop.current = event.target === dialogRef.current;
  };

  const onClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (pressedBackdrop.current && event.target === dialogRef.current) {
      requestClose();
    }
    pressedBackdrop.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-closing={isClosing ? "true" : undefined}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onMouseDown={onPointerDown}
      onClick={onClick}
    >
      {/*
        The panel is a separate element from the dialog so the backdrop has
        something to be beside: a click on the dialog is a click on the
        backdrop, and a click on the panel is not.
      */}
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={styles.title} id={titleId}>
              Book A Consultation
            </h2>
            <p className={styles.lead} id={descriptionId}>
              Thirty minutes on the problem you are trying to solve — not a
              pitch. Tell us what you need and when suits you, and we will
              confirm the slot by email.
            </p>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={requestClose}
            aria-label="Close the consultation form"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* The scrolling region is the body, so the header and the close
            button stay reachable however long the form gets. */}
        <div className={styles.body}>
          <ConsultationForm source={source} onDone={requestClose} />
        </div>
      </div>
    </dialog>
  );
}
