'use client'

interface ExpenseData {
  date: Date | string;
  detail: string;
  amount: number;
  expenseBy: string;
  category?: string;
  attachments?: string;
}

export const getExpenses = async (token: string, page = 1, limit = 10, search = '') => {
  const response = await fetch(`/api/expenses?page=${page}&limit=${limit}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getExpense = async (token: string, id: string) => {
  const response = await fetch(`/api/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addExpense = async (token: string, data: ExpenseData) => {
  const response = await fetch('/api/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateExpense = async (token: string, id: string, data: Partial<ExpenseData>) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteExpense = async (token: string, id: string) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
