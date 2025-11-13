import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/models/userModel";
import connect from "@/app/lib/config";

export async function POST(req: Request) {
    try{
        await connect();
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({error: "user not found"},{status:401});
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if(!ismatch){
            return NextResponse.json({error:"invalid password"},{status:401});
        }

        return NextResponse.json({message: "login successful"},{status:200});

    }catch(error){
        return NextResponse.json({error: "internal server error"},{status:500});
    }
}