import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import RefreshToken from '@/models/RefreshToken';

export async function POST(req: NextRequest) {
  await dbConnect();

  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  const response = NextResponse.json({ success: true, message: 'Logout successful' });
  response.cookies.delete('refreshToken');

  return response;
}
