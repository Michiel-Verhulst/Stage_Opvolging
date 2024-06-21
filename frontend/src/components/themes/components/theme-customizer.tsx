"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Skeleton } from "@nextui-org/react";
import { CheckIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";
import { useConfig } from "../hooks/use-config";
import { themes } from "../registery/themes";
export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="hidden md:flex">
        <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
          {mounted ? (
            <>
              {["rose", "blue"].map((color) => {
                const theme = themes.find((theme) => theme.name === color);

                const isActive = config.theme === color;

                if (!theme) {
                  return null;
                }

                return (
                  <TooltipProvider>
                    <Tooltip key={theme.name}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            setConfig({
                              ...config,
                              theme: theme.name,
                            });
                          }}
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                            isActive
                              ? "border-[--theme-primary]"
                              : "border-transparent"
                          )}
                          style={
                            {
                              "--theme-primary": `hsl(${theme?.activeColor[
                                mode === "dark" ? "dark" : "light"
                              ]})`,
                            } as React.CSSProperties
                          }
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                            )}
                          >
                            {isActive && (
                              <CheckIcon className="h-4 w-4 text-white" />
                            )}
                          </span>
                          <span className="sr-only">{theme.label}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        align="center"
                        className="rounded-[0.5rem] bg-background text-foreground"
                      >
                        {theme.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </>
          ) : (
            <>
              <div className="mr-1 flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// function getThemeCode(theme: Theme, radius: number) {
//     if (!theme) {
//         return ""
//     }

//     return template(BASE_STYLES_WITH_VARIABLES)({
//         colors: theme.cssVars,
//         radius,
//     })
// }

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
  }
 
  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
  }
}
`;
