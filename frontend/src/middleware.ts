import { withAuth } from "next-auth/middleware";
import { Roles } from "./types/role.type";
import { Pages } from "./types/pages.type";

const isAuthorisedForPages: Record<string, string[]> = {
  [Roles.STUDENT]: [Pages.INTERNSHIPS, Pages.FEEDBACKLOOP, Pages.CREATEFORM, Pages.NINO],
  [Roles.COACH]: [Pages.INTERNSHIPS, Pages.FEEDBACKLOOP, Pages.CREATEFORM,Pages.NINO],
  [Roles.MENTOR]: [Pages.INTERNSHIPS, Pages.FEEDBACKLOOP, Pages.CREATEFORM,Pages.NINO],
  [Roles.COORDINATOR]: [
    Pages.INTERNSHIPS,
    Pages.BEGELEIDERS,
    Pages.MENTORS,
    Pages.STUDENTS,
    Pages.FEEDBACKLOOP,
    Pages.FORMS,
    Pages.CREATEFORM,
    Pages.NINO,
    Pages.OPO,
    Pages.CREATEOPOFORM,
    Pages.REMOVEOPO,
    Pages.EDITOPO,
    Pages.REMOVEFORM
  ],
};
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) { },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) {
          return req.nextUrl.pathname === Pages.LOGIN;
        } else {
          return (
            req.nextUrl.pathname === Pages.LOGIN ||
            isAuthorisedForPages[token?.role as string]?.some(
              (item) => req.nextUrl.pathname.startsWith(item),
            )
          );
        }
      },
    },
  },
);

export const config = { matcher: Object.values(Pages) };
