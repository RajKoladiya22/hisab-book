'use client';

import { clsx } from 'clsx';

interface ToggleProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const Toggle = ({ label, options, value, onChange }: ToggleProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex rounded-md bg-gray-700 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={clsx(
              'w-full rounded-md py-2 text-sm font-medium transition-colors',
              value === option.value
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-600'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
