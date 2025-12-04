import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import RefreshToken from '@/models/RefreshToken';
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();

  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: 'Refresh token not found' }, { status: 401 });
  }

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
      return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
    }

    const accessToken = generateAccessToken(user._id);

    return NextResponse.json({ success: true, data: { accessToken } });
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
