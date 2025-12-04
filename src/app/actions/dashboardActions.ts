'use client'

export const getDashboardData = async (token: string, period = 'monthly') => {
  const response = await fetch(`/api/dashboard?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
