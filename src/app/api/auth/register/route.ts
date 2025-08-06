import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        return NextResponse.json(
            { success: false, message: 'User already exists' },
            { status: 400 }
        );
    }

    const user = await User.create({
      email,
      password,
    });
    
    // In a real app, you'd sign a token here and send it back
    return NextResponse.json({ success: true, data: { email: user.email } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
