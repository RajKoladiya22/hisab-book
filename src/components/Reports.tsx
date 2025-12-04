'use client'

import { useState } from 'react';
import { getReport } from '@/app/actions/reportActions';
import { unparse } from 'papaparse';

const Reports = ({ token }: { token: string }) => {
  const [formData, setFormData] = useState({
    reportType: 'income',
    startDate: '',
    endDate: '',
    format: 'json',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async () => {
    const report = await getReport(token, formData.reportType, formData.startDate, formData.endDate);
    if (formData.format === 'csv') {
      const csv = unparse(report.data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${formData.reportType}-report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Handle JSON
      const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${formData.reportType}-report.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Report Type</label>
          <select name="reportType" value={formData.reportType} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
        <div>
          <label>Format</label>
          <select name="format" value={formData.format} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </div>
      <button onClick={handleGenerateReport} className="mt-4 p-2 bg-blue-500 text-white rounded">Generate Report</button>
    </div>
  );
};

export default Reports;
