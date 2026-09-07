/**
 * Module resolution hooks for scripts run directly by Node.
 *
 * Next resolves the "@/..." tsconfig alias and extensionless TypeScript
 * imports during the app build. Standalone scripts (content validation) run
 * outside that pipeline, so they need the same two behaviours here.
 */
import { registerHooks } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve as resolvePath } from "node:path";
import { existsSync } from "node:fs";

const root = pathToFileURL(resolvePath(process.cwd()) + "/").href;

/** Append .ts when the specifier has no extension and a .ts file exists. */
function withTsExtension(url) {
  if (/\.[a-z]+$/i.test(url)) return url;
  try {
    if (existsSync(fileURLToPath(`${url}.ts`))) return `${url}.ts`;
  } catch {
    /* Not a file URL — leave it alone. */
  }
  return url;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return nextResolve(
        withTsExtension(new URL(specifier.slice(2), root).href),
        context,
      );
    }

    if (specifier.startsWith(".") && context.parentURL) {
      return nextResolve(
        withTsExtension(new URL(specifier, context.parentURL).href),
        context,
      );
    }

    return nextResolve(specifier, context);
  },
});
