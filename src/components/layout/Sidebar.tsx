import Link from "next/link";
import { Home, BarChart, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full w-20 flex flex-col items-center py-6 bg-background border-r border-gray-800">
      <div className="mb-10">
        <Link href="/dashboard">
          <div className="p-3 rounded-full bg-primary text-background cursor-pointer hover:bg-primary/90 transition-colors">
            <Home className="w-6 h-6" />
          </div>
        </Link>
      </div>
      <nav className="flex flex-col gap-8">
        <Link href="/dashboard">
          <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
            <BarChart className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/incomes">
          <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
            {/* Replace with a suitable income icon */}
            <FileText className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/expenses">
          <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
            {/* Replace with a suitable expense icon */}
            <FileText className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/reports">
          <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
            <FileText className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/settings">
          <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
            <Settings className="w-6 h-6" />
          </div>
        </Link>
      </nav>
      <div className="mt-auto">
        <Link href="/api/auth/logout">
          <div className="p-3 rounded-lg text-text/70 hover:bg-danger/80 hover:text-white transition-colors cursor-pointer">
            <LogOut className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
