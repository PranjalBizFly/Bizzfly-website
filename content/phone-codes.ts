/**
 * International dialling codes — the single source for the country selector
 * beside the mobile number field, and for the validation behind it.
 *
 * WHY THIS EXISTS AS DATA. The mobile field used to accept one shape of
 * number: ten Indian digits, optionally prefixed with 91. That is correct for
 * most enquiries and wrong for the rest, and it failed in the worst way — an
 * overseas visitor typed a real number, was told it was not one, and had no
 * way to proceed. Separating the country from the subscriber digits fixes
 * that without loosening the check on Indian numbers, which stay strictly
 * validated because that is the case we can be strict about.
 *
 * WHY LENGTHS AND NOT FULL PATTERNS. Per-country mobile prefix rules change,
 * and a stale prefix list rejects real numbers — the exact failure this
 * replaces. Digit-length ranges are stable, cheap to keep honest, and catch
 * what a form can usefully catch: a mistyped, truncated or half-pasted
 * number. India keeps a prefix pattern because its mobile range (6 to 9) has
 * been stable for years and is the number we are most likely to dial.
 *
 * The list is a curated set of markets rather than all 240 territories: a
 * select someone has to scroll through 240 rows of is its own failure. Add a
 * country here the moment an enquiry needs one — the client form, the server
 * action and the submitted payload all read this module, so a new row is the
 * only change required.
 */

export interface DiallingCode {
  /**
   * ISO 3166-1 alpha-2. The stable key, and the submitted value — unique
   * where a dialling code is not, since +1 is both the US and Canada.
   */
  iso: string;
  /** Display name, used in the option label and in the error message. */
  country: string;
  /** E.164 country calling code, with its plus. */
  dial: string;
  /** Fewest digits a national subscriber number may have. */
  min: number;
  /** Most digits a national subscriber number may have. */
  max: number;
  /**
   * Whether the name takes a definite article in running text: a number in
   * THE United States, but a number in France. Error messages name the
   * country, and "a mobile number in United Kingdom" is the kind of sentence
   * that makes a visitor trust the rest of the form slightly less.
   */
  takesThe?: boolean;
  /**
   * An additional shape test, where a country's mobile range is well enough
   * defined to assert it. Applied after the length check, so what a visitor
   * reads is about length first and shape only if the length was right.
   */
  pattern?: RegExp;
  /**
   * What to say when `pattern` rejects a number of the right length. A
   * message that states the actual rule can be acted on; "invalid" cannot.
   */
  patternHint?: string;
}

/*
 * India leads because it is where most enquiries come from and it is the
 * default selection; the rest run alphabetically so the list can be scanned.
 */
