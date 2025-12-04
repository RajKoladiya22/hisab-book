import Reports from '@/components/Reports';
import { cookies } from 'next/headers';

const ReportsPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <Reports token={token} />
    </div>
  );
};

export default ReportsPage;
