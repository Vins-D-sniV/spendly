import BudgetCard
  from '../components/BudgetCard';

import {
  isToday,
  isCurrentWeek,
  isCurrentMonth,
  isCurrentYear
} from '../utils/dates';

function Dashboard({
  expenses,
  budgets
}) {
  /*
    Petite fonction utilitaire.

    Elle reçoit une liste de dépenses
    et additionne leurs montants.
  */
  function calculateTotal(expenseList) {
    return expenseList.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );
  }

  /*
    Dépenses aujourd'hui
  */
  const dailyExpenses =
    expenses.filter(
      (expense) =>
        isToday(expense.date)
    );

  /*
    Dépenses cette semaine
  */
  const weeklyExpenses =
    expenses.filter(
      (expense) =>
        isCurrentWeek(expense.date)
    );

  /*
    Dépenses ce mois
  */
  const monthlyExpenses =
    expenses.filter(
      (expense) =>
        isCurrentMonth(expense.date)
    );

  /*
    Dépenses cette année
  */
  const yearlyExpenses =
    expenses.filter(
      (expense) =>
        isCurrentYear(expense.date)
    );

  const dailySpent =
    calculateTotal(dailyExpenses);

  const weeklySpent =
    calculateTotal(weeklyExpenses);

  const monthlySpent =
    calculateTotal(monthlyExpenses);

  const yearlySpent =
    calculateTotal(yearlyExpenses);

  /*
    Comme les dépenses venant de
    Supabase sont déjà triées par date
    décroissante, on prend simplement
    les 5 premières.
  */
  const recentExpenses =
    expenses.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Tableau de bord</h1>

          <p>
            Vue d'ensemble de tes
            dépenses et objectifs.
          </p>
        </div>
      </div>

      <section className="budget-grid">
        <BudgetCard
          title="Aujourd'hui"
          budget={budgets.daily}
          spent={dailySpent}
        />

        <BudgetCard
          title="Cette semaine"
          budget={budgets.weekly}
          spent={weeklySpent}
        />

        <BudgetCard
          title="Ce mois-ci"
          budget={budgets.monthly}
          spent={monthlySpent}
        />

        <BudgetCard
          title="Cette année"
          budget={budgets.yearly}
          spent={yearlySpent}
        />
      </section>

      <section className="recent-expenses">
        <h2>Dernières dépenses</h2>

        {recentExpenses.length === 0 ? (
          <p>
            Aucune dépense pour le moment.
          </p>
        ) : (
          recentExpenses.map(
            (expense) => (
              <div
                className="recent-expense"
                key={expense.id}
              >
                <div>
                  <strong>
                    {expense.description}
                  </strong>

                  <p>
                    {expense.category}
                    {' · '}
                    {expense.date}
                  </p>
                </div>

                <strong>
                  {Number(
                    expense.amount
                  ).toFixed(2)}
                  {' €'}
                </strong>
              </div>
            )
          )
        )}
      </section>
    </div>
  );
}

export default Dashboard;