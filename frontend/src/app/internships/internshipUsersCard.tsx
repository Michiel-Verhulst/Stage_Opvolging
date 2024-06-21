"use client";

import { useTranslation } from "@/components/language-toggle/useTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import begeleiderService from "@/lib/begeleiderService";
import mentorService from "@/lib/mentorService";
import studentService from "@/lib/studentService";
import { TInternship } from "@/types/internship.type";
import { Roles } from "@/types/role.type";
import { TUser } from "@/types/user.type";
import { User } from "@nextui-org/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { Suspense, useEffect, useState } from "react";

export default function InternshipUsersCard({
  internship,
  userRole,
  isEditable,
  onClick,
}: {
  internship: TInternship;
  userRole: string;
  isEditable: boolean;
  onClick: (user: TUser) => void;
}) {
  const [mentorList, setMentorList] = useState<any>([]);
  const [studentList, setStudentList] = useState<any>([]);
  const [coachList, setCoachList] = useState<any>([]);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState<boolean>();
  const [mentorDropdownOpen, setMentorDropdownOpen] = useState<boolean>();
  const [coachDropdownOpen, setCoachDropdownOpen] = useState<boolean>();

  const [selectedStudent, setSelectedStudent] = useState<TUser>();
  const [selectedCoach, setSelectedCoach] = useState<TUser>();
  const [selectedMentor, setSelectedMentor] = useState<TUser>();

  useEffect(() => {
    (async () => {
      const mentorData = await mentorService.getMentors();
      const studentData = await studentService.getStudents();
      const coachData = await begeleiderService.getBegeleiders();

      setMentorList(mentorData);
      setStudentList(studentData);
      setCoachList(coachData);
    })();
  }, []);

  const handleUserChange = (user: TUser) => {
    onClick(user);
  };
  const t = useTranslation();
  return (
    <Card className="w-full">
      {isEditable ? (
        <>
          <CardHeader className="justify-start lg:justify-center">
            <CardTitle>
              {userRole !== Roles.STUDENT ? t("more_info") : t("personen")}
            </CardTitle>
          </CardHeader>
          <Popover open={coachDropdownOpen} onOpenChange={setCoachDropdownOpen}>
            <PopoverTrigger asChild>
              <div className="mb-2 flex flex-row items-center px-6">
                <Label className="mr-2">Coach: </Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-label="Select student"
                  aria-expanded={coachDropdownOpen}
                  className="flex-1 justify-between md:max-w-fit lg:max-w-[300px]"
                >
                  {selectedCoach ? selectedCoach.name : t("select_coach")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search coaches..." />
                <CommandEmpty>No presets found.</CommandEmpty>
                <CommandGroup heading="Examples">
                  {coachList.map((coach: TUser) => (
                    <CommandItem
                      key={coach.nummer}
                      onSelect={() => {
                        handleUserChange(coach);
                        setCoachDropdownOpen(false);
                        setSelectedCoach(coach);
                      }}
                    >
                      {coach.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover
            open={studentDropdownOpen}
            onOpenChange={setStudentDropdownOpen}
          >
            <PopoverTrigger asChild>
              <div className="mb-2 flex flex-row items-center px-6">
                <Label className="mr-2">Student: </Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-label="Select student"
                  aria-expanded={studentDropdownOpen}
                  className="flex-1 justify-between md:max-w-fit lg:max-w-[300px]"
                >
                  {selectedStudent ? selectedStudent.name : t("select_student")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search students..." />
                <CommandEmpty>No presets found.</CommandEmpty>
                <CommandGroup heading="Examples">
                  {studentList.map((student: TUser) => (
                    <CommandItem
                      key={student.nummer}
                      onSelect={() => {
                        handleUserChange(student);
                        setSelectedStudent(student);
                        setStudentDropdownOpen(false);
                      }}
                    >
                      {student.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover
            open={mentorDropdownOpen}
            onOpenChange={setMentorDropdownOpen}
          >
            <PopoverTrigger asChild>
              <div className="mb-2 flex flex-row items-center px-6">
                <Label className="mr-2">Mentor: </Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-label="Select student"
                  aria-expanded={mentorDropdownOpen}
                  className="flex-1 justify-between md:max-w-fit lg:max-w-[300px]"
                >
                  {selectedMentor ? selectedMentor.name : t("select_mentor")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search mentors..." />
                <CommandEmpty>No presets found.</CommandEmpty>
                <CommandGroup heading="Examples">
                  {mentorList.map((mentor: TUser) => (
                    <CommandItem
                      key={mentor.nummer}
                      onSelect={() => {
                        handleUserChange(mentor);
                        setSelectedMentor(mentor);
                        setMentorDropdownOpen(false);
                      }}
                    >
                      {mentor.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          <CardHeader className="justify-start lg:justify-center">
            <CardTitle>
              {userRole !== Roles.STUDENT ? t("more_info") : t("personen")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-around gap-2">
              <Suspense fallback={<p>Loading...</p>}>
                <User
                  name={
                    internship.users.filter((user) => user.role === "COACH")[0]
                      ?.name
                  }
                  description="Coach"
                  avatarProps={{
                    src: "https://w7.pngwing.com/pngs/770/156/png-transparent-computer-icons-user-profile-avatar-thumbnail.png",
                  }}
                />
              </Suspense>
              <Suspense fallback={<p>Loading...</p>}>
                <User
                  name={
                    internship.users.filter(
                      (user) => user.role === "STUDENT"
                    )[0]?.name
                  }
                  description="Student"
                  avatarProps={{
                    src: "https://w7.pngwing.com/pngs/770/156/png-transparent-computer-icons-user-profile-avatar-thumbnail.png",
                  }}
                />
              </Suspense>
              <Suspense fallback={<p>Loading...</p>}>
                <User
                  name={
                    internship.users.filter((user) => user.role === "MENTOR")[0]
                      ?.name
                  }
                  description="Mentor"
                  avatarProps={{
                    src: "https://w7.pngwing.com/pngs/770/156/png-transparent-computer-icons-user-profile-avatar-thumbnail.png",
                  }}
                />
              </Suspense>
            </div>
            {userRole !== Roles.STUDENT && (
              <>
                <div className="text-md mt-4 p-2 font-bold">
                  <p>{internship.companyName} - </p>
                  <p>
                    {t("from")} {format(internship.startDate, "dd/MM/yyyy")}{" "}
                    {t("to")} {format(internship.endDate, "dd/MM/yyyy")}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
