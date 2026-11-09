import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bot,
  Building2,
  Cloud,
  Compass,
  Database,
  Globe,
  Headphones,
  HeartPulse,
  House,
  Landmark,
  LayoutDashboard,
  MonitorSmartphone,
  Plane,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Award,
  Bot,
  Building2,
  Cloud,
  Compass,
  Database,
  Globe,
  Headphones,
  HeartPulse,
  House,
  Landmark,
  LayoutDashboard,
  MonitorSmartphone,
  Plane,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
};

export function getCmsIcon(name?: string | null): LucideIcon {
  if (name && icons[name]) return icons[name];
  return Compass;
}
