function ExpenseItem({ expense }) {
    return (
        <div className="expense-item">
            <p>{expense.description}</p>
            <p>{expense.amount} €</p>
            <p>{expense.date}</p>
        </div>
    );
}
export default ExpenseItem;