// Reusable JSON-LD injector for static (export) pages.
// Renders schema.org structured data as a raw script tag.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
