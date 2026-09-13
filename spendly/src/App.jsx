import {
  useEffect,
  useState
} from 'react';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {
  getExpenses,
  createExpense,
  editExpense,
  removeExpense
} from './services/expenseService';

import {
  DEFAULT_BUDGETS,
  getBudgets,
  saveBudgets
} from './services/budgetService';

import './App.css';

import { supabase } from './lib/supabaseClient';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import Statistics from './pages/Statistics';
import Login from './pages/login';

function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] =
    useState(true);

  const [expenses, setExpenses] =
    useState([]);

  const [budgets, setBudgets] =
    useState(DEFAULT_BUDGETS);
  /*
    AUTHENTIFICATION
  */
  useEffect(() => {
    async function loadSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setSession(session);
      setAuthLoading(false);
    }

    loadSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);
    useEffect(() => {
    if (session) {
      fetchExpenses();
      fetchBudgets();
    } else {
      setExpenses([]);
      setBudgets(DEFAULT_BUDGETS);
    }
  }, [session]);

  /*
    CHARGEMENT DES DÉPENSES
  */
  async function fetchExpenses() {
    try {
      const data =
        await getExpenses();

      setExpenses(data);
    } catch (error) {
      console.error(
        'Erreur chargement dépenses :',
        error
      );
    }
  }

  /*
    CHARGEMENT DES BUDGETS
  */
 async function fetchBudgets() {
    if (!session) return;

    try {
      const data =
        await getBudgets(
          session.user.id
        );

      setBudgets(data);
    } catch (error) {
      console.error(
        'Erreur chargement budgets :',
        error
      );
    }
  }

  /*
    Quand l'utilisateur se connecte,
    on récupère ses données.
  */
  useEffect(() => {
    if (session) {
      fetchExpenses();
      fetchBudgets();
    } else {
      setExpenses([]);
      setBudgets(DEFAULT_BUDGETS);
    }
  }, [session]);

  /*
    AJOUTER UNE DÉPENSE
  */
  async function addExpense(expense) {
    if (!session) return;

    try {
      const newExpense =
        await createExpense(
          expense,
          session.user.id
        );

      setExpenses(
        (currentExpenses) => [
          newExpense,
          ...currentExpenses
        ]
      );
    } catch (error) {
      console.error(
        'Erreur ajout dépense :',
        error
      );
    }
  }

  /*
    MODIFIER UNE DÉPENSE
  */
 async function updateExpense(
    updatedExpense
  ) {
    try {
      const savedExpense =
        await editExpense(
          updatedExpense
        );

      setExpenses(
        (currentExpenses) =>
          currentExpenses.map(
            (expense) =>
              expense.id ===
              savedExpense.id
                ? savedExpense
                : expense
          )
      );
    } catch (error) {
      console.error(
        'Erreur modification dépense :',
        error
      );
    }
  }
  /*
    SUPPRIMER UNE DÉPENSE
  */
 async function deleteExpense(id) {
    try {
      await removeExpense(id);

      setExpenses(
        (currentExpenses) =>
          currentExpenses.filter(
            (expense) =>
              expense.id !== id
          )
      );
    } catch (error) {
      console.error(
        'Erreur suppression dépense :',
        error
      );
    }
  }

  /*
    CRÉER OU MODIFIER LES BUDGETS
  */
  async function updateBudgets(
    newBudgets
  ) {
    if (!session) return;

    try {
      const savedBudgets =
        await saveBudgets(
          newBudgets,
          session.user.id
        );

      setBudgets(savedBudgets);
    } catch (error) {
      console.error(
        'Erreur sauvegarde budgets :',
        error
      );
    }
  }

  /*
    On attend que Supabase nous dise
    si une session existe.
  */
  if (authLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          session ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/*"
        element={
          session ? (
            <div className="App">
              <Sidebar />

              <main className="main-content">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        expenses={
                          expenses
                        }
                        budgets={
                          budgets
                        }
                      />
                    }
                  />

                  <Route
                    path="/expenses"
                    element={
                      <Expenses
                        expenses={
                          expenses
                        }
                        onAddExpense={
                          addExpense
                        }
                        onDeleteExpense={
                          deleteExpense
                        }
                        onUpdateExpense={
                          updateExpense
                        }
                      />
                    }
                  />

                  <Route
                    path="/budgets"
                    element={
                      <Budgets
                        budgets={
                          budgets
                        }
                        onUpdateBudgets={
                          updateBudgets
                        }
                      />
                    }
                  />

                  <Route
                    path="/statistics"
                    element={
                      <Statistics
                        expenses={
                          expenses
                        }
                      />
                    }
                  />

                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/dashboard"
                        replace
                      />
                    }
                  />
                </Routes>
              </main>
            </div>
          ) : (
            <Navigate
              to="/login"
              replace
            />
          )
        }
      />
    </Routes>
  );
}

export default App;