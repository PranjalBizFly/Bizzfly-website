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

/**
 * Indian mobile numbers: ten digits starting 6–9, optionally carrying the
 * country code and any of the separators people actually type. Anything else
 * is rejected here rather than at the point someone tries to ring it.
 */
const MOBILE_PATTERN = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  city: 120,
  mobile: 24,
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

/** Digits only, so "+91 98765 43210" and "9876543210" store identically. */
function normaliseMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
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
  if (!MOBILE_PATTERN.test(mobile)) {
    errors.mobile = "Please enter a 10-digit Indian mobile number.";
  }
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
        mobile: normaliseMobile(mobile),
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
