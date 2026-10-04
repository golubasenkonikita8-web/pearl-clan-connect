import { Swords, Trophy, Users, BarChart3 } from "lucide-react";
import { rankedPeriod, rankedSummary } from "@/lib/members";
import { DemoTag, Reveal } from "./Reveal";

const fmt = (n: number) => n.toLocaleString("ru-RU");
const day = (d: Date) => d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", timeZone: "UTC" });
const MEDALS = ["1 место", "2 место", "3 место"];
const PODIUM = ["from-primary to-gold-soft", "from-muted-foreground to-secondary", "from-chart-1 to-chart-5"];

export function RankedSection() {
  const { sorted, players, total, average } = rankedSummary();
  const period = rankedPeriod();
  const top3 = sorted.slice(0, 3);
  return (
    <section id="ranked" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            Период <span className="font-num">{day(period.start)} – {day(period.end)}</span>
          </p>
          <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-black sm:text-5xl">
            <Trophy className="text-primary" size={36} /> Ранговые сражения <DemoTag />
          </h2>
          <p className="mt-3 text-muted-foreground">Лучшие игроки за текущий 7-дневный период</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [Users, fmt(players), "Игроков участвует"],
            [Swords, fmt(total), "Трофеев заработано всего"],
            [BarChart3, fmt(average), "В среднем на игрока"],
          ].map(([Icon, value, label]) => {
            const I = Icon as typeof Users;
            return (
              <div key={String(label)} className="glass glow-hover rounded-xl p-5">
                <I className="text-primary" />
                <p className="mt-4 font-num text-3xl font-bold">{String(value)}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{String(label)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {top3.map((p, i) => (
            <div key={p.name} className={`glass glow-hover relative overflow-hidden rounded-xl p-6 text-center ring-1 ring-primary/40 ${i === 0 ? "sm:order-2 sm:-mt-4" : i === 1 ? "sm:order-1" : "sm:order-3"}`}>
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${PODIUM[i]}`} />
              <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl" />
              <span aria-label={MEDALS[i]} className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${PODIUM[i]} font-num text-2xl font-bold text-primary-foreground shadow-[0_0_28px_var(--glow)]`}>{i + 1}</span>
              <p className="relative mt-3 truncate text-lg font-bold">{p.name}</p>
              <p className="relative mt-2 font-num text-3xl font-bold text-primary">{fmt(p.trophies)}</p>
              <p className="relative text-xs uppercase text-muted-foreground">трофеев за период</p>
            </div>
          ))}
        </div>

        <ol className="mt-6 space-y-2">
          {sorted.slice(3).map((p, i) => (
            <li key={p.name} className="glass glow-hover flex items-center gap-4 rounded-xl px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted font-num font-bold text-muted-foreground">{i + 4}</span>
              <span className="min-w-0 flex-1 truncate font-bold">{p.name}</span>
              <span className="font-num text-lg font-bold text-primary">{fmt(p.trophies)}</span>
              <Trophy size={16} className="text-primary" />
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted-foreground">Учитываются только трофеи, заработанные в ранговых сражениях за текущие 7 дней, а не общий счёт аккаунта.</p>
      </Reveal>
    </section>
  );
}
