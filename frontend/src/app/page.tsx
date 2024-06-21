"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Errors from "@/components/ui/Errors";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const usernameOrEmail = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  if (session) router.push("/internships");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (usernameOrEmail.current === null) return;
    if (password.current === null) return;
    const res = await signIn("credentials", {
      usernameOrEmail: usernameOrEmail.current.value,
      password: password.current.value,
      redirect: false,
      callbackUrl: "/internships",
    });

    if (res !== undefined && res.ok) {
      router.push("/internships");
    } else {
      setIsLoading(false);
      usernameOrEmail.current.value = "";
      password.current.value = "";
      setErrors(["Can't login with the provided credentials"]);
    }
  };

  useEffect(() => {
    //object can be null
    if (usernameOrEmail.current !== null) {
      usernameOrEmail.current.focus();
    }
  });
  const t = useTranslation();
  return (
    <>
      <div className="mt-10 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-lg border-1 border-gray-300 border-opacity-20 bg-card p-10 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full stroke-card-foreground"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-card-foreground">
            {t("signin")}
          </h2>
          {errors?.length > 0 && (
            <Errors errors={errors} clear={() => setErrors([])} />
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="space-y-2 rounded-md shadow-sm">
              <Input
                type="email"
                placeholder={t("email")}
                ref={usernameOrEmail}
              />
              <Input
                type="password"
                placeholder={t("password")}
                ref={password}
              />
            </div>
            <Button variant="default" size="default" type="submit">
              {!isLoading ? <p>{t("login")}</p> : <Loading />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
