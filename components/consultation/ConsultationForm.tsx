"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { serviceGroups } from "@/content/service-meta";
import { site } from "@/content/site";
import { Button } from "@/components/buttons";
import {
  submitConsultation,
  type ConsultationState,
} from "@/app/consultation/actions";
import type { IsoDate, SlotTime } from "@/content/consultation";
import {
  defaultDiallingCode,
  diallingCodes,
  mobilePlaceholder,
  validateMobile,
} from "@/content/phone-codes";
import { DateSelector } from "./DateSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import styles from "./Consultation.module.css";

interface ConsultationFormProps {
  /** The CTA the request came from, submitted alongside the page path. */
  source?: string;
  /** Closes the dialog from inside the confirmation state. */
  onDone: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} withArrow={!pending}>
      {pending ? "Submitting…" : "Confirm consultation"}
    </Button>
  );
}

/**
 * The consultation request form.
 *
 * Validation runs in app/consultation/actions.ts, on the server, so it cannot
 * be bypassed — including the date and the time, which are re-checked against
 * the same scheduling module the calendar was drawn from. The checks below
 * only save a round trip and put the message beside the field.
 *
 * Nothing here fabricates a result. A submission with no backend configured
 * returns "unavailable", and this renders that as exactly what it is: the
 * request was not sent, here is the email and the phone number, and
 * everything you typed is still in the form.
 */
