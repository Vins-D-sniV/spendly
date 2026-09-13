import { useState } from 'react';

import ExpenseEditForm
  from './ExpenseEditForm';

function ExpenseList({
  expenses,
  onDeleteExpense,
  onUpdateExpense
}) {
  const [
    editingExpenseId,
    setEditingExpenseId
  ] = useState(null);

  function handleSave(
    updatedExpense
  ) {
    onUpdateExpense(
      updatedExpense
    );

    setEditingExpenseId(null);
  }

  return (
    <section className="expense-list">
      <h2>Dépenses récentes</h2>

      {expenses.length === 0 ? (
        <p>
          Aucune dépense pour le moment.
        </p>
      ) : (
        expenses.map(
          (expense) => (
            <div
              className="expense-item"
              key={expense.id}
            >
              {editingExpenseId ===
              expense.id ? (
                <ExpenseEditForm
                  expense={expense}
                  onSave={handleSave}
                  onCancel={() =>
                    setEditingExpenseId(
                      null
                    )
                  }
                />
              ) : (
                <>
                  <div>
                    <strong>
                      {
                        expense.description
                      }
                    </strong>

                    <p>
                      {expense.category ||
                        'Autre'}
                    </p>

                    <p>
                      {expense.date}
                    </p>
                  </div>

                  <div>
                    <strong>
                      {Number(
                        expense.amount
                      ).toFixed(2)}{' '}
                      €
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingExpenseId(
                          expense.id
                        )
                      }
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDeleteExpense(
                          expense.id
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        )
      )}
    </section>
  );
}

export default ExpenseList;