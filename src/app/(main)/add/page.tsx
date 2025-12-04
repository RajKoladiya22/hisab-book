'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import CustomDatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { Toggle } from '@/components/Toggle';

const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  title: z.string().min(1, 'Title is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const AddTransactionPage = () => {
  const [transactionType, setTransactionType] = useState('income');
  const { control, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'income',
      date: new Date(),
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log(data);
    toast.success('Transaction added successfully!');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Toggle
          label="Transaction Type"
          options={[{ label: 'Income', value: 'income' }, { label: 'Expense', value: 'expense' }]}
          value={transactionType}
          onChange={setTransactionType}
        />
        
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="Title"
              placeholder="e.g., Salary, Groceries"
              {...field}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              {...field}
              error={errors.amount?.message}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              label="Date"
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit" className="w-full">Add Transaction</Button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
