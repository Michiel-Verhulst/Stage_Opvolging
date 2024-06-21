import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spacer } from "@nextui-org/react";
import { User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useTranslation } from "../language-toggle/useTranslation";

interface ProfileDropDownProps {}

const ProfileDropDown: FC<ProfileDropDownProps> = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const signOutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.push(data.url);
  };
  const t = useTranslation();
  return (
    <>
      <Spacer x={1.5} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <User className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {session ? (
            <DropdownMenuItem onClick={signOutHandler}>
              {t("logout")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => signIn()}>
              {t("login")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
