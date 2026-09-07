"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { serviceGroups } from "@/content/service-meta";
import { site } from "@/content/site";
import { Button } from "@/components/buttons";
import { submitContact, type ContactState } from "@/app/contact/actions";
import styles from "./Form.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

/**
 * Contact form.
 *
 * Validation runs on the server (app/contact/actions.ts) so it cannot be
 * bypassed; the client-side checks below only save a round trip.
 *
 * The form never claims success unless the server confirms it. With no
 * backend configured it returns an "unavailable" state showing the real
 * contact details, rather than a message that goes nowhere.
 */
export function ContactForm() {
  const pathname = usePathname();
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    { status: "idle" },
  );

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const websiteId = useId();
  const topicId = useId();
  const messageId = useId();

  /* Validate on blur — errors while typing are hostile. */
  const validateField = (field: string, value: string) => {
    let message = "";
    if (field === "name" && value.trim().length < 2) {
      message = "Please enter your name.";
    }
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      message = "Please enter a valid email address.";
    }
    if (field === "message" && value.trim().length < 10) {
      message = "Please tell us a little about what you are trying to solve.";
    }
    setClientErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  if (state.status === "success") {
    return (
      <div className={styles.confirmation} role="status" aria-live="polite">
        <p className={styles.confirmationTitle}>{state.message}</p>
        <p className={styles.confirmationBody}>
          We reply within one business day. If it is urgent, call{" "}
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
        </p>
      </div>
    );
  }

  /* Honest state: the message was not sent, so we do not say it was. */
  if (state.status === "unavailable") {
    return (
      <div className={styles.fallback} role="alert" aria-live="assertive">
        <p className={styles.fallbackTitle}>Your message has not been sent</p>
        <p className={styles.confirmationBody}>{state.message}</p>
        <ul className={styles.fallbackList}>
          <li>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </li>
          <li>
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          </li>
        </ul>
      </div>
    );
  }

  const serverErrors = state.status === "error" ? state.errors : {};
  const errors = { ...serverErrors, ...clientErrors };
  const errorEntries = Object.entries(errors);

  const fieldProps = (field: string, id: string) => ({
    id,
    name: field,
    className: styles.input,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${id}-error` : undefined,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      validateField(field, event.target.value),
  });

  return (
    <form className={styles.form} action={formAction} noValidate>
      {errorEntries.length > 0 ? (
        <div className={styles.summary} role="alert" tabIndex={-1}>
          <p className={styles.summaryTitle}>
            Please fix {errorEntries.length}{" "}
            {errorEntries.length === 1 ? "field" : "fields"}:
          </p>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.label}>
            Name <span className={styles.required}>(required)</span>
          </label>
          <input type="text" autoComplete="name" {...fieldProps("name", nameId)} />
          {errors.name ? (
            <p id={`${nameId}-error`} className={styles.error}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor={emailId} className={styles.label}>
            Work email <span className={styles.required}>(required)</span>
          </label>
          <input type="email" autoComplete="email" {...fieldProps("email", emailId)} />
          {errors.email ? (
            <p id={`${emailId}-error`} className={styles.error}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={companyId} className={styles.label}>
            Company <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={companyId}
            name="company"
            type="text"
            autoComplete="organization"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={websiteId} className={styles.label}>
            Website <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={websiteId}
            name="website"
            type="url"
            inputMode="url"
            placeholder="example.com"
            autoComplete="url"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={topicId} className={styles.label}>
          What can we help with?{" "}
          <span className={styles.optional}>(optional)</span>
        </label>
        <select id={topicId} name="topic" className={styles.input}>
          <option value="">Not sure yet</option>
          {serviceGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor={messageId} className={styles.label}>
          What are you trying to build, improve or grow?{" "}
          <span className={styles.required}>(required)</span>
        </label>
        <textarea
          rows={6}
          {...fieldProps("message", messageId)}
          className={`${styles.input} ${styles.textarea}`}
        />
        {errors.message ? (
          <p id={`${messageId}-error`} className={styles.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from users and assistive technology */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company_website">Do not fill this in</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="source_page" value={pathname} />

      <div className={styles.actions}>
        <SubmitButton />
        <p className={styles.commitment}>We reply within one business day.</p>
      </div>
    </form>
  );
}
