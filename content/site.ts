/**
 * Site-level facts.
 *
 * VERIFIED against https://bizzfly.com on 2026-09-07.
 * Anything unverified is marked and must not be rendered as fact.
 * See docs/architecture/07-existing-site-audit.md.
 */

import { CONTENT_REQUIRED, VERIFY_WITH_BIZZFLY } from "@/types/content";

export const site = {
  name: "BizzFly",
  url: "https://bizzfly.com",
  /** From /about-us/ — "Making Businesses Discoverable in a Digital-First World" */
  tagline: "Making businesses discoverable in a digital-first world",
  description:
    "BizzFly helps businesses get found across search and AI platforms, then builds the websites, software and automation that turn discovery into revenue.",

  /** VERIFIED — /contact-us/ */
  contact: {
    email: "sales@BizzFly.com",
    /*
     * Grouped as country code, then the Indian mobile number.
     *
     * `+919 198 159 815` splits "+91" across the boundary — the trailing 9 of
     * the country code gets read as the first digit of the subscriber number,
     * and the remainder falls into arbitrary threes that match no Indian
     * convention. `+91 91 9815 9815` keeps the dialling code whole and groups
     * the ten digits the way they are actually read aloud here.
     *
     * The digits are identical to `phoneHref` below — 919198159815 either way
     * — so this is presentation only. This string is also what the
     * Organization schema publishes as `telephone` (app/layout.tsx), which is
     * the other reason the country code must not be broken.
     */
    phone: "+91 91 9815 9815",
    phoneHref: "tel:+919198159815",
    address: {
      street: "2nd Floor, Shri Nivas Towers, Above Baramati Bank",
      city: "Pune",
      region: "Maharashtra",
      postalCode: "411043",
      country: "IN",
    },
  },

  /** VERIFIED — /about-us/ names Rahul Jadhav as founder. */
  founder: "Rahul Jadhav",

  /**
   * Core values — VERIFIED from /about-us/. Genuinely specific, kept.
   */
  values: [
    {
      title: "Be Discoverable",
      description:
        "Visibility is the first constraint on growth. If buyers cannot find you (in search or in an AI answer) nothing downstream matters.",
    },
    {
      title: "Be Scalable",
      description:
        "Growth that breaks your operations is not growth. Systems have to hold when demand arrives.",
    },
    {
      title: "Be Future-Ready",
      description:
        "Discovery is moving from ten blue links to generated answers. Structure your business for where buyers are going.",
    },
  ],

  /**
   * NOT VERIFIED — do not render until sourced.
   * The live site claims "4.9/5 based on 1,500+ reviews" with no visible
   * source, and "10+ years" on the homepage against a broken "0 +" counter
   * on /about-us/. See audit findings F7.
   */
  unverified: {
    reviewScore: VERIFY_WITH_BIZZFLY,
    reviewCount: VERIFY_WITH_BIZZFLY,
    yearsExperience: VERIFY_WITH_BIZZFLY,
    teamSize: CONTENT_REQUIRED,
    foundedYear: CONTENT_REQUIRED,
    certifications: CONTENT_REQUIRED,
    clientLogos: CONTENT_REQUIRED,
  },

  /**
   * Social profiles exist on the live site but the destination URLs were not
   * verifiable during the audit. Left empty rather than invented.
   */
  social: [] as { label: string; href: string }[],
} as const;

export const locale = "en-IN";
