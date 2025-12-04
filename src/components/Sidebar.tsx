'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  LogoutIcon,
} from '@heroicons/react/24/outline';
import { logout } from '@/app/actions/logoutAction';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { href: '/dashboard/expenses', label: 'Expenses', icon: CreditCardIcon },
    { href: '/dashboard/income', label: 'Income', icon: DocumentTextIcon },
    { href: '/dashboard/reports', label: 'Reports', icon: ChartBarIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-center">Expense Tracker</h2>
      </div>
      <nav className="flex-grow">
        <ul>
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={`flex items-center p-4 ${pathname === href ? 'bg-gray-200' : ''}`}>
                <Icon className="h-6 w-6 mr-3" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <form action={logout}>
          <button type="submit" className="flex items-center w-full p-4 text-left text-red-500 hover:bg-red-100 rounded">
            <LogoutIcon className="h-6 w-6 mr-3" />
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
