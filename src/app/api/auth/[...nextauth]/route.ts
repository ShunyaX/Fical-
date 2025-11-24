
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/app/lib/config";
import { User } from '@/app/lib/models/userModel';
import bcrypt from 'bcryptjs';

export const handler = NextAuth({
    providers:[
    CredentialsProvider({
        name: "Credentials",
        credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connect();
            const user = await User.findOne({email: credentials?.email});

            if(!user) return null;

            const isMatch = await bcrypt.compare(credentials?.password || "", user.password);
                if (!isMatch) return null;

            return { id: user._id.toString(), email: user.email };

        },
    }),
    ],
    session:{
        strategy: "jwt",
        maxAge: 60 * 60, // 1 day
    },
    jwt: {
        maxAge: 60 * 60,
    },

    callbacks:{
        async jwt({token, user}){
            if (user) token.id = user.id;
            return token;},

        async session({session, token}){
            if (token) session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: "/Login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});



export { handler as GET, handler as POST };
