
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

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
            { status: 409 } // Use 409 Conflict for existing user
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    
    return NextResponse.json({ success: true, data: { email: user.email } }, { status: 201 });
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Registration Error:', error);
    // Provide a more generic error message to the client
    return NextResponse.json({ success: false, message: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
