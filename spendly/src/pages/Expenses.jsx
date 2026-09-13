import ExpenseForm
  from '../components/ExpenseForm';

import ExpenseList
  from '../components/ExpenseList';

function Expenses({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onUpdateExpense
}) {
  return (
    <div>
      <h1>Dépenses</h1>

      <ExpenseForm
        onAddExpense={
          onAddExpense
        }
      />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={
          onDeleteExpense
        }
        onUpdateExpense={
          onUpdateExpense
        }
      />
    </div>
  );
}

export default Expenses;