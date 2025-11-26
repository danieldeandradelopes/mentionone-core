"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const start = () => setIsLoading(true);
  const stop = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, start, stop }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
  }
  return context;
}

// Export para compatibilidade com o código fornecido
export const loadingManager = {
  start: () => {
    // Implementação simples - pode ser melhorada com um singleton ou context
    if (typeof window !== "undefined") {
      document.body.style.cursor = "wait";
    }
  },
  stop: () => {
    if (typeof window !== "undefined") {
      document.body.style.cursor = "default";
    }
  },
};