export function ConsultationForm({ source, onDone }: ConsultationFormProps) {
  const pathname = usePathname();
  const [state, formAction] = useActionState<ConsultationState, FormData>(
    submitConsultation,
    { status: "idle" },
  );

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  /*
   * The text fields are controlled.
   *
   * They were uncontrolled, which is simpler and was wrong here: React resets
   * a form after its action completes, so a rejected submission handed the
   * visitor an empty form and told them to fix seven fields. Holding the
   * values in state also means an accidental close keeps them, because the
   * modal is never unmounted.
   */
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    city: "",
    mobile: "",
    website: "",
    service: "",
    requirement: "",
  });
  /*
   * The dialling code is held apart from the text fields because it is not
   * one: it is a choice with a default, it is never blank, and it changes
   * what counts as a valid number in the field beside it. Keeping it out of
   * `values` also keeps `fieldProps` honest — that helper is for controls
   * whose value is whatever was typed into them.
   */
  const [countryCode, setCountryCode] = useState(defaultDiallingCode);
  /*
   * Server errors survive until the next submission, so a field corrected
   * after a rejection would stay marked as invalid while the visitor looks
   * at a message that no longer applies. Editing a field retires its server
   * error; the server still gets the last word on the next submit.
   */
  const [resolved, setResolved] = useState<string[]>([]);
  const [date, setDate] = useState<IsoDate | "">("");
  const [time, setTime] = useState<SlotTime | "">("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const cityId = useId();
  const mobileId = useId();
  const countryCodeId = useId();
  const websiteId = useId();
  const serviceId = useId();
  const requirementId = useId();
  const dateErrorId = useId();
  const timeErrorId = useId();

  const serverErrors = state.status === "error" ? state.errors : {};
  const liveServerErrors = Object.fromEntries(
    Object.entries(serverErrors).filter(([field]) => !resolved.includes(field)),
  );
  const errors = { ...liveServerErrors, ...clientErrors };
  const errorEntries = Object.entries(errors);

  /*
   * Move focus to the error summary when the server rejects a submission.
   * Without this the page appears not to have responded to someone using a
   * screen reader or a keyboard: the button was pressed, nothing announced.
   */
  useEffect(() => {
    if (state.status !== "error") return;
    setResolved([]);
    summaryRef.current?.focus();
  }, [state]);

  /* Validate on blur. Errors raised while someone is still typing are noise. */
  const validateField = (field: string, value: string) => {
    let message = "";
    if (field === "name" && value.trim().length < 2) {
      message = "Please enter your name.";
    }
    if (field === "email" && !EMAIL_PATTERN.test(value.trim())) {
      message = "Please enter a valid work email address.";
    }
    if (field === "city" && value.trim().length < 2) {
      message = "Please enter your city.";
    }
    if (field === "mobile") {
      message = validateMobile(countryCode, value);
    }
    if (field === "service" && !value) {
      message = "Please choose what you would like to discuss.";
    }
    setClientErrors((previous) => {
      const next = { ...previous };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const clearError = (field: string) => {
    setResolved((previous) =>
      previous.includes(field) ? previous : [...previous, field],
    );
    setClientErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const setValue = (field: keyof typeof values, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    clearError(field);
  };

  const fieldProps = (field: keyof typeof values, id: string) => ({
    id,
    name: field,
    className: styles.input,
    value: values[field],
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setValue(field, event.target.value),
    "aria-invalid": Boolean(errors[field]) || undefined,
    "aria-describedby": errors[field] ? `${id}-error` : undefined,
    onBlur: (
      event: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => validateField(field, event.target.value),
  });

  /* --- Success ----------------------------------------------------------- */
  if (state.status === "success") {
    return (
      <div className={styles.result} role="status" aria-live="polite">
        <p className={styles.resultKicker}>Consultation request received</p>
        <p className={styles.resultBody}>
          Thank you. Our team will review your request and get back to you
          shortly to confirm the time.
        </p>
        {state.summary ? (
          <p className={styles.resultDetail}>
            You asked for <strong>{state.summary}</strong>. If that slot has
            gone we will offer you the nearest one.
          </p>
        ) : null}
        <div className={styles.resultActions}>
          <Button type="button" size="lg" onClick={onDone}>
            Close
          </Button>
          <a className={styles.resultLink} href={`mailto:${site.contact.email}`}>
            Email us instead
          </a>
        </div>
      </div>
    );
  }

  /* --- Not sent ----------------------------------------------------------
     The honest state. The request did not reach anyone, so it does not say
     it did, and the form is still below with every field as it was left. */
  const unavailable = state.status === "unavailable" ? state.message : null;

  return (
    <form className={styles.form} action={formAction} noValidate>
      {unavailable ? (
        <div className={styles.alert} role="alert">
          <p className={styles.alertTitle}>Your request has not been sent</p>
          <p className={styles.alertBody}>{unavailable}</p>
          <p className={styles.alertBody}>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            {" · "}
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          </p>
        </div>
      ) : null}

      {errorEntries.length > 0 ? (
        <div className={styles.alert} role="alert" tabIndex={-1} ref={summaryRef}>
          <p className={styles.alertTitle}>
            Please fix {errorEntries.length}{" "}
            {errorEntries.length === 1 ? "field" : "fields"}:
          </p>
          <ul className={styles.alertList}>
            {errorEntries.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <section className={styles.section} aria-labelledby={`${nameId}-legend`}>
        <h3 className={styles.legend} id={`${nameId}-legend`}>
          Your Details
        </h3>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor={nameId} className={styles.label}>
              Full name
            </label>
            <input
              type="text"
              autoComplete="name"
              required
              {...fieldProps("name", nameId)}
            />
            {errors.name ? (
              <p id={`${nameId}-error`} className={styles.error}>
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              Work email
            </label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              {...fieldProps("email", emailId)}
            />
            {errors.email ? (
              <p id={`${emailId}-error`} className={styles.error}>
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor={companyId} className={styles.label}>
              Company
            </label>
            <input
              type="text"
              autoComplete="organization"
              {...fieldProps("company", companyId)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={cityId} className={styles.label}>
              City
            </label>
            <input
              type="text"
              autoComplete="address-level2"
              required
              {...fieldProps("city", cityId)}
            />
            {errors.city ? (
              <p id={`${cityId}-error`} className={styles.error}>
                {errors.city}
              </p>
            ) : null}
          </div>

          <div className={`${styles.field} ${styles.fieldWide}`}>
            <label htmlFor={mobileId} className={styles.label}>
              Mobile number
            </label>
            {/*
              The country and the number are one control in two parts, so the
              border is drawn around the pair rather than around each — see
              .phone in the stylesheet. The select carries its own accessible
              name because the visible label names the number, not the code.
            */}
            <div
              className={styles.phone}
              data-invalid={errors.mobile ? "true" : undefined}
            >
              <select
                id={countryCodeId}
                name="country_code"
                className={styles.phoneCode}
                aria-label="Country dialling code"
                value={countryCode}
                onChange={(event) => {
                  setCountryCode(event.target.value);
                  clearError("mobile");
                  /*
                    A number already typed was judged against the old country,
                    so it is re-judged here rather than left showing a verdict
                    that no longer applies to it.
                  */
                  if (values.mobile.trim()) {
                    setClientErrors((previous) => {
                      const message = validateMobile(
                        event.target.value,
                        values.mobile,
                      );
                      const next = { ...previous };
                      if (message) next.mobile = message;
                      else delete next.mobile;
                      return next;
                    });
                  }
                }}
              >
                {diallingCodes.map((code) => (
                  <option key={code.iso} value={code.iso}>
                    {code.dial} {code.iso}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required
                placeholder={mobilePlaceholder(countryCode)}
                {...fieldProps("mobile", mobileId)}
                className={styles.phoneNumber}
              />
            </div>
            {errors.mobile ? (
              <p id={`${mobileId}-error`} className={styles.error}>
                {errors.mobile}
              </p>
            ) : null}
          </div>

          <div className={`${styles.field} ${styles.fieldWide}`}>
            <label htmlFor={websiteId} className={styles.label}>
              Website
            </label>
            <input
              type="url"
              inputMode="url"
              placeholder="example.com"
              {...fieldProps("website", websiteId)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor={serviceId} className={styles.label}>
            What would you like to discuss?
          </label>
          <select
            required
            {...fieldProps("service", serviceId)}
            onChange={(event) => {
              setValue("service", event.target.value);
              validateField("service", event.target.value);
            }}
          >
            <option value="" disabled>
              Choose an area
            </option>
            {serviceGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
          {errors.service ? (
            <p id={`${serviceId}-error`} className={styles.error}>
              {errors.service}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor={requirementId} className={styles.label}>
            Briefly, what are you trying to solve?
          </label>
          <textarea
            rows={3}
            {...fieldProps("requirement", requirementId)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby={`${dateErrorId}-legend`}>
        <h3 className={styles.legend} id={`${dateErrorId}-legend`}>
          Consultation Preference
        </h3>

        <div className={styles.field}>
          <p className={styles.label} id={`${dateErrorId}-label`}>
            Preferred date
          </p>
          <DateSelector
            value={date}
            invalid={Boolean(errors.date)}
            describedBy={errors.date ? dateErrorId : undefined}
            onChange={(next) => {
              setDate(next);
              /* A new date can invalidate the chosen time, so it is cleared
                 rather than silently carried over to a different day. */
              setTime("");
              clearError("date");
            }}
          />
          {errors.date ? (
            <p id={dateErrorId} className={styles.error}>
              {errors.date}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <p className={styles.label}>
            Preferred time
          </p>
          <TimeSlotSelector
            date={date}
            value={time}
            invalid={Boolean(errors.time)}
            describedBy={errors.time ? timeErrorId : undefined}
            onChange={(next) => {
              setTime(next);
              clearError("time");
            }}
          />
          {errors.time ? (
            <p id={timeErrorId} className={styles.error}>
              {errors.time}
            </p>
          ) : null}
        </div>
      </section>

      {/* The grid and the radio group are controlled, so their values travel
          as hidden fields rather than as form controls of their own. */}
      <input type="hidden" name="date" value={date} />

      {/* Honeypot — hidden from users and from assistive technology. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="consultation_company_website">Do not fill this in</label>
        <input
          id="consultation_company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input
        type="hidden"
        name="source_page"
        value={source ? `${pathname} · ${source}` : pathname}
      />

      <div className={styles.actions}>
        <SubmitButton />
        <p className={styles.commitment}>
          We will use these details only to arrange your consultation.
        </p>
      </div>
    </form>
  );
}
