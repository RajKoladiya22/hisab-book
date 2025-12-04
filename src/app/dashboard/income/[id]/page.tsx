'use client'

import EditIncome from '@/components/EditIncome';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditIncomePage = ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const router = useRouter();

  const handleIncomeUpdated = () => {
    router.push('/dashboard/income');
  };

  return (
    <div>
      <Link href="/dashboard/income" className="text-blue-500 mb-4 inline-block">Back to Income</Link>
      <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
      <EditIncome token={token} id={params.id} onIncomeUpdated={handleIncomeUpdated} />
    </div>
  );
};

export default EditIncomePage;
