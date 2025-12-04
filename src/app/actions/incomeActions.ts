'use client'

interface IncomeData {
  date: Date | string;
  detail: string;
  amount: number;
  receivedBy: string;
  category?: string;
  attachments?: string;
}

export const getIncomes = async (token: string, page = 1, limit = 10, search = '') => {
  const response = await fetch(`/api/income?page=${page}&limit=${limit}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getIncome = async (token: string, id: string) => {
  const response = await fetch(`/api/income/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addIncome = async (token: string, data: IncomeData) => {
  const response = await fetch('/api/income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateIncome = async (token: string, id: string, data: Partial<IncomeData>) => {
  const response = await fetch(`/api/income/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteIncome = async (token: string, id: string) => {
  const response = await fetch(`/api/income/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
