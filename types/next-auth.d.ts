import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      email?: string | null;
      // Add other user properties here if needed
    } & DefaultSession["user"];
  }
}
