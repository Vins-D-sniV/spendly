import BudgetForm
  from '../components/BudgetForm';

function Budgets({
  budgets,
  onUpdateBudgets
}) {
  return (
    <div>
      <h1>Objectifs</h1>

      <BudgetForm
        budgets={budgets}
        onUpdateBudgets={
          onUpdateBudgets
        }
      />
    </div>
  );
}

export default Budgets;