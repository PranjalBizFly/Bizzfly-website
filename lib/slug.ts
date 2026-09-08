/**
 * Heading → anchor id.
 *
 * Directory groups, the hub context navigation and the mega menu all need to
 * name the same group with the same string: the menu links to
 * `/industries/#regulated-and-professional`, the hub renders that id, and the
 * context nav jumps between them. Deriving it from the heading rather than
 * storing a second field means a group cannot be renamed into a broken link —
 * both ends move together.
 */
export function anchorId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
