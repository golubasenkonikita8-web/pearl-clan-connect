import { useState } from "react";
import {
  BadgeCheck,
  ClipboardCheck,
  Crown,
  Flame,
  HandHelping,
  HeartHandshake,
  MailPlus,
  Medal,
  MessageSquare,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Swords,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { CLAN_JOIN_URL, LEADER_HANDLE, LEADER_TELEGRAM_URL, MIN_TOWN_HALL } from "@/lib/clan";
import {
  DEMO_WARS,
  DEMO_WAR_STATS,
  MEMBERS,
  leaderboard,
  searchMembers,
  totalDonated,
  winRate,
  type ClanMember,
} from "@/lib/members";
import { DemoTag, Reveal, SectionHead } from "./Reveal";

const fmt = (n: number) => n.toLocaleString("ru-RU");
const isStaff = (m: ClanMember) => m.role === "Глава" || m.role === "Соруководитель";

function Avatar({ member, size = "md" }: { member: ClanMember; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-16 w-16 text-2xl" : "h-12 w-12 text-lg";
  return (
    <div className={`relative flex ${dim} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-gold-soft font-display font-black text-primary-foreground shadow-[0_0_24px_var(--glow)]`}>
      {member.name.replace(/[^\p{L}\p{N}]/gu, "").charAt(0).toUpperCase() || "★"}
      <span className="absolute -bottom-1.5 -right-1.5 rounded-md border border-border bg-background px-1.5 font-num text-[11px] font-bold text-primary">
        {member.level}
      </span>
    </div>
  );
}

function MemberCard({ member, featured }: { member: ClanMember; featured?: boolean }) {
  return (
    <article className={`glass glow-hover rounded-xl p-5 ${featured ? "ring-1 ring-primary/50" : ""}`}>
      <div className="flex items-center gap-4">
        <Avatar member={member} size={featured ? "lg" : "md"} />
        <div className="min-w-0">
          <h3 className="truncate font-bold">{member.name}</h3>
          <p className={`mt-0.5 flex items-center gap-1 text-xs uppercase tracking-wider ${featured ? "text-primary" : "text-muted-foreground"}`}>
            {member.role === "Глава" && <Crown size={12} />}
            {member.role === "Соруководитель" && <ShieldCheck size={12} />}
            {member.role}
          </p>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        {[
          ["Трофеи", member.trophies],
          ["Отдал", member.donated],
          ["Получил", member.received],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-muted/60 py-2">
            <dd className="font-num text-lg font-bold">{fmt(Number(value))}</dd>
            <dt className="text-[10px] uppercase text-muted-foreground">{label}</dt>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function RosterSection() {
  const [query, setQuery] = useState("");
  const found = searchMembers(query);
  const staff = found.filter(isStaff).sort((a) => (a.role === "Глава" ? -1 : 1));
  const rest = found.filter((m) => !isStaff(m));
  return (
    <section id="roster" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead kicker={`${MEMBERS.length} бойцов`} title="Состав клана" />
          <div className="relative mb-10 w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по никнейму" className="glass pl-9" />
          </div>
        </div>
        {staff.length > 0 && (
          <>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Руководство</p>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {staff.map((m) => <MemberCard key={m.name} member={m} featured />)}
            </div>
          </>
        )}
        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rest.map((m) => <MemberCard key={m.name} member={m} />)}
          </div>
        )}
        {found.length === 0 && <p className="text-center text-muted-foreground">Никого не нашли по запросу «{query}».</p>}
      </Reveal>
    </section>
  );
}

function StatCard({ icon: Icon, value, label, demo }: { icon: typeof Users; value: string; label: string; demo?: boolean }) {
  return (
    <div className="glass glow-hover relative overflow-hidden rounded-xl p-6">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
      <div className="flex items-start justify-between">
        <Icon className="text-primary" />
        {demo && <DemoTag />}
      </div>
      <p className="mt-6 font-num text-4xl font-bold">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const { wins, losses, streak } = DEMO_WAR_STATS;
  return (
    <section id="stats" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHead kicker="Цифры" title="Статистика" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={Users} value={`${MEMBERS.length} / 50`} label="Участников" />
          <StatCard icon={HeartHandshake} value={fmt(totalDonated)} label="Войск пожертвовано за сезон" />
          <StatCard icon={TrendingUp} value={`${winRate(wins, losses)}%`} label="Процент побед" demo />
          <StatCard icon={Flame} value={String(streak)} label="Текущая серия побед" demo />
          <StatCard icon={Trophy} value={String(wins)} label="Побед в КВ" demo />
          <StatCard icon={Shield} value={String(losses)} label="Поражений" demo />
        </div>
      </Reveal>
    </section>
  );
}

export function WarsSection() {
  const wins = DEMO_WARS.filter((w) => w.result === "win").length;
  return (
    <section id="wars" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHead kicker="КВ" title="Клановые войны" demo />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass overflow-x-auto rounded-xl">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4">Дата</th><th className="p-4">Соперник</th><th className="p-4">Звёзды</th><th className="p-4">Разрушение</th><th className="p-4">Итог</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_WARS.map((w) => (
                  <tr key={w.date} className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40">
                    <td className="p-4 font-num">{w.date}</td>
                    <td className="p-4">{w.opponent}</td>
                    <td className="p-4 font-num font-bold">{w.score}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${w.destruction}%` }} /></div>
                        <span className="font-num">{w.destruction}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${w.result === "win" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>
                        {w.result === "win" ? "Победа" : "Поражение"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="glass relative overflow-hidden rounded-xl p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--glow),transparent_65%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Лиговые войны</p>
                <Medal className="text-primary" />
              </div>
              <p className="mt-6 text-xs uppercase text-muted-foreground">Текущая лига</p>
              <p className="font-display text-3xl font-black">Золотая <span className="font-num">II</span></p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Последний итог", "3 место"],
                  ["Медали", "120"],
                  ["Лучший результат", "1 место"],
                  ["Побед в КВ", `${wins} / ${DEMO_WARS.length}`],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg bg-muted/60 p-3">
                    <p className="font-num text-lg font-bold">{v}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-muted-foreground">Лига — реальная, остальные значения <DemoTag /></p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function RankingSection() {
  const top = leaderboard();
  return (
    <section id="ranking" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-4xl">
        <SectionHead kicker="Топ по трофеям" title="Лучшие игроки" />
        <ol className="space-y-2">
          {top.map((m, i) => {
            const podium = i < 3;
            const medal = ["from-primary to-gold-soft", "from-muted-foreground to-secondary", "from-chart-1 to-chart-5"][i];
            return (
              <li key={m.name} className={`glass glow-hover flex items-center gap-4 rounded-xl px-4 py-3 ${podium ? "py-4 ring-1 ring-primary/40" : ""}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-num text-lg font-bold ${podium ? `bg-gradient-to-br ${medal} text-primary-foreground shadow-[0_0_20px_var(--glow)]` : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-bold ${podium ? "text-lg" : ""}`}>{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <span className="flex items-center gap-1.5 font-num text-xl font-bold text-primary">
                  {fmt(m.trophies)} <Trophy size={16} />
                </span>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}

const STEPS = [
  { icon: ClipboardCheck, title: "Ознакомься с требованиями", text: `Ратуша ${MIN_TOWN_HALL}+ и активность в войнах` },
  { icon: MailPlus, title: "Отправь заявку", text: "Открой профиль клана и нажми «Вступить»" },
  { icon: MessageSquare, title: "Свяжись с руководством", text: `Напиши главе в Telegram — ${LEADER_HANDLE}` },
  { icon: BadgeCheck, title: "Получи приглашение", text: "Добро пожаловать в PEARL STAR!" },
];

export function HowToJoinSection() {
  return (
    <section id="join" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHead kicker="4 шага" title="Как вступить" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="glass glow-hover relative rounded-xl p-6">
              <span className="absolute right-5 top-4 font-num text-4xl font-bold text-primary/25">0{i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-gold-soft text-primary-foreground"><Icon /></span>
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href={CLAN_JOIN_URL} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary underline-offset-4 hover:underline">Открыть клан в игре →</a>
        </div>
      </Reveal>
    </section>
  );
}

const WHY = [
  { icon: Zap, title: "Активный клан", text: "Каждый день в игре" },
  { icon: Swords, title: "Регулярные войны", text: "КВ нон-стоп и ЛКВ" },
  { icon: Users, title: "Дружное сообщество", text: "Без токсичности" },
  { icon: Crown, title: "Активное руководство", text: "Всегда на связи" },
  { icon: HandHelping, title: "Помощь новичкам", text: "Подскажем расстановку и атаки" },
  { icon: TrendingUp, title: "Стабильное развитие", text: "Растём вместе" },
];

export function WhySection() {
  return (
    <section className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHead kicker="Преимущества" title="Почему PEARL STAR?" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass glow-hover flex items-center gap-4 rounded-xl p-5">
              <Icon className="shrink-0 text-primary" size={28} />
              <div><h3 className="font-bold">{title}</h3><p className="text-sm text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.3 18.3 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.7.1 18.2a19.9 19.9 0 0 0 6 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.8-3.6-13.8ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z" />
    </svg>
  );
}

export function ContactsSection() {
  return (
    <section id="contacts" className="border-b border-border px-5 py-20">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Контакты</p>
        <h2 className="mt-3 text-3xl font-black sm:text-5xl">Мы на связи</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href={LEADER_TELEGRAM_URL} target="_blank" rel="noreferrer" className="glass glow-hover flex items-center justify-center gap-3 rounded-xl p-6 font-bold">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chart-2/20 text-chart-2"><Send size={20} /></span>
            Telegram — {LEADER_HANDLE}
          </a>
          <div aria-disabled="true" className="glass flex cursor-not-allowed items-center justify-center gap-3 rounded-xl p-6 font-bold opacity-60">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chart-1/20 text-chart-1"><DiscordIcon /></span>
            Discord — скоро
          </div>
        </div>
      </Reveal>
    </section>
  );
}
