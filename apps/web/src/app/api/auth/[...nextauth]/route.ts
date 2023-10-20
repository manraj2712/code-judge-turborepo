import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@manraj2712/database";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  theme: {
    colorScheme: "dark",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (user.password !== credentials.password) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (account?.provider === "google") {
        try {
          await prisma.user.upsert({
            where: {
              email: user.email!,
            },
            update: {},
            create: {
              email: user.email!,
              name: user.name!,
              password: Math.random().toString(36).slice(-8),
            },
          });
        } catch (e) {
          console.log(e);
          return false;
        }
      }
      return true;
    },
    // session: ({ session, token }) => {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //     },
    //   };
    // },
  },
  secret: process.env.SECRET!,
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // useSecureCookies: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };
