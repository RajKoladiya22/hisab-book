import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import RefreshToken from '@/models/RefreshToken';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await new RefreshToken({ token: refreshToken, user: user._id }).save();

    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful', 
      data: { accessToken } 
    });
    
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
