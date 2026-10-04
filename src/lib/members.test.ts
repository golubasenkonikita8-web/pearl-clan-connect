import { describe, expect, it } from "vitest";
import { MEMBERS, leaderboard, searchMembers, winRate } from "./members";

describe("clan roster", () => {
  it("has 23 members", () => expect(MEMBERS).toHaveLength(23));
  it("leader is Raryumim", () => expect(MEMBERS.find((m) => m.role === "Глава")?.name).toBe("Raryumim"));
  it("leaderboard top is RentoJS", () => expect(leaderboard()[0]?.name).toBe("RentoJS"));
  it("search is case-insensitive", () => expect(searchMembers("rary").map((m) => m.name)).toEqual(["Raryumim"]));
  it("win rate", () => expect(winRate(4, 1)).toBe(80));
});

import { rankedPeriod, rankedSummary } from "./members";
describe("ranked battles", () => {
  it("summary totals and average", () => {
    const s = rankedSummary([{ name: "a", trophies: 100 }, { name: "b", trophies: 300 }]);
    expect([s.players, s.total, s.average, s.sorted[0]?.name]).toEqual([2, 400, 200, "b"]);
  });
  it("new period starts after 7 days", () => {
    const a = rankedPeriod(Date.UTC(2026, 8, 28, 1));
    const b = rankedPeriod(Date.UTC(2026, 9, 5, 1));
    expect(b.index - a.index).toBe(1);
  });
});
