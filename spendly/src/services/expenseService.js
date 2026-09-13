import {
  supabase
} from '../lib/supabaseClient';

function fromDbExpense(expense) {
  return {
    id: expense.id,
    description: expense.description,
    amount: Number(expense.amount),
    date: expense.expense_date,
    category: expense.category,
    userId: expense.user_id,
    createdAt: expense.created_at
  };
}

export async function getExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order(
      'expense_date',
      { ascending: false }
    );

  if (error) {
    throw error;
  }

  return data.map(fromDbExpense);
}

export async function createExpense(
  expense,
  userId
) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id: userId,
        description: expense.description,
        amount: expense.amount,
        expense_date: expense.date,
        category: expense.category
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return fromDbExpense(data);
}

export async function editExpense(
  expense
) {
  const { data, error } = await supabase
    .from('expenses')
    .update({
      description: expense.description,
      amount: expense.amount,
      expense_date: expense.date,
      category: expense.category
    })
    .eq('id', expense.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return fromDbExpense(data);
}

export async function removeExpense(id) {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}