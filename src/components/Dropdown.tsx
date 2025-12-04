import { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

const Dropdown = ({ label, options, ...props }: DropdownProps) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <select
        {...props}
        className={clsx(
          'mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
          props.className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
