'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
];

const recentTransactions = [
  { type: 'income', description: 'Salary', amount: 5000, date: '2024-07-01' },
  { type: 'expense', description: 'Groceries', amount: 150, date: '2024-07-12' },
  { type: 'expense', description: 'Rent', amount: 1200, date: '2024-07-01' },
  { type: 'income', description: 'Freelance', amount: 750, date: '2024-07-10' },
  { type: 'expense', description: 'Dinner', amount: 80, date: '2024-07-10' },
];

const Dashboard = () => {
  const totalIncome = data.reduce((acc, item) => acc + item.income, 0);
  const totalExpense = data.reduce((acc, item) => acc + item.expense, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-8 animate-scale-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background-light p-6 rounded-2xl shadow-soft-glow flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <div className="p-4 bg-green-500/10 rounded-full">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-text/70">Total Income</p>
            <p className="text-3xl font-bold text-white">${totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-background-light p-6 rounded-2xl shadow-soft-glow flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <div className="p-4 bg-red-500/10 rounded-full">
            <TrendingDown className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <p className="text-text/70">Total Expense</p>
            <p className="text-3xl font-bold text-white">${totalExpense.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-background-light p-6 rounded-2xl shadow-soft-glow flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <div className="p-4 bg-blue-500/10 rounded-full">
            <IndianRupee className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-text/70">Net Balance</p>
            <p className="text-3xl font-bold text-white">${netBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-background-light p-6 rounded-2xl shadow-soft-glow">
        <h3 className="text-2xl font-bold text-primary mb-4">Income vs. Expense</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
              <Legend wrapperStyle={{ color: '#fff' }}/>
              <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#F43F5E" name="Expense" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-background-light p-6 rounded-2xl shadow-soft-glow">
        <h3 className="text-2xl font-bold text-primary mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((t, i) => (
            <div key={i} className="flex justify-between items-center bg-background p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                   {t.type === 'income' ? <TrendingUp className="w-5 h-5 text-green-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.description}</p>
                  <p className="text-sm text-text/60">{t.date}</p>
                </div>
              </div>
              <p className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
