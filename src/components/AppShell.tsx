import React from "react";
import Sidebar from "./layout/Sidebar";
import BottomNavBar from "./layout/BottomNavBar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row bg-background-light rounded-2xl shadow-soft-glow overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="block md:hidden">
        <BottomNavBar />
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AppShell;
