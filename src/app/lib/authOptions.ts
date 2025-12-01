import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/app/lib/config";
import Watchlist from "@/app/lib/models/watchlist";
import { User } from "@/app/lib/models/userModel";  
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connect();
                const user = await User.findOne({ email: credentials?.email });

                if (!user) return null;

                const isMatch = await bcrypt.compare(credentials?.password || "", user.password);
                if (!isMatch) return null;

                return { id: user._id.toString(), email: user.email };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, 
    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }: any) {
            if (token) session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: "/Login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};