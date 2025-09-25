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