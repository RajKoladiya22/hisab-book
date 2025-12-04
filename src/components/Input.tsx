import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <input
        {...props}
        className={clsx(
          'mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
          props.className
        )}
      />
    </div>
  );
};

export default Input;
