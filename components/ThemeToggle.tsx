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
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors
        bg-stone-100 hover:bg-green-100 text-stone-600 hover:text-green-700
        dark:bg-slate-800 dark:hover:bg-green-900/40 dark:text-slate-300 dark:hover:text-green-400"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
