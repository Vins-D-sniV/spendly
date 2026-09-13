import {
  supabase
} from '../lib/supabaseClient';

export const DEFAULT_BUDGETS = {
  daily: 25,
  weekly: 100,
  monthly: 400,
  yearly: 5000
};

function fromDbBudgets(data) {
  return {
    daily: Number(data.daily),
    weekly: Number(data.weekly),
    monthly: Number(data.monthly),
    yearly: Number(data.yearly)
  };
}

export async function getBudgets(
  userId
) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return DEFAULT_BUDGETS;
  }

  return fromDbBudgets(data);
}

export async function saveBudgets(
  budgets,
  userId
) {
  const { data, error } = await supabase
    .from('budgets')
    .upsert(
      {
        user_id: userId,
        daily: budgets.daily,
        weekly: budgets.weekly,
        monthly: budgets.monthly,
        yearly: budgets.yearly,
        updated_at:
          new Date().toISOString()
      },
      {
        onConflict: 'user_id'
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return fromDbBudgets(data);
}