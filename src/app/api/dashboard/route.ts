import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Expense from '@/models/Expense';
import Income from '@/models/Income';
import { verifyAccessToken } from '@/lib/jwt';
import moment from 'moment';

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
  const period = searchParams.get('period') || 'monthly'; // daily, weekly, monthly, yearly

  const getPeriod = (period: string) => {
    switch (period) {
      case 'daily':
        return {
          start: moment().startOf('day').toDate(),
          end: moment().endOf('day').toDate(),
        };
      case 'weekly':
        return {
          start: moment().startOf('week').toDate(),
          end: moment().endOf('week').toDate(),
        };
      case 'monthly':
        return {
          start: moment().startOf('month').toDate(),
          end: moment().endOf('month').toDate(),
        };
      case 'yearly':
        return {
          start: moment().startOf('year').toDate(),
          end: moment().endOf('year').toDate(),
        };
      default:
        return {
          start: moment().startOf('month').toDate(),
          end: moment().endOf('month').toDate(),
        };
    }
  };

  const { start, end } = getPeriod(period);

  try {
    const totalIncome = await Income.aggregate([
      { $match: { user: decoded.userId, date: { $gte: start, $lte: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: { user: decoded.userId, date: { $gte: start, $lte: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const income = totalIncome[0]?.total || 0;
    const expenses = totalExpenses[0]?.total || 0;
    const netProfit = income - expenses;

    // Chart data
    const incomeByDay = await Income.aggregate([
      { $match: { user: decoded.userId, date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const expensesByDay = await Expense.aggregate([
      { $match: { user: decoded.userId, date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalIncome: income,
        totalExpenses: expenses,
        netProfit,
        charts: {
          income: incomeByDay,
          expenses: expensesByDay,
        },
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
