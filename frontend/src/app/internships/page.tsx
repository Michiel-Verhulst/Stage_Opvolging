"use client";
import { Input } from "@/components/ui/input";
import internshipService from "@/lib/intershipService";
import { TInternship } from "@/types/internship.type";
import { Roles } from "@/types/role.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import InternshipCard from "./internshipCard";
import { useTranslation } from "@/components/language-toggle/useTranslation";

export default function Page() {
  const { data: session } = useSession();
  const [internships, setInternships] = useState<TInternship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<TInternship[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const t = useTranslation();

  useEffect(() => {
    (async () => {
      const nummer = session?.user.nummer;
      if (nummer)
        setInternships(await internshipService.getInternships(nummer, session));
    })();
  }, [session]);

  if (!session) return;
  const userRole = session.user.role;

  return (
    <>
      <div className="mx-auto mt-10 max-w-5xl px-6 lg:px-8">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-1 border-border bg-card  bg-clip-border p-10">
          <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border">
            <div className="flex items-center justify-between space-y-2">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col ">
                  {userRole === Roles.STUDENT ? (
                    <>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {t("internships_title_student")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("internships_description_student")}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {t("internships_title_main")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("internships_description_main")}
                      </p>
                    </>
                  )}
                </div>

                <div className="mr-2">
                  {userRole !== Roles.STUDENT && (
                    <Input
                      onChange={(event) => {
                        const searchTerm = event.target.value;
                        setSearchTerm(searchTerm);
                        console.log(internships);
                        const filteredInternshipsList = internships.filter(
                          (internship) =>
                            internship.companyName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            internship.users.some(
                              (user) =>
                                user.name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) &&
                                user.role === Roles.STUDENT
                            )
                        );

                        console.log(filteredInternshipsList);

                        setFilteredInternships(
                          searchTerm.length > 0
                            ? filteredInternshipsList
                            : internships
                        );
                      }}
                      type="text"
                      placeholder={t("search")}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex-auto">
              <div className="flex flex-wrap">
                {(searchTerm?.length > 0
                  ? filteredInternships
                  : internships
                ).map((internship, id) => (
                  <InternshipCard
                    key={id}
                    internship={internship}
                    userRole={userRole}
                    id={0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
