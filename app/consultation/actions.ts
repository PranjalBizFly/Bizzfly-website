"use server";

import { site } from "@/content/site";
import { serviceGroups } from "@/content/service-meta";
import {
  consultation,
  formatDate,
  formatSlot,
  fromIsoDate,
  isBookableDate,
  slotsForDate,
} from "@/content/consultation";
import {
  defaultDiallingCode,
  findDiallingCode,
  toE164,
  validateMobile,
} from "@/content/phone-codes";

/**
 * Consultation request submission.
 *
 * Deliberately the same shape as app/contact/actions.ts, for the same
 * reasons: it runs on the server so validation cannot be bypassed and no
 * endpoint or credential reaches the browser bundle, and it never reports
 * success for a request that went nowhere.
 *
 * With no backend configured it returns "unavailable" — the modal then shows
 * the real email and phone, and the details the visitor typed, so the request
 * can still be made by hand rather than silently evaporating behind a tick.
 *
 * Set CONSULTATION_ENDPOINT (or fall back to the shared CONTACT_ENDPOINT) to
 * connect a real backend. Nothing else here needs to change, and no
 * credential is invented in the meantime.
 */

export type ConsultationState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; message?: string }
  | { status: "unavailable"; message: string }
  | { status: "success"; message: string; summary: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * The mobile rules live in content/phone-codes.ts, which the form imports
 * too, so the check here and the message beside the field cannot drift apart.
 * The country is validated as well as the number: a posted country code is
 * just a string, and one the list does not contain would otherwise decide
 * which length rule applied to the digits.
 */

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  city: 120,
  mobile: 24,
  countryCode: 2,
  website: 300,
  service: 80,
  requirement: 5000,
  date: 10,
  time: 5,
} as const;

function clean(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

const SERVICE_IDS = new Set([...serviceGroups.map((group) => group.id), "other"]);

export async function submitConsultation(
  _previous: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  /* Honeypot — a bot filling a hidden field is silently accepted and dropped. */
  if (clean(formData.get("company_website"), 200).length > 0) {
    return {
      status: "success",
      message: "Consultation request received",
      summary: "",
    };
  }

  const name = clean(formData.get("name"), MAX_LENGTHS.name);
  const email = clean(formData.get("email"), MAX_LENGTHS.email);
  const company = clean(formData.get("company"), MAX_LENGTHS.company);
  const city = clean(formData.get("city"), MAX_LENGTHS.city);
  const mobile = clean(formData.get("mobile"), MAX_LENGTHS.mobile);
  const countryCode =
    clean(formData.get("country_code"), MAX_LENGTHS.countryCode) ||
    defaultDiallingCode;
  const website = clean(formData.get("website"), MAX_LENGTHS.website);
  const service = clean(formData.get("service"), MAX_LENGTHS.service);
  const requirement = clean(formData.get("requirement"), MAX_LENGTHS.requirement);
  const date = clean(formData.get("date"), MAX_LENGTHS.date);
  const time = clean(formData.get("time"), MAX_LENGTHS.time);
  const sourcePage = clean(formData.get("source_page"), 200);

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (city.length < 2) errors.city = "Please enter your city.";
  const mobileError = validateMobile(countryCode, mobile);
  if (mobileError) errors.mobile = mobileError;
  if (!service || !SERVICE_IDS.has(service)) {
    errors.service = "Please choose what you would like to discuss.";
  }

  /*
   * The date and time are re-checked against the same module the calendar
   * was built from, not merely for presence. A posted date is just a string:
   * without this, a weekend, a date in the past or a 3am slot would be
   * accepted by the endpoint however carefully the grid disabled it.
   */
  const chosenDate = fromIsoDate(date);
  if (!chosenDate) {
    errors.date = "Please choose a date for the consultation.";
  } else if (!isBookableDate(chosenDate)) {
    errors.date = "That date is not available. Please choose another.";
  }

  if (!time) {
    errors.time = "Please choose a preferred time.";
  } else if (chosenDate && !slotsForDate(chosenDate).includes(time)) {
    errors.time = "That time is not available. Please choose another.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const summary = `${formatDate(date)} at ${formatSlot(time)} ${consultation.timeZoneLabel}`;

  const endpoint = process.env.CONSULTATION_ENDPOINT ?? process.env.CONTACT_ENDPOINT;

  if (!endpoint) {
    /*
      [FORM_ENDPOINT_REQUIRED]
      No backend is configured, so we do not claim the request was sent.
      The modal shows the direct contact details and keeps what was typed.
    */
    return {
      status: "unavailable",
      message: `Your request has not been sent — our booking endpoint is not connected yet. Please email ${site.contact.email} or call ${site.contact.phone} with your preferred time and we will confirm it.`,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "consultation",
        name,
        email,
        company,
        city,
        /*
          E.164, so a number is dialable as posted and two records for the
          same person cannot differ by their punctuation. The country is sent
          alongside it because "+1" alone does not say which one it is.
        */
        mobile: toE164(countryCode, mobile),
        mobileCountry: findDiallingCode(countryCode)?.iso ?? countryCode,
        website,
        service,
        requirement,
        preferredDate: date,
        preferredTime: time,
        timeZone: consultation.timeZone,
        durationMinutes: consultation.durationMinutes,
        sourcePage,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        status: "unavailable",
        message: `We could not send your request just now. Please email ${site.contact.email} or call ${site.contact.phone}.`,
      };
    }

    return {
      status: "success",
      message: "Consultation request received",
      summary,
    };
  } catch {
    return {
      status: "unavailable",
      message: `We could not send your request just now. Please email ${site.contact.email} or call ${site.contact.phone}.`,
    };
  }
}
