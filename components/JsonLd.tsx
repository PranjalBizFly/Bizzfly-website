interface JsonLdProps {
  data: object | null;
}

/** Renders structured data. Returns nothing when there is no data. */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
