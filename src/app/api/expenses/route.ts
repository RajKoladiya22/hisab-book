import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Expense from '@/models/Expense';
import AuditLog from '@/models/AuditLog';
import { z } from 'zod';
import { verifyAccessToken } from '@/lib/jwt';

const expenseSchema = z.object({
  date: z.coerce.date(),
  detail: z.string().min(1, 'Detail is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  expenseBy: z.string().min(1, 'Expense by is required'),
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
  const validatedFields = expenseSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ success: false, message: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const newExpense = new Expense({
      ...validatedFields.data,
      user: decoded.userId,
    });

    await newExpense.save();

    await new AuditLog({
      user: decoded.userId,
      action: 'CREATE_EXPENSE',
      details: `Created expense: ${newExpense.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Expense added successfully', data: newExpense }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to add expense' }, { status: 500 });
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
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Expense.countDocuments(query);

    return NextResponse.json({ 
      success: true, 
      data: expenses, 
      pagination: { 
        total, 
        page, 
        limit 
      } 
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch expenses' }, { status: 500 });
  }
}
