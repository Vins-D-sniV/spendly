import { useState } from 'react';

function ExpenseEditForm({
  expense,
  onSave,
  onCancel
}) {
  const [
    description,
    setDescription
  ] = useState(
    expense.description || ''
  );

  const [
    amount,
    setAmount
  ] = useState(
    expense.amount ?? ''
  );

  const [
    date,
    setDate
  ] = useState(
    expense.date || ''
  );

  const [
    category,
    setCategory
  ] = useState(
    expense.category || 'Autre'
  );

  function handleSubmit(event) {
    event.preventDefault();

    const updatedExpense = {
      ...expense,
      description,
      amount: Number(amount),
      date,
      category
    };

    onSave(updatedExpense);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-description">
          Description
        </label>

        <input
          id="edit-description"
          type="text"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          required
        />
      </div>

      <div>
        <label htmlFor="edit-amount">
          Montant
        </label>

        <input
          id="edit-amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) =>
            setAmount(
              event.target.value
            )
          }
          required
        />
      </div>

      <div>
        <label htmlFor="edit-date">
          Date
        </label>

        <input
          id="edit-date"
          type="date"
          value={date}
          onChange={(event) =>
            setDate(
              event.target.value
            )
          }
          required
        />
      </div>

      <div>
        <label htmlFor="edit-category">
          Catégorie
        </label>

        <select
          id="edit-category"
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value
            )
          }
        >
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
        Enregistrer
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Annuler
      </button>
    </form>
  );
}

export default ExpenseEditForm;