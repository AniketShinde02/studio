
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function GET(req: Request) {
  await dbConnect();

  try {
    // Fetch all posts, sorted by creation date, since auth is disabled.
    const posts = await Post.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
