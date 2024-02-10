import { FarcasterUserPoaPsQuery } from "../graphql/types";

export function formatFarcasterUserPoaps(input: {
  data: FarcasterUserPoaPsQuery;
}) {
  const { data } = input ?? {};
  return data?.Poaps?.Poap?.map(({ poapEvent }) => poapEvent);
}
