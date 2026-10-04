import { describe, expect, it } from "vitest";
import { MEMBERS, leaderboard, searchMembers, winRate } from "./members";

describe("clan roster", () => {
  it("has 23 members", () => expect(MEMBERS).toHaveLength(23));
  it("leader is Raryumim", () => expect(MEMBERS.find((m) => m.role === "Глава")?.name).toBe("Raryumim"));
  it("leaderboard top is RentoJS", () => expect(leaderboard()[0]?.name).toBe("RentoJS"));
  it("search is case-insensitive", () => expect(searchMembers("rary").map((m) => m.name)).toEqual(["Raryumim"]));
  it("win rate", () => expect(winRate(4, 1)).toBe(80));
});
