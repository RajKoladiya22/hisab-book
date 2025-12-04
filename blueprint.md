# Project Blueprint

## Overview

This is a personal finance tracker application designed to help users manage their income and expenses. The application provides a modern, intuitive, and visually appealing interface to track financial activity, view reports, and gain insights into spending habits.

## Implemented Features

### Navigation

- **AppShell**: A responsive application shell that adapts to different screen sizes, providing a consistent layout across the application.
- **Sidebar**: A desktop-first sidebar with icon-based navigation for quick access to the main sections of the application.
- **BottomNavBar**: A mobile-first bottom navigation bar for easy access to the most important sections of the application on smaller devices.

### Pages

- **Dashboard**: A comprehensive overview of the user's finances, including a summary of total income, total expenses, and net balance, a bar chart to visualize income vs. expenses, and a list of recent transactions.
- **Incomes**: A page to display a list of all income transactions.
- **Expenses**: A page to display a list of all expense transactions.

### Components

- **IncomeList**: A component to display a list of income transactions in a table.
- **ExpenseList**: A component to display a list of expense transactions in a table.

## Design and Styling

- **Modern Aesthetic**: The application features a modern design with a dark theme, a visually balanced layout, and polished styles.
- **Iconography**: The application uses the `lucide-react` icon library to provide clear visual cues for navigation and actions.
- **Charts**: The application uses the `recharts` library to create beautiful and informative charts.

## Next Steps

- **Replace Hardcoded Data**: I will replace the hardcoded placeholder data in the `Dashboard`, `IncomeList`, and `ExpenseList` components with real data from a database.
- **Implement Interactivity**: I will make the "Add Income" and "Add Expense" buttons functional by implementing forms and the logic to add new transactions.
- **Integrate Authentication**: I will integrate a secure authentication system to ensure that users can only see their own financial data.
- **Refine Styling**: I will refine the styling to ensure a polished and professional look and feel.
