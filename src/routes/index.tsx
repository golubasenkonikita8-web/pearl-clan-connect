import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  BadgeCheck,
  Castle,
  ChevronRight,
  Crown,
  ExternalLink,
  Flame,
  Globe2,
  HeartHandshake,
  Languages,
  Medal,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

import clanInfo from "@/assets/clan-info-current.png.asset.json";
import { Button } from "@/components/ui/button";
import { CLAN_JOIN_URL, CLAN_TAG, MIN_TOWN_HALL } from "@/lib/clan";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PEARL STAR — клан Clash of Clans" },
      {
        name: "description",
        content: "Вступай в PEARL STAR: активный русскоязычный клан Clash of Clans, набор от ТХ10.",
      },
      { property: "og:title", content: "PEARL STAR — клан Clash of Clans" },
      {
        property: "og:description",
        content: "КВ нон-стоп, ЛКВ, рейды столицы и активный набор от ТХ10.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const offers = [
  { icon: Swords, title: "КВ нон-стоп", text: "Клановые войны без перерывов" },
  { icon: Trophy, title: "Активные ЛКВ", text: "Играем в Лиге Клановых Войн" },
  { icon: HeartHandshake, title: "Донат", text: "Быстрый и качественный донат войск" },
  { icon: Castle, title: "Рейды столицы", text: "Регулярные атаки каждые выходные" },
  { icon: Users, title: "Хороший коллектив", text: "Дружная и активная команда" },
  { icon: BadgeCheck, title: "Поддержка", text: "Помогаем новичкам и опытным" },
];

const expectations = [
  { icon: Castle, title: `ТХ${MIN_TOWN_HALL}+`, text: `Ратуша ${MIN_TOWN_HALL} уровня или выше` },
  { icon: Swords, title: "Все атаки в КВ", text: "Обязательно используй все атаки" },
  { icon: Flame, title: "Участие в рейдах", text: "Атакуй столицу каждые выходные" },
  { icon: MessageCircle, title: "Активность в чате", text: "Общайся с соклановцами" },
];

function JoinButton({ label = "Вступить в клан" }: { label?: string }) {
  return (
    <Button asChild variant="hero" size="hero">
      <a href={CLAN_JOIN_URL} target="_blank" rel="noreferrer">
        <Crown aria-hidden="true" />
        {label}
        <ExternalLink aria-hidden="true" />
      </a>
    </Button>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[92vh] items-center justify-center border-b border-border px-5 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent),transparent_58%)] opacity-50" />
        {["top-[12%] left-[8%]", "top-[22%] right-[10%]", "bottom-[20%] left-[14%]", "bottom-[12%] right-[15%]"].map((position, index) => (
          <Star key={position} className={`absolute ${position} animate-star-pulse text-primary`} size={index % 2 ? 13 : 18} fill="currentColor" />
        ))}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground shadow-[0_0_70px_var(--glow)]">
            <Star size={46} fill="currentColor" />
            <span className="absolute -right-3 -top-1 rounded-full border border-primary/30 bg-background px-2 py-1 text-[10px] font-bold text-gold-soft">CoC</span>
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-primary">Clash of Clans</p>
          <h1 className="font-display text-5xl font-black leading-none sm:text-7xl lg:text-8xl">
            <span className="text-primary">PEARL</span> STAR
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            КВ нон-стоп, активные ЛКВ и рейды столицы. Ищем бойцов, которые играют командой.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs text-gold-soft">
            <span className="rounded-full border border-border bg-panel px-3 py-2">ЛКВ — ЗОЛОТАЯ II</span>
            <span className="rounded-full border border-border bg-panel px-3 py-2">СТОЛИЦА — СЕРЕБРЯНАЯ II</span>
            <span className="rounded-full border border-border bg-panel px-3 py-2">НАБОР ОТ ТХ{MIN_TOWN_HALL}</span>
          </div>
          <div className="mt-8"><JoinButton /></div>
          <a href="#details" aria-label="Перейти к информации о клане" className="mt-16 text-muted-foreground transition-colors hover:text-primary">
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </section>

      <section id="details" className="border-b border-border px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">О клане</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">PEARL STAR в игре</h2>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
              <img src={clanInfo.url} alt="Статистика клана PEARL STAR" className="aspect-video w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {[
                [Users, "23 / 50", "участников"],
                [Globe2, "Международный", "расположение"],
                [Languages, "Русский", "язык чата"],
                [Swords, "Всегда", "частота войн"],
                [Medal, "Золотая II", "лига войн"],
                [Trophy, "1205", "трофеев столицы"],
              ].map(([Icon, value, label]) => {
                const StatIcon = Icon as typeof Users;
                return (
                  <div key={String(label)} className="min-h-36 bg-panel p-5">
                    <StatIcon className="mb-5 text-primary" />
                    <p className="font-bold text-panel-foreground">{String(value)}</p>
                    <p className="mt-1 text-xs uppercase text-muted-foreground">{String(label)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">От нас</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-5xl">Что мы предлагаем игрокам</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {offers.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group min-h-48 bg-card p-7 transition-colors hover:bg-accent">
                <Icon className="text-primary transition-transform group-hover:scale-110" size={30} />
                <h3 className="mt-8 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">От тебя</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Что ждём от бойцов</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {expectations.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="flex items-center gap-5 border-b border-border py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"><Icon /></span>
                <div className="flex-1"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div>
                <span className="font-display text-2xl text-primary/40">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Sparkles className="text-primary" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-primary">Активный набор</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Готов вступить?</h2>
              <p className="mt-5 max-w-xl text-muted-foreground">Открытый международный клан с русским чатом. Открой профиль PEARL STAR прямо в Clash of Clans и отправь запрос на вступление.</p>
              <a href={CLAN_JOIN_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-mono text-xl font-bold text-gold-soft hover:text-primary">
                {CLAN_TAG}<ChevronRight />
              </a>
              <div className="mt-8"><JoinButton label="Открыть клан" /></div>
            </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted-foreground">
        © 2026 PEARL STAR · Clash of Clans
      </footer>
    </main>
  );
}