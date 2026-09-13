function BudgetForm({
  budgets,
  onUpdateBudgets
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData =
      new FormData(event.target);

    const newBudgets = {
      daily: Number(
        formData.get('daily')
      ),

      weekly: Number(
        formData.get('weekly')
      ),

      monthly: Number(
        formData.get('monthly')
      ),

      yearly: Number(
        formData.get('yearly')
      )
    };

    onUpdateBudgets(newBudgets);
  }

  return (
    <section className="budget-form">
      <h2>Mes objectifs</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="daily">
            Budget journalier
          </label>

          <input
            id="daily"
            name="daily"
            type="number"
            min="0"
            step="0.01"
            defaultValue={
              budgets.daily
            }
            required
          />
        </div>

        <div>
          <label htmlFor="weekly">
            Budget hebdomadaire
          </label>

          <input
            id="weekly"
            name="weekly"
            type="number"
            min="0"
            step="0.01"
            defaultValue={
              budgets.weekly
            }
            required
          />
        </div>

        <div>
          <label htmlFor="monthly">
            Budget mensuel
          </label>

          <input
            id="monthly"
            name="monthly"
            type="number"
            min="0"
            step="0.01"
            defaultValue={
              budgets.monthly
            }
            required
          />
        </div>

        <div>
          <label htmlFor="yearly">
            Budget annuel
          </label>

          <input
            id="yearly"
            name="yearly"
            type="number"
            min="0"
            step="0.01"
            defaultValue={
              budgets.yearly
            }
            required
          />
        </div>

        <button type="submit">
          Enregistrer les objectifs
        </button>
      </form>
    </section>
  );
}

export default BudgetForm;