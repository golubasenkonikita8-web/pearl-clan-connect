import { useEffect, useState } from "react";
import { Menu, Moon, Star, Sun, X } from "lucide-react";

const LINKS = [
  ["home", "Главная"],
  ["roster", "Состав"],
  ["stats", "Статистика"],
  ["wars", "Войны"],
  ["ranking", "Рейтинг"],
  ["ranked", "Ранговые"],
  ["join", "Как вступить"],
  ["contacts", "Контакты"],
] as const;

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Включить тёмную тему" : "Включить светлую тему"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-accent"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-black">
          <Star size={18} className="text-primary" fill="currentColor" />
          <span><span className="text-primary">PEARL</span> STAR</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden" aria-label="Меню" onClick={() => setOpen(!open)}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-5 py-3 lg:hidden">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
