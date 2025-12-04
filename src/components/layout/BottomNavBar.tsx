import Link from "next/link";
import { Home, BarChart, FileText, Settings } from "lucide-react";

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-gray-800 flex items-center justify-around z-50">
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
      <Link href="/dashboard">
        <div className="p-4 rounded-full bg-primary text-background cursor-pointer hover:bg-primary/90 transition-colors shadow-neon-glow">
          <Home className="w-7 h-7" />
        </div>
      </Link>
      <Link href="/expenses">
        <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
          {/* Replace with a suitable expense icon */}
          <FileText className-="w-6 h-6" />
        </div>
      </Link>
      <Link href="/settings">
        <div className="p-3 rounded-lg text-text/70 hover:bg-background-light hover:text-primary transition-colors cursor-pointer">
          <Settings className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
};

export default BottomNavBar;
