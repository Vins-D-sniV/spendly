function BudgetCard({
  title,
  budget,
  spent
}) {
  const safeBudget =
    Number(budget) || 0;

  const safeSpent =
    Number(spent) || 0;

  const remaining =
    safeBudget - safeSpent;

  const percentage =
    safeBudget === 0
      ? 0
      : (
          safeSpent /
          safeBudget
        ) * 100;

  const progressValue =
    Math.min(
      safeSpent,
      safeBudget
    );

  return (
    <article className="budget-card">
      <h3>{title}</h3>

      <h2>
        {safeSpent.toFixed(2)} €
      </h2>

      <p>
        sur {safeBudget.toFixed(2)} €
      </p>

      {safeBudget > 0 && (
        <progress
          value={progressValue}
          max={safeBudget}
        />
      )}

      <p>
        {percentage.toFixed(1)}
        {' % utilisé'}
      </p>

      {remaining >= 0 ? (
        <p>
          Reste :{' '}
          <strong>
            {remaining.toFixed(2)} €
          </strong>
        </p>
      ) : (
        <p>
          Dépassement :{' '}
          <strong>
            {Math.abs(
              remaining
            ).toFixed(2)} €
          </strong>
        </p>
      )}
    </article>
  );
}

export default BudgetCard;