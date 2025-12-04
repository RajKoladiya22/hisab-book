import React from 'react';

const IncomeList = () => {
  // Placeholder data - we'll fetch real data later
  const incomes = [
    { id: 1, description: 'Freelance Project', amount: 1200, date: '2024-07-15' },
    { id: 2, description: 'Salary', amount: 3500, date: '2024-07-01' },
    { id: 3, description: 'Stock Dividend', amount: 250, date: '2024-06-20' },
  ];

  return (
    <div className="bg-background-light p-6 rounded-lg shadow-soft-glow animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Income Records</h2>
        <button className="bg-primary text-background font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-neon-glow animate-subtle-glow">
          Add Income
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4 text-text/80">Description</th>
              <th className="p-4 text-text/80">Amount</th>
              <th className="p-4 text-text/80">Date</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id} className="border-b border-gray-800 hover:bg-background">
                <td className="p-4">{income.description}</td>
                <td className="p-4 text-success">${income.amount.toFixed(2)}</td>
                <td className="p-4">{income.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
