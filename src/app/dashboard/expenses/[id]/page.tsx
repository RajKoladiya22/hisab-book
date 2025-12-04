'use client'

import EditExpense from '@/components/EditExpense';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditExpensePage = ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const router = useRouter();

  const handleExpenseUpdated = () => {
    router.push('/dashboard/expenses');
  };

  return (
    <div>
      <Link href="/dashboard/expenses" className="text-blue-500 mb-4 inline-block">Back to Expenses</Link>
      <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>
      <EditExpense token={token} id={params.id} onExpenseUpdated={handleExpenseUpdated} />
    </div>
  );
};

export default EditExpensePage;
