// ============================================================
// CONFIGURATION SUPABASE — À COMPLÉTER
// ============================================================
// 1. Crée un compte gratuit sur https://supabase.com
// 2. Crée un nouveau projet
// 3. Va dans Project Settings > API
// 4. Copie "Project URL" et colle-le ci-dessous à la place de SUPABASE_URL
// 5. Copie la clé "anon public" et colle-la à la place de SUPABASE_ANON_KEY
// 6. Exécute le script sql/schema.sql dans l'éditeur SQL de Supabase
//    (Project > SQL Editor > New query > colle le contenu > Run)
// ============================================================

const SUPABASE_URL = 'https://zceqjwycneloyjfidshv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZXFqd3ljbmVsb3lqZmlkc2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0Nzg3NjUsImV4cCI6MjEwMTA1NDc2NX0.n2ZFMGohrP9YYAzK61iNgfqiCDjzsjydmn9c0tPukiM';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Vérifie qu'un utilisateur est connecté. Si non, redirige vers login.html.
 * À appeler en haut des pages qui nécessitent une connexion (app.html, dashboard.html, checkout.html).
 * Retourne l'utilisateur connecté si présent.
 */
async function requireAuth(){
  const { data, error } = await supabaseClient.auth.getUser();
  if(error || !data.user){
    window.location.href = 'login.html';
    return null;
  }
  return data.user;
}
