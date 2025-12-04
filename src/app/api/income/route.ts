import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Income from '@/models/Income';
import AuditLog from '@/models/AuditLog';
import { z } from 'zod';
import { verifyAccessToken } from '@/lib/jwt';

const incomeSchema = z.object({
  date: z.coerce.date(),
  detail: z.string().min(1, 'Detail is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  receivedBy: z.string().min(1, 'Received by is required'),
  category: z.string().optional(),
  attachments: z.string().optional(),
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const validatedFields = incomeSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ success: false, message: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const newIncome = new Income({
      ...validatedFields.data,
      user: decoded.userId,
    });

    await newIncome.save();

    await new AuditLog({
      user: decoded.userId,
      action: 'CREATE_INCOME',
      details: `Created income: ${newIncome.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Income added successfully', data: newIncome }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to add income' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const searchQuery = searchParams.get('search') || '';

  const query = {
    user: decoded.userId,
    ...(searchQuery && { detail: { $regex: searchQuery, $options: 'i' } }),
  };

  try {
    const incomes = await Income.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Income.countDocuments(query);

    return NextResponse.json({ 
      success: true, 
      data: incomes, 
      pagination: { 
        total, 
        page, 
        limit 
      } 
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch incomes' }, { status: 500 });
  }
}
