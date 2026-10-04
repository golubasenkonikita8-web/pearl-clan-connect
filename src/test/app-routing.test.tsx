import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { CLAN_JOIN_URL, CLAN_TAG, MIN_TOWN_HALL } from "@/lib/clan";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Clan recruitment rules", () => {
  it("accepts players from Town Hall 10", () => {
    expect(MIN_TOWN_HALL).toBe(10);
  });

  it("uses the supplied clan code", () => {
    expect(CLAN_TAG).toBe("#2CG2U80CP");
  });

  it("opens the supplied Clash of Clans join link", () => {
    expect(CLAN_JOIN_URL).toBe(
      "https://link.clashofclans.com/ru?action=OpenClanProfile&tag=2CG2U80CP",
    );
  });
});
