import ExpenseList from '@/components/ExpenseList';
import AddExpense from '@/components/AddExpense';
import { cookies } from 'next/headers';

const ExpensesPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <div className="mb-4">
        <AddExpense token={token} />
      </div>
      <ExpenseList token={token} />
    </div>
  );
};

export default ExpensesPage;
