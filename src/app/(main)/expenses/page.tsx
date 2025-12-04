import AppShell from "@/components/AppShell";
import ExpenseList from "@/components/ExpenseList";

const ExpensesPage = () => {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold mb-6 text-text animate-fadeIn">Expenses</h1>
      <ExpenseList />
    </AppShell>
  );
};

export default ExpensesPage;
