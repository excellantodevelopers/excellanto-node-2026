import { createClient, type QueryParams } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

/** Read-only Sanity client for server-side use. Never expose write tokens here. */
export function getSanityClient() {
  if (!projectId) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
}

export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  revalidate = 60
): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch (error) {
    console.error("[Sanity] fetch failed:", error);
    return null;
  }
}
