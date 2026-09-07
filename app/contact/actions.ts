"use server";

import { site } from "@/content/site";

/**
 * Contact form submission.
 *
 * Runs on the server, so validation cannot be bypassed from the client and
 * no endpoint or credential is exposed in the browser bundle.
 *
 * There is no verified form backend for BizzFly yet. Rather than showing a
 * success message for a submission that went nowhere, this returns an honest
 * "unavailable" result that the form renders as a direct email and phone
 * fallback. Set CONTACT_ENDPOINT to connect a real backend — nothing else
 * needs to change.
 */

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; message?: string }
  | { status: "unavailable"; message: string }
  | { status: "success"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Free-email domains, used only to nudge — never to block a submission. */
const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  website: 300,
  topic: 80,
  message: 5000,
} as const;

function clean(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /* Honeypot — a bot filling a hidden field is silently accepted and dropped. */
  if (clean(formData.get("company_website"), 200).length > 0) {
    return { status: "success", message: "Thank you — your message has been received." };
  }

  const name = clean(formData.get("name"), MAX_LENGTHS.name);
  const email = clean(formData.get("email"), MAX_LENGTHS.email);
  const company = clean(formData.get("company"), MAX_LENGTHS.company);
  const website = clean(formData.get("website"), MAX_LENGTHS.website);
  const topic = clean(formData.get("topic"), MAX_LENGTHS.topic);
  const message = clean(formData.get("message"), MAX_LENGTHS.message);
  const sourcePage = clean(formData.get("source_page"), 200);

  /* Server-side validation. Client-side validation is a convenience only. */
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Please tell us a little about what you are trying to solve.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const endpoint = process.env.CONTACT_ENDPOINT;

  if (!endpoint) {
    /*
      [FORM_ENDPOINT_REQUIRED]
      No backend is configured, so we do not claim the message was sent.
      The form shows the direct contact details instead.
    */
    return {
      status: "unavailable",
      message: `Our contact form is not connected yet. Please email ${site.contact.email} or call ${site.contact.phone} and we will pick it up straight away.`,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        website,
        topic,
        message,
        sourcePage,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        status: "unavailable",
        message: `We could not send your message just now. Please email ${site.contact.email} or call ${site.contact.phone}.`,
      };
    }

    return {
      status: "success",
      message: "Thank you — your message has been received.",
    };
  } catch {
    return {
      status: "unavailable",
      message: `We could not send your message just now. Please email ${site.contact.email} or call ${site.contact.phone}.`,
    };
  }
}
