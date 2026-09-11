/**
 * Consultation scheduling — the single source for when a consultation can be
 * requested.
 *
 * WHAT THIS IS AND IS NOT.
 *
 * This file describes the hours BizzFly takes consultations in. It does NOT
 * describe a calendar's live free/busy state, because no calendar is
 * connected yet, and a form that shows "10:30 — available" against nothing is
 * lying to the person filling it in. So the UI asks for a PREFERRED time and
 * says the slot is confirmed by email; every string in the modal is written
 * to be true under that arrangement.
 *
 * WHEN A REAL CALENDAR IS CONNECTED. Replace the body of `slotsForDate` with
 * a call to it and nothing else in the interface has to change — the modal,
 * the server action and the validation all read availability through this
 * module. `bookedSlots` is the seam: pass it the busy times for a date and
 * they are removed from the returned list. Keep `isBookableDate` in step, or
 * the client will offer a day the server then refuses.
 */

export interface ConsultationConfig {
  /** IANA zone the hours below are expressed in. Shown to the visitor. */
  timeZone: string;
  /** Short label for that zone in UI, where the IANA name would be noise. */
  timeZoneLabel: string;
  /** How long a first consultation runs. Stated, never implied. */
  durationMinutes: number;
  /**
   * Days of the week consultations run on, 0 = Sunday. Monday to Friday: we
   * do not offer weekend slots we would then have to move.
   */
  weekdays: number[];
  /**
   * The start of each slot, in 24-hour time in `timeZone`. Deliberately a
   * short list of round times — a working day chopped into every half hour is
   * a scheduling tool, and this is a request form.
   */
  startTimes: string[];
  /**
   * The earliest a requested slot may be, in hours from now. A request for
   * "in twenty minutes" cannot be honoured by a team that has not read it
   * yet, so the day and its slots are ruled out rather than accepted and
   * disappointed.
   */
  leadTimeHours: number;
  /** How far ahead a date may be chosen. Beyond this we cannot commit. */
  horizonDays: number;
}

export const consultation: ConsultationConfig = {
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  durationMinutes: 30,
  weekdays: [1, 2, 3, 4, 5],
  startTimes: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"],
  leadTimeHours: 24,
  horizonDays: 60,
};

/** A date with no time component, as YYYY-MM-DD. The wire format throughout. */
export type IsoDate = string;

/** A slot start, as HH:MM in `consultation.timeZone`. */
export type SlotTime = string;

/**
 * Formats a Date as YYYY-MM-DD from its LOCAL parts.
 *
 * `toISOString` would convert to UTC first, which moves the date across the
 * boundary for anyone east of Greenwich — in India, every time before 05:30
 * local. The calendar grid is built from local dates, so it has to compare
 * against local ones.
 */
export function toIsoDate(date: Date): IsoDate {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Parses YYYY-MM-DD into a local Date at midnight. Null if malformed. */
export function fromIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  /* Rejects 2026-02-31, which the constructor would roll into March. */
  if (date.getMonth() !== Number(month) - 1) return null;
  return date;
}

/** The first date that satisfies the lead time, at midnight local. */
function earliestDate(now: Date): Date {
  const earliest = new Date(now.getTime() + consultation.leadTimeHours * 3600_000);
  earliest.setHours(0, 0, 0, 0);
  return earliest;
}

/** The last date inside the booking horizon, at midnight local. */
function latestDate(now: Date): Date {
  const latest = new Date(now.getTime());
  latest.setDate(latest.getDate() + consultation.horizonDays);
  latest.setHours(0, 0, 0, 0);
  return latest;
}

/**
 * Whether a date may be chosen at all: a working day, past the lead time and
 * inside the horizon.
 *
 * The server calls this with the same arguments the client did, so a date
 * disabled in the grid is also refused on submission — the check is not a
 * courtesy in the UI that the endpoint then takes on trust.
 */
export function isBookableDate(date: Date, now: Date = new Date()): boolean {
  if (!consultation.weekdays.includes(date.getDay())) return false;
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day >= earliestDate(now) && day <= latestDate(now);
}

/**
 * The slots that may be requested on a date.
 *
 * Today is never bookable under a 24-hour lead time, so there is no
 * part-day case to handle here; the lead time is enforced on the date. If
 * the lead time is ever shortened below a day, filter `startTimes` by the
 * clock as well — and do it here rather than in the component.
 *
 * @param bookedSlots Times already taken, once a calendar can supply them.
 */
export function slotsForDate(
  date: Date,
  now: Date = new Date(),
  bookedSlots: SlotTime[] = [],
): SlotTime[] {
  if (!isBookableDate(date, now)) return [];
  return consultation.startTimes.filter((time) => !bookedSlots.includes(time));
}

/** "10:00" → "10:00 am". The 12-hour reading Indian business hours use. */
export function formatSlot(time: SlotTime): string {
  const [hourPart, minutePart] = time.split(":");
  const hour = Number(hourPart);
  const suffix = hour < 12 ? "am" : "pm";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:${minutePart} ${suffix}`;
}

/** "2026-09-14" → "Monday 14 September 2026". Used in the confirmation. */
export function formatDate(value: IsoDate): string {
  const date = fromIsoDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
