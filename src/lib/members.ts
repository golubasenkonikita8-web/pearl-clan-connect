export type ClanRole = "Глава" | "Соруководитель" | "Старейшина" | "Участник" | "Новичок";

export interface ClanMember {
  name: string;
  role: ClanRole;
  /** Experience level shown on the in-game badge. */
  level: number;
  donated: number;
  received: number;
  trophies: number;
}

/** Real roster taken from in-game screenshots of the clan member list. */
export const MEMBERS: ClanMember[] = [
  { name: "Цветок", role: "Старейшина", level: 30, donated: 2251, received: 0, trophies: 364 },
  { name: "KeypBoss", role: "Соруководитель", level: 28, donated: 665, received: 425, trophies: 311 },
  { name: "Raryumim", role: "Глава", level: 26, donated: 2084, received: 1516, trophies: 287 },
  { name: "RentoJS", role: "Соруководитель", level: 22, donated: 3217, received: 2099, trophies: 553 },
  { name: "Tw1sty", role: "Старейшина", level: 19, donated: 0, received: 0, trophies: 384 },
  { name: "yazitov_95", role: "Участник", level: 19, donated: 265, received: 0, trophies: 39 },
  { name: "на фоксе", role: "Старейшина", level: 17, donated: 223, received: 410, trophies: 81 },
  { name: "mk", role: "Участник", level: 15, donated: 0, received: 0, trophies: 0 },
  { name: "Олег", role: "Участник", level: 15, donated: 138, received: 252, trophies: 0 },
  { name: "KraKoVwV", role: "Участник", level: 14, donated: 431, received: 1810, trophies: 142 },
  { name: "Lama4ka", role: "Участник", level: 13, donated: 230, received: 1372, trophies: 417 },
  { name: "Cyberpunk", role: "Участник", level: 12, donated: 21, received: 70, trophies: 83 },
  { name: "tdjxn", role: "Участник", level: 11, donated: 0, received: 0, trophies: 0 },
  { name: "NINZA", role: "Участник", level: 11, donated: 0, received: 0, trophies: 0 },
  { name: "на фоксе 57", role: "Участник", level: 10, donated: 0, received: 35, trophies: 0 },
  { name: "PHOENIX", role: "Участник", level: 9, donated: 89, received: 1134, trophies: 52 },
  { name: "Sub-Zero", role: "Старейшина", level: 9, donated: 0, received: 0, trophies: 0 },
  { name: "shoxjahon", role: "Новичок", level: 8, donated: 0, received: 42, trophies: 397 },
  { name: "Gorseezh", role: "Старейшина", level: 8, donated: 90, received: 72, trophies: 138 },
  { name: "Letov", role: "Участник", level: 6, donated: 0, received: 0, trophies: 0 },
  { name: "*@@* (2.0)", role: "Участник", level: 3, donated: 0, received: 0, trophies: 0 },
  { name: "WEKSY", role: "Участник", level: 1, donated: 0, received: 0, trophies: 0 },
  { name: "Goni Boss", role: "Старейшина", level: 1, donated: 35, received: 0, trophies: 0 },
];

export const totalDonated = MEMBERS.reduce((sum, m) => sum + m.donated, 0);

export function leaderboard(members: ClanMember[] = MEMBERS) {
  return [...members].sort((a, b) => b.trophies - a.trophies);
}

export function searchMembers(query: string, members: ClanMember[] = MEMBERS) {
  const q = query.trim().toLowerCase();
  return q ? members.filter((m) => m.name.toLowerCase().includes(q)) : members;
}

/** Demo-only war data: no real history was provided. */
export const DEMO_WARS = [
  { date: "28.09.2026", opponent: "Demo Clan A", result: "win", score: "45 : 38", destruction: 92 },
  { date: "26.09.2026", opponent: "Demo Clan B", result: "win", score: "42 : 40", destruction: 88 },
  { date: "24.09.2026", opponent: "Demo Clan C", result: "loss", score: "35 : 41", destruction: 74 },
  { date: "22.09.2026", opponent: "Demo Clan D", result: "win", score: "47 : 30", destruction: 95 },
  { date: "20.09.2026", opponent: "Demo Clan E", result: "win", score: "40 : 39", destruction: 86 },
] as const;

export const DEMO_WAR_STATS = { wins: 4, losses: 1, streak: 2 };
export const winRate = (wins: number, losses: number) =>
  wins + losses === 0 ? 0 : Math.round((wins / (wins + losses)) * 100);

/** Ranked battles run in 7-day periods; periods are counted from this Monday (UTC). */
export const RANKED_PERIOD_ANCHOR = Date.UTC(2026, 8, 28);
const WEEK = 7 * 24 * 60 * 60 * 1000;

export function rankedPeriod(now: number = Date.now()) {
  const index = Math.floor((now - RANKED_PERIOD_ANCHOR) / WEEK);
  const start = RANKED_PERIOD_ANCHOR + index * WEEK;
  return { index, start: new Date(start), end: new Date(start + WEEK - 1) };
}

/** Demo-only: trophies earned in ranked battles during the current period. Replace with real numbers. */
export const DEMO_RANKED: { name: string; trophies: number }[] = [
  { name: "RentoJS", trophies: 1250 },
  { name: "Raryumim", trophies: 1080 },
  { name: "KeypBoss", trophies: 950 },
  { name: "Цветок", trophies: 820 },
  { name: "Tw1sty", trophies: 760 },
  { name: "Lama4ka", trophies: 610 },
  { name: "KraKoVwV", trophies: 540 },
  { name: "Gorseezh", trophies: 410 },
];

export function rankedSummary(entries = DEMO_RANKED) {
  const sorted = [...entries].sort((a, b) => b.trophies - a.trophies);
  const total = sorted.reduce((s, e) => s + e.trophies, 0);
  return { sorted, players: sorted.length, total, average: sorted.length ? Math.round(total / sorted.length) : 0 };
}
