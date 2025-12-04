import AppShell from "@/components/AppShell";
import IncomeList from "@/components/IncomeList";

const IncomesPage = () => {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold mb-6 text-text animate-fadeIn">Incomes</h1>
      <IncomeList />
    </AppShell>
  );
};

export default IncomesPage;
