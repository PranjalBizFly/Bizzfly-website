"use client";

import { useId, useMemo } from "react";
import {
  consultation,
  formatSlot,
  fromIsoDate,
  slotsForDate,
  type IsoDate,
  type SlotTime,
} from "@/content/consultation";
import styles from "./Consultation.module.css";

interface TimeSlotSelectorProps {
  date: IsoDate | "";
  value: SlotTime | "";
  onChange: (value: SlotTime) => void;
  describedBy?: string;
  invalid?: boolean;
}

/**
 * The time slots for the chosen date.
 *
 * THESE ARE PREFERENCES, NOT CONFIRMED AVAILABILITY, and the wording says so.
 * No calendar is connected yet, so claiming a slot is free would be inventing
 * a fact — the request asks for a preferred time and the note under the grid
 * states plainly that the slot is confirmed by email. When a calendar does
 * arrive, slotsForDate gains its busy times and the copy here is the one
 * thing that changes.
 *
 * Radio inputs rather than buttons: this is a single choice from a set, which
 * is what a radio group is, and it brings arrow-key navigation, the roving
 * tab stop and the announcement of "3 of 7" with it for free.
 */
export function TimeSlotSelector({
  date,
  value,
  onChange,
  describedBy,
  invalid,
}: TimeSlotSelectorProps) {
  const name = useId();
  const slots = useMemo(() => {
    const parsed = date ? fromIsoDate(date) : null;
    return parsed ? slotsForDate(parsed) : [];
  }, [date]);

  if (!date) {
    return (
      <p className={styles.slotsEmpty}>
        Choose a date first and the available times will appear here.
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className={styles.slotsEmpty}>
        There are no consultation times on that date. Please choose another
        working day.
      </p>
    );
  }

  return (
    <>
      <div
        className={styles.slots}
        role="radiogroup"
        aria-label={`Preferred time, ${consultation.timeZoneLabel}`}
        aria-describedby={describedBy}
        data-invalid={invalid ? "true" : undefined}
      >
        {slots.map((slot) => {
          const id = `${name}-${slot.replace(":", "")}`;
          return (
            <div key={slot} className={styles.slot}>
              <input
                type="radio"
                id={id}
                name="time"
                value={slot}
                className={styles.slotInput}
                checked={value === slot}
                onChange={() => onChange(slot)}
              />
              <label htmlFor={id} className={styles.slotLabel}>
                {formatSlot(slot)}
              </label>
            </div>
          );
        })}
      </div>

      <p className={styles.slotsNote}>
        Times are {consultation.timeZoneLabel} and each consultation runs{" "}
        {consultation.durationMinutes} minutes. We confirm the exact slot by
        email — if it is taken we will offer you the nearest one.
      </p>
    </>
  );
}
