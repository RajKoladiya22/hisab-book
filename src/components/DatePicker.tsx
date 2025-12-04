'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { clsx } from 'clsx';

interface DatePickerProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const CustomDatePicker = ({ label, selected, onChange, className }: DatePickerProps) => {
  return (
    <div className={clsx('w-full', className)}>
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        calendarClassName="bg-gray-800 border-gray-700"
        dayClassName={() =>
          clsx(
            'text-white hover:bg-primary/50',
          )
        }
        monthClassName={() => 'text-white'}
        headerClassName="bg-gray-800 text-white"
        popperPlacement="bottom-start"
      />
    </div>
  );
};

export default CustomDatePicker;
