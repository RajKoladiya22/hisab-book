'use server'

export const getReport = async (token: string, reportType: string, startDate: string, endDate: string) => {
  let url = `/api/reports?type=${reportType}`;
  if (startDate) {
    url += `&startDate=${startDate}`;
  }
  if (endDate) {
    url += `&endDate=${endDate}`;
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
