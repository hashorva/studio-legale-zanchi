'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { useSyncExternalStore } from 'react';

function subscribe() { return () => {}; }

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md hover:bg-muted transition-colors"
      aria-label="Toggle theme"
      title={`Current: ${theme}`}
    >
      {theme === "system" && <SunMoon className="w-5 h-5" />}
      {theme === "light" && <Sun className="w-5 h-5" />}
      {theme === "dark" && <Moon className="w-5 h-5" />}
    </button>
  );
}
