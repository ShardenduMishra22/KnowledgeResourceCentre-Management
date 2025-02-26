import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "./db/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth, { User } from "next-auth"
import { db } from "./db"

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
    }

    interface Session {
        user: User;
    }
}

export const { handlers, signOut, signIn, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                password: { label: "Password", type: "password" },
                fullName: { label: "Full Name", type: "text" },
                email: { label: "Email", type: "text" },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    return null
                }
                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email,credentials.email.toString()))
                    .limit(1)

                if(user.length === 0){
                    return null
                }

                const isValid = await compare(
                    credentials.password.toString(),
                    user[0].password
                )

                if(!isValid){
                    return null
                }

                return {
                    id: user[0].id.toString(),
                    email: user[0].email,
                    name: user[0].fullName,
                } as User;
            }
        })
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt ({token,user}){
            if(user){
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session ({session,token}){
            if(session.user){
                session.user.id = token.id as string
                session.user.name = token.name ?? ""
            }
            return session
        },
    }
})