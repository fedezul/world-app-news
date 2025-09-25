import { Globe, Zap, Cpu, Briefcase, Palette } from "lucide-react";

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const categories = [
  { slug: 'world', name: 'World', icon: Globe },
  { slug: 'sport', name: 'Sport', icon: Zap },
  { slug: 'tech', name: 'Tech', icon: Cpu },
  { slug: 'business', name: 'Business', icon: Briefcase },
  { slug: 'culture', name: 'Culture', icon: Palette }
];


export function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

export function initDarkMode() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) document.documentElement.classList.add("dark");
  }
}
