"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

export function FilterDropdown({
  icon: Icon,
  value,
  options,
  onChange,
  capitalizeLabels = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  capitalizeLabels?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const labelClass = capitalizeLabels ? "capitalize" : "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 pl-3.5 pr-3 py-2.5 text-sm border rounded-xl bg-[var(--surface)] text-[var(--text-primary)] transition-colors focus:outline-none ${
          open ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30" : "border-[var(--border)] hover:border-[var(--brand)]/50"
        }`}
      >
        <Icon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
        <span className={`whitespace-nowrap ${labelClass}`}>{selected?.label ?? "Select"}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 min-w-full w-max bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg py-1 overflow-hidden">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-4 px-3.5 py-2 text-sm text-left transition-colors ${labelClass} ${
                o.value === value
                  ? "bg-[var(--brand-light)] text-[var(--brand)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
              }`}
            >
              {o.label}
              {o.value === value && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
