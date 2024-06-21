"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeWrapper } from "./themes/components/theme-wrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeWrapper defaultTheme="rose">
          <SessionProvider>
            {isClient && <NextUIProvider>{children}</NextUIProvider>}
          </SessionProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
