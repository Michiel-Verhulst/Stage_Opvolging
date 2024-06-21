"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Maps from "@/components/maps/Maps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import internshipService from "@/lib/intershipService";
import { cn } from "@/lib/utils";
import { TInternship } from "@/types/internship.type";
import { Roles } from "@/types/role.type";
import { TUser } from "@/types/user.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fromAddress } from "react-geocode";
import InternshipUsersCard from "./internshipUsersCard";

export default function InternshipCard({
  internship,
  id,
  userRole,
}: {
  internship: TInternship;
  id: number;
  userRole: string;
}) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [editableInternship, setEditableInternship] = useState<TInternship>({
    id: internship.id,
    users: internship.users,
    location: internship.location,
    startDate: internship.startDate,
    endDate: internship.endDate,
    companyName: internship.companyName,
    lat: internship.lat,
    lng: internship.lng,
  });

  useEffect(() => {
    setEditableInternship(internship);
  }, [internship]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const changeLocation = async (location: string) => {
    const { lat, lng } = (await fromAddress(location)).results[0].geometry
      .location;

    setEditableInternship({ ...editableInternship, lat, lng });
  };

  const handleUserChange = (user: TUser) => {
    const newUsers = [...editableInternship.users];
    const index = newUsers.findIndex((u) => u.role === user.role);
    newUsers[index] = user;
    setEditableInternship({ ...editableInternship, users: newUsers });
  };

  const updateInternship = async () => {
    console.log(editableInternship);
    await internshipService.updateInternship(editableInternship);
    await changeLocation(editableInternship.location);
    toggleEditMode();
  };
  const t = useTranslation();
  return (
    <Card className="mb-2 w-full" key={id}>
      <CardHeader className="pb-0">
        <div>
          {userRole !== Roles.STUDENT ? (
            <div>
              <CardTitle className="whitespace-nowrap">
                {
                  editableInternship.users.filter(
                    (user) => user.role === "STUDENT"
                  )[0]?.name
                }
              </CardTitle>
              {isEditMode ? (
                <Input
                  className="max-w-fit"
                  value={editableInternship.companyName}
                  onChange={(e) =>
                    setEditableInternship({
                      ...editableInternship,
                      companyName: e.target.value,
                    })
                  }
                />
              ) : (
                <CardTitle className="whitespace-nowrap text-medium font-normal leading-8">
                  {editableInternship.companyName}
                </CardTitle>
              )}
            </div>
          ) : (
            <>
              <CardTitle>{editableInternship.companyName}</CardTitle>
              <CardDescription>
                <p>
                  {t("from")} {internship.startDate.toLocaleDateString()}{" "}
                  {t("to")} {internship.endDate.toLocaleDateString()}
                </p>
              </CardDescription>
            </>
          )}
        </div>
        <div className="hidden md:flex">
          {userRole === Roles.COORDINATOR ? (
            <>
              {isEditMode ? (
                <Button
                  className="mr-3"
                  variant={"secondary"}
                  onClick={updateInternship}
                >
                  {t("save")}
                </Button>
              ) : (
                <></>
              )}
              <Button
                className="mr-3"
                variant={"secondary"}
                onClick={toggleEditMode}
              >
                {isEditMode ? t("cancel") : t("edit")}
              </Button>
            </>
          ) : (
            <></>
          )}
          <Link
            href={`/feedback-loop/${internship.id}`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <span className="whitespace-nowrap">{t("feedback_loop")}</span>
          </Link>
        </div>
      </CardHeader>
      <CardDescription>
        <div className="my-2 ml-6 md:hidden">
          {userRole === Roles.COORDINATOR ? (
            <>
              {isEditMode ? (
                <Button
                  className="mr-3"
                  variant={"secondary"}
                  onClick={updateInternship}
                >
                  {t("save")}
                </Button>
              ) : (
                <></>
              )}
              <Button
                className="mr-3"
                variant={"secondary"}
                onClick={toggleEditMode}
              >
                {isEditMode ? t("cancel") : t("edit")}
              </Button>
            </>
          ) : (
            <></>
          )}
          <Link
            href={`/feedback-loop/${internship.id}`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <span className="whitespace-nowrap">{t("feedback_loop")}</span>
          </Link>
        </div>
      </CardDescription>
      <CardContent>
        <div key={id} className="mb-6 w-full space-y-2">
          {/* ... (other details) */}
          <div className="w-full">
            <div className="w-full rounded-2xl bg-card">
              <Accordion
                type="single"
                defaultValue={userRole === Roles.STUDENT ? "item-1" : ""}
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("more_info")}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                      <InternshipUsersCard
                        internship={editableInternship}
                        userRole={userRole}
                        isEditable={isEditMode}
                        onClick={handleUserChange}
                      />
                      <Calendar
                        mode="range"
                        className="hidden rounded-md border lg:inline-block"
                        numberOfMonths={1}
                        defaultMonth={internship.startDate}
                        selected={{
                          from: internship.startDate,
                          to: internship.endDate,
                        }}
                      />
                      <Card>
                        <CardHeader className="flex flex-col">
                          <CardTitle className="flex items-center">
                            {t("location")}
                          </CardTitle>
                          {isEditMode ? (
                            <Input
                              value={editableInternship.location}
                              onChange={(e) =>
                                setEditableInternship({
                                  ...editableInternship,
                                  location: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <CardDescription className="min-w-0">
                              {editableInternship.location}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <Maps
                            lng={editableInternship.lng as number}
                            lat={editableInternship.lat as number}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
