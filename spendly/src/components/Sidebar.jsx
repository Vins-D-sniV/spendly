import {
  NavLink
} from 'react-router-dom';

import {
  supabase
} from '../lib/supabaseClient';

function Sidebar() {
  function getNavLinkClass({
    isActive
  }) {
    return isActive
      ? 'nav-link active'
      : 'nav-link';
  }

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        'Erreur déconnexion :',
        error
      );
    }
  }

  return (
    <aside className="sidebar">
      <h2>Spendly</h2>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={
                getNavLinkClass
              }
            >
              Tableau de bord
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/expenses"
              className={
                getNavLinkClass
              }
            >
              Dépenses
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/budgets"
              className={
                getNavLinkClass
              }
            >
              Objectifs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/statistics"
              className={
                getNavLinkClass
              }
            >
              Statistiques
            </NavLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </aside>
  );
}

export default Sidebar;