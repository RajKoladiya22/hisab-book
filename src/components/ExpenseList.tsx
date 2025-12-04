import React from 'react';

const ExpenseList = () => {
  // Placeholder data - we'll fetch real data later
  const expenses = [
    { id: 1, description: 'Groceries', amount: 150, date: '2024-07-12' },
    { id: 2, description: 'Rent', amount: 1200, date: '2024-07-01' },
    { id: 3, description: 'Dinner with friends', amount: 80, date: '2024-07-10' },
  ];

  return (
    <div className="bg-background-light p-6 rounded-lg shadow-soft-glow animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-danger">Expense Records</h2>
        <button className="bg-danger text-white font-bold py-2 px-4 rounded-lg hover:bg-danger/90 transition-colors shadow-neon-glow animate-subtle-glow">
          Add Expense
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
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-800 hover:bg-background">
                <td className="p-4">{expense.description}</td>
                <td className="p-4 text-danger">${expense.amount.toFixed(2)}</td>
                <td className="p-4">{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
