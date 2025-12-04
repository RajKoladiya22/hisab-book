import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Income from '@/models/Income';
import AuditLog from '@/models/AuditLog';
import { z } from 'zod';
import { verifyAccessToken } from '@/lib/jwt';

const incomeSchema = z.object({
  date: z.coerce.date().optional(),
  detail: z.string().min(1, 'Detail is required').optional(),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0').optional(),
  receivedBy: z.string().min(1, 'Received by is required').optional(),
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
    const income = await Income.findOne({ _id: params.id, user: decoded.userId });

    if (!income) {
      return NextResponse.json({ success: false, message: 'Income not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: income });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch income' }, { status: 500 });
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
  const validatedFields = incomeSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ success: false, message: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: params.id, user: decoded.userId },
      { $set: validatedFields.data },
      { new: true }
    );

    if (!updatedIncome) {
      return NextResponse.json({ success: false, message: 'Income not found' }, { status: 404 });
    }

    await new AuditLog({
      user: decoded.userId,
      action: 'UPDATE_INCOME',
      details: `Updated income: ${updatedIncome.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Income updated successfully', data: updatedIncome });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update income' }, { status: 500 });
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
    const deletedIncome = await Income.findOneAndDelete({ _id: params.id, user: decoded.userId });

    if (!deletedIncome) {
      return NextResponse.json({ success: false, message: 'Income not found' }, { status: 404 });
    }

    await new AuditLog({
      user: decoded.userId,
      action: 'DELETE_INCOME',
      details: `Deleted income: ${deletedIncome.detail}`,
    }).save();

    return NextResponse.json({ success: true, message: 'Income deleted successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete income' }, { status: 500 });
  }
}