export const diallingCodes: DiallingCode[] = [
  {
    iso: "IN",
    country: "India",
    dial: "+91",
    min: 10,
    max: 10,
    pattern: /^[6-9]\d{9}$/,
    patternHint: "Indian mobile numbers start with 6, 7, 8 or 9.",
  },

  { iso: "AR", country: "Argentina", dial: "+54", min: 10, max: 10 },
  { iso: "AU", country: "Australia", dial: "+61", min: 9, max: 9 },
  { iso: "AT", country: "Austria", dial: "+43", min: 9, max: 13 },
  { iso: "BH", country: "Bahrain", dial: "+973", min: 8, max: 8 },
  { iso: "BD", country: "Bangladesh", dial: "+880", min: 10, max: 10 },
  { iso: "BE", country: "Belgium", dial: "+32", min: 8, max: 9 },
  { iso: "BR", country: "Brazil", dial: "+55", min: 10, max: 11 },
  { iso: "CA", country: "Canada", dial: "+1", min: 10, max: 10 },
  { iso: "CL", country: "Chile", dial: "+56", min: 9, max: 9 },
  { iso: "CN", country: "China", dial: "+86", min: 11, max: 11 },
  { iso: "CO", country: "Colombia", dial: "+57", min: 10, max: 10 },
  { iso: "CZ", country: "Czechia", dial: "+420", min: 9, max: 9 },
  { iso: "DK", country: "Denmark", dial: "+45", min: 8, max: 8 },
  { iso: "EG", country: "Egypt", dial: "+20", min: 10, max: 10 },
  { iso: "FI", country: "Finland", dial: "+358", min: 6, max: 10 },
  { iso: "FR", country: "France", dial: "+33", min: 9, max: 9 },
  { iso: "DE", country: "Germany", dial: "+49", min: 9, max: 11 },
  { iso: "GH", country: "Ghana", dial: "+233", min: 9, max: 9 },
  { iso: "GR", country: "Greece", dial: "+30", min: 10, max: 10 },
  { iso: "HK", country: "Hong Kong", dial: "+852", min: 8, max: 8 },
  { iso: "ID", country: "Indonesia", dial: "+62", min: 9, max: 12 },
  { iso: "IE", country: "Ireland", dial: "+353", min: 7, max: 9 },
  { iso: "IL", country: "Israel", dial: "+972", min: 9, max: 9 },
  { iso: "IT", country: "Italy", dial: "+39", min: 9, max: 11 },
  { iso: "JP", country: "Japan", dial: "+81", min: 10, max: 10 },
  { iso: "KE", country: "Kenya", dial: "+254", min: 9, max: 9 },
  { iso: "KW", country: "Kuwait", dial: "+965", min: 8, max: 8 },
  { iso: "MY", country: "Malaysia", dial: "+60", min: 9, max: 10 },
  { iso: "MX", country: "Mexico", dial: "+52", min: 10, max: 10 },
  { iso: "MA", country: "Morocco", dial: "+212", min: 9, max: 9 },
  { iso: "NP", country: "Nepal", dial: "+977", min: 10, max: 10 },
  { iso: "NL", country: "Netherlands", dial: "+31", min: 9, max: 9, takesThe: true },
  { iso: "NZ", country: "New Zealand", dial: "+64", min: 8, max: 10 },
  { iso: "NG", country: "Nigeria", dial: "+234", min: 10, max: 10 },
  { iso: "NO", country: "Norway", dial: "+47", min: 8, max: 8 },
  { iso: "OM", country: "Oman", dial: "+968", min: 8, max: 8 },
  { iso: "PK", country: "Pakistan", dial: "+92", min: 10, max: 10 },
  { iso: "PE", country: "Peru", dial: "+51", min: 9, max: 9 },
  { iso: "PH", country: "Philippines", dial: "+63", min: 10, max: 10, takesThe: true },
  { iso: "PL", country: "Poland", dial: "+48", min: 9, max: 9 },
  { iso: "PT", country: "Portugal", dial: "+351", min: 9, max: 9 },
  { iso: "QA", country: "Qatar", dial: "+974", min: 8, max: 8 },
  { iso: "RU", country: "Russia", dial: "+7", min: 10, max: 10 },
  { iso: "SA", country: "Saudi Arabia", dial: "+966", min: 9, max: 9 },
  { iso: "SG", country: "Singapore", dial: "+65", min: 8, max: 8 },
  { iso: "ZA", country: "South Africa", dial: "+27", min: 9, max: 9 },
  { iso: "KR", country: "South Korea", dial: "+82", min: 9, max: 10 },
  { iso: "ES", country: "Spain", dial: "+34", min: 9, max: 9 },
  { iso: "LK", country: "Sri Lanka", dial: "+94", min: 9, max: 9 },
  { iso: "SE", country: "Sweden", dial: "+46", min: 7, max: 9 },
  { iso: "CH", country: "Switzerland", dial: "+41", min: 9, max: 9 },
  { iso: "TW", country: "Taiwan", dial: "+886", min: 9, max: 9 },
  { iso: "TH", country: "Thailand", dial: "+66", min: 9, max: 9 },
  { iso: "TR", country: "Turkey", dial: "+90", min: 10, max: 10 },
  { iso: "UA", country: "Ukraine", dial: "+380", min: 9, max: 9 },
  { iso: "AE", country: "United Arab Emirates", dial: "+971", min: 9, max: 9, takesThe: true },
  { iso: "GB", country: "United Kingdom", dial: "+44", min: 9, max: 10, takesThe: true },
  { iso: "US", country: "United States", dial: "+1", min: 10, max: 10, takesThe: true },
  { iso: "VN", country: "Vietnam", dial: "+84", min: 9, max: 10 },
];

/** The selection a visitor starts on. Most enquiries are Indian. */
export const defaultDiallingCode = "IN";

const BY_ISO = new Map(diallingCodes.map((entry) => [entry.iso, entry]));

export function findDiallingCode(iso: string): DiallingCode | null {
  return BY_ISO.get(iso) ?? null;
}

/**
 * Digits only.
 *
 * People type "98765 43210", "(987) 654-3210" and "987-654-3210", and all
 * three are the same number. Separators come out before anything is counted,
 * so the length check measures the number rather than the typing.
 *
 * A leading national trunk zero comes out too — "07911 123456" in the UK,
 * "0812..." in Indonesia. It is a domestic dialling instruction rather than
 * part of the number, and leaving it in would push a valid number one digit
 * over its own maximum.
 */
export function nationalDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+/, "");
}

/**
 * Validates a subscriber number against its selected country.
 *
 * Returns the message to show, or an empty string when the number is good.
 * The client form and the server action both call this, so the two cannot
 * disagree about what a valid number is.
 */
export function validateMobile(iso: string, value: string): string {
  const code = findDiallingCode(iso);
  if (!code) return "Please choose a country code for your mobile number.";

  const digits = nationalDigits(value);
  if (!digits) return "Please enter your mobile number.";

  const place = `${code.takesThe ? "the " : ""}${code.country}`;

  if (digits.length < code.min || digits.length > code.max) {
    const expected =
      code.min === code.max
        ? `${code.min} digits`
        : `${code.min} to ${code.max} digits`;
    return `A mobile number in ${place} has ${expected}. Please check the number.`;
  }

  if (code.pattern && !code.pattern.test(digits)) {
    return (
      code.patternHint ??
      `That does not look like a mobile number in ${place}. Please check it.`
    );
  }

  return "";
}

/** E.164 — what is stored and dialled: "+919876543210". */
export function toE164(iso: string, value: string): string {
  const code = findDiallingCode(iso);
  if (!code) return "";
  return `${code.dial}${nationalDigits(value)}`;
}

/** The hint inside the empty field, phrased for the chosen country. */
export function mobilePlaceholder(iso: string): string {
  const code = findDiallingCode(iso);
  if (!code) return "Mobile number";
  return code.min === code.max
    ? `${code.min}-digit mobile number`
    : "Mobile number";
}
