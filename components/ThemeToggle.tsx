"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const Icon = theme === "system" ? Monitor : isDark ? Moon : Sun;
  const label =
    theme === "system" ? "Browser theme" : isDark ? "Dark mode" : "Light mode";

  return (
    <button
      onClick={cycle}
      title={label}
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300
        bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-secondary)]
        hover:text-[var(--brand-text)] hover:border-[var(--brand)]/40"
    >
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
}
