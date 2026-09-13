function ExpenseForm({
  onAddExpense
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData =
      new FormData(event.target);

    const expense = {
      description:
        formData.get('description'),

      amount:
        Number(
          formData.get('amount')
        ),

      date:
        formData.get('date'),

      category:
        formData.get('category')
    };

    onAddExpense(expense);

    event.target.reset();
  }

  return (
    <section className="expense-form-section">
      <h2>Ajouter une dépense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">
            Description
          </label>

          <input
            id="description"
            type="text"
            name="description"
            placeholder="Ex : Courses"
            required
          />
        </div>

        <div>
          <label htmlFor="amount">
            Montant
          </label>

          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Ex : 42.50"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            type="date"
            name="date"
            required
          />
        </div>

        <div>
          <label htmlFor="category">
            Catégorie
          </label>

          <select
            id="category"
            name="category"
            defaultValue=""
            required
          >
            <option
              value=""
              disabled
            >
              Choisir une catégorie
            </option>

            <option value="Alimentation">
              Alimentation
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Logement">
              Logement
            </option>

            <option value="Loisirs">
              Loisirs
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Abonnements">
              Abonnements
            </option>

            <option value="Autre">
              Autre
            </option>
          </select>
        </div>

        <button type="submit">
          Ajouter la dépense
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;