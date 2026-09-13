import { useState } from 'react';
import {
  parseLocalDate
} from '../utils/dates';

function Statistics({ expenses }) {
  const [period, setPeriod] =
    useState('month');

  /*
    Vérifie si une dépense appartient
    à la période sélectionnée.
  */
  function isInSelectedPeriod(
    dateString
  ) {
    if (period === 'all') {
      return true;
    }

    const expenseDate =
      parseLocalDate(dateString);

    const today = new Date();

    /*
      On retire les heures afin de
      comparer uniquement les dates.
    */
    today.setHours(0, 0, 0, 0);

    if (period === 'week') {
      const sevenDaysAgo =
        new Date(today);

      sevenDaysAgo.setDate(
        today.getDate() - 6
      );

      return (
        expenseDate >= sevenDaysAgo &&
        expenseDate <= today
      );
    }

    if (period === 'month') {
      return (
        expenseDate.getFullYear() ===
          today.getFullYear() &&
        expenseDate.getMonth() ===
          today.getMonth()
      );
    }

    if (period === 'year') {
      return (
        expenseDate.getFullYear() ===
        today.getFullYear()
      );
    }

    return true;
  }

  /*
    On garde uniquement les dépenses
    correspondant à la période.
  */
  const filteredExpenses =
    expenses.filter(
      (expense) =>
        isInSelectedPeriod(
          expense.date
        )
    );

  /*
    Total de la période.
  */
  const totalSpent =
    filteredExpenses.reduce(
      (total, expense) =>
        total +
        Number(expense.amount),
      0
    );

  /*
    Regroupement par catégorie.

    Exemple :

    {
      Alimentation: 120,
      Transport: 45,
      Loisirs: 80
    }
  */
  const totalsByCategory =
    filteredExpenses.reduce(
      (totals, expense) => {
        const category =
          expense.category ||
          'Non catégorisé';

        if (!totals[category]) {
          totals[category] = 0;
        }

        totals[category] +=
          Number(expense.amount);

        return totals;
      },
      {}
    );

  /*
    On transforme l'objet en tableau
    pour pouvoir utiliser map().

    Puis on trie du montant
    le plus élevé au plus faible.
  */
  const categoryStats =
    Object.entries(
      totalsByCategory
    )
      .map(
        ([category, amount]) => ({
          category,
          amount
        })
      )
      .sort(
        (a, b) =>
          b.amount - a.amount
      );

  /*
    La première catégorie après le tri
    est celle où l'utilisateur
    dépense le plus.
  */
  const mainCategory =
    categoryStats[0] || null;

  return (
    <div className="statistics-page">
      <header className="statistics-header">
        <div>
          <h1>Statistiques</h1>

          <p>
            Analyse la répartition
            de tes dépenses.
          </p>
        </div>

        <div className="period-filter">
          <button
            type="button"
            className={
              period === 'week'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPeriod('week')
            }
          >
            7 jours
          </button>

          <button
            type="button"
            className={
              period === 'month'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPeriod('month')
            }
          >
            Mois
          </button>

          <button
            type="button"
            className={
              period === 'year'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPeriod('year')
            }
          >
            Année
          </button>

          <button
            type="button"
            className={
              period === 'all'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPeriod('all')
            }
          >
            Tout
          </button>
        </div>
      </header>

      <section className="statistics-summary">
        <article className="stat-card">
          <h3>Total dépensé</h3>

          <strong>
            {totalSpent.toFixed(2)} €
          </strong>
        </article>

        <article className="stat-card">
          <h3>
            Nombre de dépenses
          </h3>

          <strong>
            {filteredExpenses.length}
          </strong>
        </article>

        <article className="stat-card">
          <h3>
            Catégorie principale
          </h3>

          {mainCategory ? (
            <>
              <strong>
                {mainCategory.category}
              </strong>

              <p>
                {mainCategory.amount
                  .toFixed(2)}
                {' €'}
              </p>
            </>
          ) : (
            <strong>—</strong>
          )}
        </article>
      </section>

      <section className="category-stats">
        <h2>
          Dépenses par catégorie
        </h2>

        {categoryStats.length === 0 ? (
          <p className="empty-state">
            Aucune dépense pour
            cette période.
          </p>
        ) : (
          categoryStats.map(
            ({
              category,
              amount
            }) => {
              const percentage =
                totalSpent === 0
                  ? 0
                  : (
                      amount /
                      totalSpent
                    ) * 100;

              return (
                <div
                  className="category-row"
                  key={category}
                >
                  <div className="category-info">
                    <strong>
                      {category}
                    </strong>

                    <span>
                      {amount.toFixed(2)}
                      {' €'}
                    </span>
                  </div>

                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{
                        width:
                          `${percentage}%`
                      }}
                    />
                  </div>

                  <p>
                    {percentage.toFixed(1)}
                    {' % des dépenses'}
                  </p>
                </div>
              );
            }
          )
        )}
      </section>
    </div>
  );
}

export default Statistics;