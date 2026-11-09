import { defineField, defineType } from "sanity";

export const ICON_OPTIONS = [
  { title: "Bot", value: "Bot" },
  { title: "Cloud", value: "Cloud" },
  { title: "Compass", value: "Compass" },
  { title: "Trending up", value: "TrendingUp" },
  { title: "Share", value: "Share2" },
  { title: "Search", value: "Search" },
  { title: "Smartphone", value: "Smartphone" },
  { title: "Database", value: "Database" },
  { title: "Users", value: "Users" },
  { title: "Award", value: "Award" },
  { title: "Headphones", value: "Headphones" },
  { title: "Layout dashboard", value: "LayoutDashboard" },
  { title: "Monitor / smartphone", value: "MonitorSmartphone" },
  { title: "House", value: "House" },
  { title: "User check", value: "UserCheck" },
  { title: "Shopping cart", value: "ShoppingCart" },
  { title: "Heart pulse", value: "HeartPulse" },
  { title: "Landmark", value: "Landmark" },
  { title: "Globe", value: "Globe" },
  { title: "Plane", value: "Plane" },
  { title: "Building", value: "Building2" },
];

export const iconName = defineType({
  name: "iconName",
  title: "Icon",
  type: "string",
  options: { list: ICON_OPTIONS, layout: "dropdown" },
});
