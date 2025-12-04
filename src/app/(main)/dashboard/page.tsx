import AppShell from "@/components/AppShell";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return (
    <AppShell>
      <h1 className="text-3xl font-bold mb-6 text-text animate-fadeIn">Dashboard</h1>
      <Dashboard token={token || ''}/>
    </AppShell>
  );
};

export default DashboardPage;
