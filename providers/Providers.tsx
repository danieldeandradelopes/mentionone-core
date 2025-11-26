"use client";

import { QueryProvider } from "./QueryProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
