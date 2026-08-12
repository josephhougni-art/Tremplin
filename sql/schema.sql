-- ============================================================
-- TREMPLIN — Schéma de la base de données
-- À exécuter une seule fois dans Supabase : Project > SQL Editor > New query > Run
-- ============================================================

-- ============================================================
-- ESPACE ADMIN
-- ============================================================
-- Table listant qui a le droit de voir les données de TOUS les
-- utilisateurs (par défaut, personne — RLS bloque tout le monde
-- aux autres tables). Pour te donner accès à toi-même :
--   1. Crée d'abord ton compte normalement via signup.html
--   2. Dans Supabase > Table Editor > auth > users, trouve ton user_id
--   3. Exécute : insert into admins (user_id) values ('ton-user-id-ici');
create table if not exists admins (
  user_id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz default now()
);

alter table admins enable row level security;

-- Personne ne peut lire/modifier cette table depuis le navigateur, même les admins.
-- Elle n'est consultée que côté serveur (fonction admin-data avec service_role).
-- Aucune policy créée = accès refusé par défaut à tout le monde via l'API publique.

-- Table qui stocke la progression de chaque utilisateur (1 ligne par utilisateur)
create table if not exists progress (
  user_id uuid references auth.users(id) on delete cascade primary key,
  selected_country text,
  unlocked_up_to int default 0,
  phase_results jsonb default '{}'::jsonb,
  paid_at timestamptz,
  payment_provider text,
  payment_reference text,
  updated_at timestamptz default now()
);

-- Si tu as déjà exécuté une version antérieure de ce script (table déjà créée),
-- ces lignes ajoutent les nouvelles colonnes sans tout recréer :
alter table progress add column if not exists paid_at timestamptz;
alter table progress add column if not exists payment_provider text;
alter table progress add column if not exists payment_reference text;

-- Active la sécurité au niveau des lignes : chaque utilisateur ne voit/modifie QUE sa propre ligne
alter table progress enable row level security;

create policy "Chacun peut voir sa propre progression"
  on progress for select
  using (auth.uid() = user_id);

create policy "Chacun peut créer sa propre progression"
  on progress for insert
  with check (auth.uid() = user_id);

create policy "Chacun peut modifier sa propre progression"
  on progress for update
  using (auth.uid() = user_id);

-- Met à jour automatiquement updated_at à chaque modification
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger progress_updated_at
  before update on progress
  for each row
  execute function set_updated_at();

-- ============================================================
-- SÉCURITÉ CRITIQUE : empêche un utilisateur de se débloquer lui-même
-- ============================================================
-- Le site (navigateur) se connecte avec une clé "anon" limitée par les
-- policies ci-dessus. Sans ce verrou, un utilisateur un peu bidouilleur
-- pourrait appeler l'API Supabase directement depuis la console de son
-- navigateur et modifier unlocked_up_to lui-même, sans payer.
-- Ce trigger ignore silencieusement toute tentative de modification des
-- colonnes liées au paiement, SAUF si la requête vient d'une fonction
-- serveur (service_role) — c'est-à-dire uniquement après vérification
-- réelle du paiement par verify-kkiapay-payment ou stripe-webhook.
create or replace function protect_payment_fields()
returns trigger as $$
begin
  if auth.role() <> 'service_role' then
    if TG_OP = 'UPDATE' then
      new.unlocked_up_to := old.unlocked_up_to;
      new.paid_at := old.paid_at;
      new.payment_provider := old.payment_provider;
      new.payment_reference := old.payment_reference;
    elsif TG_OP = 'INSERT' then
      new.unlocked_up_to := 0;
      new.paid_at := null;
      new.payment_provider := null;
      new.payment_reference := null;
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger progress_protect_payment
  before insert or update on progress
  for each row
  execute function protect_payment_fields();
