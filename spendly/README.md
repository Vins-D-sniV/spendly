# 💰 Spendly

Spendly est une application web de gestion de finances personnelles développée avec React et Supabase.

Elle permet de suivre ses dépenses, définir des objectifs de budget et consulter des statistiques sur ses habitudes de consommation.

> 🚧 Projet en cours de développement.

## Fonctionnalités

- Authentification des utilisateurs
- Ajout, modification et suppression de dépenses
- Catégorisation des dépenses
- Objectifs de dépenses :
  - journaliers
  - hebdomadaires
  - mensuels
  - annuels
- Tableau de bord avec suivi des budgets
- Affichage des dépenses récentes
- Statistiques par catégorie
- Filtrage des statistiques par période
- Données propres à chaque utilisateur
- Interface responsive

## Technologies utilisées

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)

## Structure du projet

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── BudgetCard.jsx
│   ├── BudgetForm.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseEditForm.jsx
│   └── ExpenseList.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Expenses.jsx
│   ├── Budgets.jsx
│   ├── Statistics.jsx
│   └── Login.jsx
│
├── services/
│   ├── expenseService.js
│   └── budgetService.js
│
├── lib/
│   └── supabaseClient.js
│
├── utils/
│   └── dates.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Vins-D-sniV/spendly
```

Puis :

```bash
cd spendly
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

Créer un fichier `.env.local` à la racine du projet :

```env
VITE_SUPABASE_URL=ton_url_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=ta_cle_publishable_supabase
```

Ne jamais placer de clé secrète Supabase dans le frontend.

### 4. Lancer l'application

```bash
npm run dev
```

L'application est ensuite accessible sur l'adresse indiquée par Vite, généralement :

```text
http://localhost:5173
```

## Base de données

Spendly utilise actuellement deux tables principales.

### `expenses`

Chaque dépense appartient à un utilisateur.

Principaux champs :

```text
id
user_id
description
amount
expense_date
category
created_at
```

### `budgets`

Chaque utilisateur possède ses propres objectifs.

Principaux champs :

```text
id
user_id
daily
weekly
monthly
yearly
created_at
updated_at
```

## Sécurité

L'authentification est gérée avec Supabase Auth.

Les tables utilisent également PostgreSQL Row Level Security (RLS) afin qu'un utilisateur puisse uniquement accéder à ses propres données.

La sécurité des données ne repose donc pas uniquement sur l'interface React.

## Architecture

L'application sépare progressivement les différentes responsabilités :

```text
Pages / Components
        │
        ▼
     App.jsx
        │
        ▼
     Services
        │
        ▼
     Supabase
        │
        ▼
   PostgreSQL
```

Les services s'occupent de la communication avec Supabase tandis que les composants React restent principalement responsables de l'affichage et des interactions utilisateur.

## État du projet

Spendly est actuellement en développement.

Quelques évolutions envisagées :

- graphiques d'évolution des dépenses
- statistiques plus avancées
- amélioration de l'expérience mobile
- amélioration de l'interface utilisateur
- gestion du profil utilisateur
- système de rôles administrateur/utilisateur
- davantage de filtres et de périodes
- tests automatisés

## Objectif du projet

Spendly est également un projet d'apprentissage permettant de mettre en pratique :

- React
- gestion du state
- composants et props
- formulaires contrôlés
- React Router
- opérations CRUD
- authentification
- PostgreSQL
- Supabase
- Row Level Security
- organisation d'une application React
- séparation entre frontend et accès aux données

## Auteur
Vins D sniV
Projet personnel.