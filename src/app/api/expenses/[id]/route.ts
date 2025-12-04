import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Expense from '@/models/Expense';
import AuditLog from '@/models/AuditLog';
import { z } from 'zod';
import { verifyAccessToken } from '@/lib/jwt';

const expenseSchema = z.object({
  date: z.coerce.date().optional(),
  detail: z.string().min(1, 'Detail is required').optional(),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0').optional(),
  expenseBy: z.string().min(1, 'Expense by is required').optional(),
  category: z.string().optional(),
  attachments: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const expense = await Expense.findOne({ _id: params.id, user: decoded.userId });

    if (!expense) {
      return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: expense });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch expense' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: params.id, user: decoded.userId },
      { $set: validatedFields.data },
      { new: true }
    );

    if (!updatedExpense) {
      return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
    }

    await new AuditLog({
      user: decoded.userId,
      action: 'UPDATE_EXPENSE',
      details: `Updated expense: ${updatedExpense.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Expense updated successfully', data: updatedExpense });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update expense' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: params.id, user: decoded.userId });

    if (!deletedExpense) {
      return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
    }

    await new AuditLog({
      user: decoded.userId,
      action: 'DELETE_EXPENSE',
      details: `Deleted expense: ${deletedExpense.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Expense deleted successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete expense' }, { status: 500 });
  }
}
