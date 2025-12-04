import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Expense from '@/models/Expense';
import Income from '@/models/Income';
import { verifyAccessToken } from '@/lib/jwt';
import moment from 'moment';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';

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
  const reportType = searchParams.get('type') || 'monthly'; // monthly, yearly, custom
  const format = searchParams.get('format') || 'json'; // json, csv, xlsx
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const getPeriod = (reportType: string) => {
    switch (reportType) {
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
      case 'custom':
        return {
          start: startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('month').toDate(),
          end: endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('month').toDate(),
        };
      default:
        return {
          start: moment().startOf('month').toDate(),
          end: moment().endOf('month').toDate(),
        };
    }
  };

  const { start, end } = getPeriod(reportType);

  try {
    const incomes = await Income.find({ user: decoded.userId, date: { $gte: start, $lte: end } }).lean();
    const expenses = await Expense.find({ user: decoded.userId, date: { $gte: start, $lte: end } }).lean();

    if (format === 'csv') {
      const csv = Papa.unparse({ fields: ['date', 'detail', 'amount', 'type'], data: [...incomes.map(i => ({ ...i, type: 'income' })), ...expenses.map(e => ({ ...e, type: 'expense' }))] });
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="report.csv"`,
        },
      });
    } else if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');
      worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Detail', key: 'detail', width: 30 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Type', key: 'type', width: 10 },
      ];

      incomes.forEach(i => worksheet.addRow({ ...i, type: 'income' }));
      expenses.forEach(e => worksheet.addRow({ ...e, type: 'expense' }));

      const buffer = await workbook.xlsx.writeBuffer();
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="report.xlsx"`,
        },
      });
    }

    return NextResponse.json({ success: true, data: { incomes, expenses } });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to generate report' }, { status: 500 });
  }
}
