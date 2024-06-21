import loginService from "@/lib/loginService";
import { TRole } from "@/types/role.type";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 8 * 60 * 60,
	},
	pages: {
		signIn: "/",
	},
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { usernameOrEmail, password } = credentials as {
					usernameOrEmail: string;
					password: string;
				};
				const user = await loginService.login(usernameOrEmail, password);

				if (!user) {
					return null;
				} else {
					return {
						id: user.email,
						name: user.name,
						email: user.email,
						nummer: user.nummer,
						role: user.role,
						accessToken: user.accessToken,
					};
				}
			},
		}),
	],
	callbacks: {
		session: async ({ token, session }) => {
			if (token) {
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.nummer = token.nummer as string;
				session.user.role = token.role as TRole;
				session.user.accessToken = token.accessToken as string;
			}
			return session;
		},
		// very weird that id gets converted to sub field took me hours to find :/
		async jwt({ token, user }) {
			return { ...token, ...user }; // add user information to token
		},
	},
};
export default NextAuth(authOptions);
