import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { User } from '@/app/lib/models/userModel';
import connect from '@/app/lib/config';

export async function POST(req: Request) {
  try{
  await connect();
  const body = await req.json();
  const { email, password } = body;
  

  if(!email || !password){
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const existingUser = await User.findOne({email});
  if(existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();
 
  return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });

} catch (error) {
  console.error("signup", error);
  return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
}

}