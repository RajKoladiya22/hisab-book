'use client'

import { useEffect, useState } from 'react';
import { getIncome, updateIncome } from '@/app/actions/incomeActions';
import { z } from 'zod';

const incomeSchema = z.object({
  date: z.coerce.date(),
  detail: z.string().min(1, 'Detail is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  receivedBy: z.string().min(1, 'Received by is required'),
  category: z.string().optional(),
  attachments: z.string().optional(),
});

interface FormData {
  date: string;
  detail: string;
  amount: number;
  receivedBy: string;
  category?: string;
  attachments?: string;
}

const EditIncome = ({ token, id, onIncomeUpdated }: { token: string; id: string; onIncomeUpdated: () => void }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  useEffect(() => {
    getIncome(token, id).then(data => {
      if (data.success) {
        setFormData({ ...data.data, date: new Date(data.data.date).toISOString().split('T')[0] });
      }
    });
  }, [token, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = incomeSchema.safeParse(formData);
    if (result.success) {
      const response = await updateIncome(token, id, result.data);
      if (response.success) {
        onIncomeUpdated();
      }
    } else {
      setErrors(result.error.formErrors.fieldErrors);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>
        <div>
          <label>Detail</label>
          <input type="text" name="detail" value={formData.detail} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.detail && <p className="text-red-500">{errors.detail}</p>}
        </div>
        <div>
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>
        <div>
          <label>Received By</label>
          <input type="text" name="receivedBy" value={formData.receivedBy} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.receivedBy && <p className="text-red-500">{errors.receivedBy}</p>}
        </div>
        <div>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Attachments</label>
          <input type="text" name="attachments" value={formData.attachments} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Update Income</button>
    </form>
  );
};

export default EditIncome;
