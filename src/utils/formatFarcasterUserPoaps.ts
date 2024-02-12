import { FarcasterUserPoaPsQuery } from "../graphql/types";

export function formatFarcasterUserPoaps(data: FarcasterUserPoaPsQuery) {
  return data?.Poaps?.Poap?.map(({ poapEvent }) => poapEvent);
}
