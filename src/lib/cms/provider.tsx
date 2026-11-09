"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultCategories, defaultHomepage, defaultServices, defaultSettings } from "./defaults";
import type { CmsContextValue } from "./types";

const CmsContext = createContext<CmsContextValue>({
  settings: defaultSettings,
  services: defaultServices,
  categories: defaultCategories,
  homepage: defaultHomepage,
});

export function CmsProvider({
  value,
  children,
}: {
  value: CmsContextValue;
  children: ReactNode;
}) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
