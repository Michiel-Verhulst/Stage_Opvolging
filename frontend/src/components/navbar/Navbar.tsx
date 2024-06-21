"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ModeToggle } from "../dark-mode/switch";
import LanguageToggle from "../language-toggle/LanguageToggle";
import { useTranslation } from "../language-toggle/useTranslation";
import { ThemeCustomizer } from "../themes/components/theme-customizer";
import DesktopLinks from "./DesktopLinks";
import HamburgerMenu from "./HamburgerMenu";
import ProfileDropDown from "./ProfileDropDown";

const navigation = [
  { name: "Internships", href: "/internships" },
  { name: "Students", href: "/students" },
  { name: "Mentors", href: "/mentors" },
  { name: "Coaches", href: "/begeleiders" },
  { name: "Forms", href: "/forms" },
  { name: "OPOs", href: "/opos" },
];
export default function Navbar() {
  const { theme } = useTheme();
  const path = usePathname();
  const { data: session } = useSession();
  const t = useTranslation();

  const filteredNavigation = useMemo(() => {
    if (session) {
      return session.user.role === "COORDINATOR"
        ? navigation
        : navigation.slice(0, 1);
    }
    return [];
  }, [session]);

  {
    /* Choose the right description */
  }
  function getHoverText(userRole: string) {
    switch (userRole) {
      case "STUDENT":
        return t("student_text");

      case "MENTOR":
        return t("mentor_text");

      case "COACH":
        return t("coach_text");

      case "COORDINATOR":
        return t("coordinator-text");

      default:
        return "No hover text";
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-1 border-border bg-background">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-2">
          {/* Mobile hamburger menu */}
          <HamburgerMenu navigation={filteredNavigation} />
          {/* Navbar */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}

            {/* NavLinks (hidden in mobile mode) */}
            <DesktopLinks>
              <Image
                src="https://intranet.ucll.be/sites/all/themes/ucll_intranet/images/logo.svg"
                alt="Logo UCLL Intranet"
                className={cn([{ "brightness-0 filter": theme == "light" }])}
                width={100}
                height={60}
              />
              <NavigationMenu>
                <NavigationMenuList>
                  {filteredNavigation.map((item, key) => (
                    <NavigationMenuItem key={key}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          active={item.href === path}
                        >
                          <div
                            className={cn(
                              item.href === path
                                ? "font-semibold"
                                : "font-normal"
                            )}
                          >
                            {t(item.name)}
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </DesktopLinks>
          </div>
          <ThemeCustomizer />

          {/*Profile menu*/}
          {/* Display which user is logged in with description */}
          {session && (
            <div
              className="ml-2 cursor-pointer text-sm"
              title={getHoverText(session.user.role)}
            >
              {session.user.name} {t("as")}{" "}
              <strong>{t(session.user.role)}</strong>
            </div>
          )}

          {/* Profile menu */}
          <div className="flex items-center">
            {/* BellIcon */}
            {/* <Notification /> */}
            <LanguageToggle />
            {/* DarkMode */}
            <ModeToggle />
            {/* Profile dropdown */}
            <ProfileDropDown />
          </div>
        </div>
      </div>
    </nav>
  );
}
