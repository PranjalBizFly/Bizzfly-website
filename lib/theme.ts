/**
 * Theme constants and the pre-paint initialisation script.
 *
 * The script below is inlined into <head> in app/layout.tsx and runs before
 * the browser paints anything. That ordering is the whole point: if the
 * attribute were set from a React effect, the first paint would use the
 * light palette and a returning dark-theme visitor would see a white flash.
 *
 * It also means <html> always carries an explicit data-theme, resolved from
 * the stored choice or the OS preference. Nothing else in the system has to
 * reason about "no preference", and the stylesheet needs no
 * prefers-color-scheme rule that could disagree with the attribute.
 */

export const THEME_STORAGE_KEY = "bizzfly-theme";

export type Theme = "light" | "dark";

/** Fired on window when the theme changes, so every toggle stays in sync. */
export const THEME_EVENT = "bizzfly:themechange";

/**
 * Runs before first paint. Kept deliberately small and defensive: storage
 * access throws in some privacy modes, and a theme script must never be the
 * reason a page fails to render.
 */
export const themeInitScript = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var t=s==="dark"||s==="light"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
document.documentElement.setAttribute("data-theme",t);
}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;
