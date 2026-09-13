import {
  useState
} from 'react';

import {
  supabase
} from '../lib/supabaseClient';

function Login() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setMessage('');

    const { error } =
      await supabase.auth
        .signInWithPassword({
          email,
          password
        });

    if (error) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  async function handleSignUp() {
    setLoading(true);
    setMessage('');

    const { error } =
      await supabase.auth.signUp({
        email,
        password
      });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        'Compte créé. Vérifie ton e-mail si une confirmation est demandée.'
      );
    }

    setLoading(false);
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Spendly</h1>

        <p>
          Connecte-toi pour accéder
          à tes dépenses.
        </p>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />
          </div>

          <div>
            <label htmlFor="password">
              Mot de passe
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Chargement...'
              : 'Se connecter'}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleSignUp}
          >
            Créer un compte
          </button>
        </form>

        {message && (
          <p>{message}</p>
        )}
      </section>
    </main>
  );
}

export default Login;