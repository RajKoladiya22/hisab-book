import IncomeList from '@/components/IncomeList';
import AddIncome from '@/components/AddIncome';
import { cookies } from 'next/headers';

const IncomePage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Income</h1>
      <div className="mb-4">
        <AddIncome token={token} />
      </div>
      <IncomeList token={token} />
    </div>
  );
};

export default IncomePage;
