"use client";

import { createContext, useContext, useState } from "react";

export type HomeMode = "financial" | "technical";

type HomeModeContextType = {
  homeMode: HomeMode;
  setHomeMode: (mode: HomeMode) => void;
};

const HomeModeContext = createContext<HomeModeContextType | undefined>(undefined);

export function HomeModeProvider({ children }: { children: React.ReactNode }) {
  const [homeMode, setHomeMode] = useState<HomeMode>("financial");

  return (
    <HomeModeContext.Provider value={{ homeMode, setHomeMode }}>
      {children}
    </HomeModeContext.Provider>
  );
}

export function useHomeMode() {
  const ctx = useContext(HomeModeContext);
  if (!ctx) throw new Error("useHomeMode must be used inside HomeModeProvider");
  return ctx;
}
