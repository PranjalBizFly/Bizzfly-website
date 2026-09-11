"use client";

import { useMemo, useState } from "react";
import {
  consultation,
  isBookableDate,
  toIsoDate,
  type IsoDate,
} from "@/content/consultation";
import styles from "./Consultation.module.css";

interface DateSelectorProps {
  value: IsoDate | "";
  onChange: (value: IsoDate) => void;
  /** Wired to the field's error message, so the grid announces its own. */
  describedBy?: string;
  invalid?: boolean;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_FORMAT = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

const FULL_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** Monday-first offset for a JS day index, where 0 is Sunday. */
const mondayOffset = (day: number) => (day + 6) % 7;

/**
 * The date grid.
 *
 * A month at a time, weeks running Monday to Sunday because that is how a
 * working week is read here and consultations are weekday appointments.
 *
 * WHAT IS AND IS NOT SELECTABLE comes entirely from content/consultation.ts,
 * never from a rule written into this component. A day the grid offers is a
 * day the server will accept, because both ask the same function — otherwise
 * the calendar becomes a second, quietly diverging source of truth.
 *
 * Unavailable days are rendered as disabled buttons rather than dropped or
 * replaced with text. The shape of the month is information: a visitor
 * scanning it should see that weekends are out and that this week is already
 * inside the lead time, not be shown a grid with holes in it.
 */
export function DateSelector({
  value,
  onChange,
  describedBy,
  invalid,
}: DateSelectorProps) {
  /*
   * `now` is captured once per mount rather than read per render, so a month
   * cannot change what it offers midway through someone filling the form in.
   */
  const [now] = useState(() => new Date());
  const [month, setMonth] = useState(() => {
    const start = new Date(now);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return start;
  });

  const { days, leadingBlanks } = useMemo(() => {
    const first = new Date(month);
    const total = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();

    return {
      leadingBlanks: mondayOffset(first.getDay()),
      days: Array.from({ length: total }, (_, index) => {
        const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
        return {
          date,
          iso: toIsoDate(date),
          label: index + 1,
          bookable: isBookableDate(date, now),
        };
      }),
    };
  }, [month, now]);

  /*
   * Month navigation is bounded by the same horizon the dates are, so a
   * visitor cannot page into a year of empty grids looking for a slot.
   */
  const horizonEnd = useMemo(() => {
    const end = new Date(now);
    end.setDate(end.getDate() + consultation.horizonDays);
    return end;
  }, [now]);

  const canGoBack =
    month.getFullYear() > now.getFullYear() ||
    (month.getFullYear() === now.getFullYear() &&
      month.getMonth() > now.getMonth());

  const canGoForward =
    month.getFullYear() < horizonEnd.getFullYear() ||
    (month.getFullYear() === horizonEnd.getFullYear() &&
      month.getMonth() < horizonEnd.getMonth());

  const shiftMonth = (delta: number) => {
    setMonth((current) => {
      const next = new Date(current);
      next.setMonth(next.getMonth() + delta);
      return next;
    });
  };

  return (
    <div
      className={styles.calendar}
      data-invalid={invalid ? "true" : undefined}
      aria-describedby={describedBy}
    >
      <div className={styles.calendarHead}>
        <button
          type="button"
          className={styles.monthNav}
          onClick={() => shiftMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </button>

        {/* Announced on change, so the month is heard as well as seen. */}
        <p className={styles.monthName} aria-live="polite">
          {MONTH_FORMAT.format(month)}
        </p>

        <button
          type="button"
          className={styles.monthNav}
          onClick={() => shiftMonth(1)}
          disabled={!canGoForward}
          aria-label="Next month"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className={styles.weekday}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.days} role="group" aria-label="Choose a date">
        {Array.from({ length: leadingBlanks }, (_, index) => (
          <span key={`blank-${index}`} aria-hidden="true" />
        ))}

        {days.map((day) => {
          const selected = value === day.iso;
          return (
            <button
              key={day.iso}
              type="button"
              className={styles.day}
              data-selected={selected ? "true" : undefined}
              disabled={!day.bookable}
              aria-pressed={selected}
              /*
                The visible label is a bare number; the accessible name is the
                whole date, because "14" read out of the grid means nothing.
              */
              aria-label={FULL_DATE_FORMAT.format(day.date)}
              onClick={() => onChange(day.iso)}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      <p className={styles.calendarNote}>
        Consultations run Monday to Friday, and we ask for at least one working
        day&rsquo;s notice.
      </p>
    </div>
  );
}
