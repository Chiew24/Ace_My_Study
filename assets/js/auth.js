(() => {
  const SUPABASE_URL = 'https://baizofrsfkayctpujfay.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_1nm_yR17n62hn1_dqLb8BQ_vCiZkZ-2';
  const LOGIN_PAGE = 'login.html';
  const MAIN_PAGE = 'index.html';
  const OVERVIEW_PAGE = 'overview.html';

  let clientPromise;

  function getClient() {
    if (!clientPromise) {
      clientPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
        .then(({ createClient }) => createClient(SUPABASE_URL, SUPABASE_KEY));
    }
    return clientPromise;
  }

  function nextPath() {
    const path = `${location.pathname.split('/').pop() || MAIN_PAGE}${location.search}`;
    return path === LOGIN_PAGE || path === MAIN_PAGE ? OVERVIEW_PAGE : path;
  }

  function redirectToLogin() {
    const next = encodeURIComponent(nextPath());
    location.replace(`${LOGIN_PAGE}?next=${next}`);
  }

  async function requireSession() {
    const supabase = await getClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirectToLogin();
    return session;
  }

  async function updateProfile(session) {
    const name = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Student';
    document.querySelectorAll('.profile-name').forEach(el => { el.textContent = name; });
    document.querySelectorAll('.avatar').forEach(el => { el.textContent = name.charAt(0).toUpperCase(); });
    const welcome = document.querySelector('.welcome h1');
    if (welcome) welcome.textContent = name;
  }

  async function initProtectedPage() {
    const session = await requireSession();
    if (session) await updateProfile(session);

    document.querySelectorAll('[data-logout]').forEach(button => {
      button.addEventListener('click', async () => {
        button.disabled = true;
        const supabase = await getClient();
        await supabase.auth.signOut();
        location.replace(MAIN_PAGE);
      });
    });
  }

  async function initLoginPage() {
    const supabase = await getClient();
    const freshLogin = new URLSearchParams(location.search).get('fresh') === '1';
    const { data: { session } } = await supabase.auth.getSession();

    if (freshLogin && session) {
      await supabase.auth.signOut();
    } else if (session) {
      location.replace(OVERVIEW_PAGE);
      return;
    }

    const form = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const message = document.getElementById('authMessage');
    const container = document.getElementById('authContainer');

    function showMessage(text, type = '') {
      message.textContent = text;
      message.className = `auth-message ${type}`;
    }

    function showSignup() {
      container.classList.add('active');
      showMessage('');
    }

    function showLogin() {
      container.classList.remove('active');
      showMessage('');
    }

    document.querySelectorAll('[data-show-login]').forEach(button => button.addEventListener('click', showLogin));
    document.querySelectorAll('[data-show-signup]').forEach(button => button.addEventListener('click', showSignup));

    if (location.hash === '#signup') showSignup();

    form?.addEventListener('submit', async event => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      showMessage('Signing you in…');

      const email = form.email.value.trim();
      const password = form.password.value;
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        showMessage('Unable to sign in. Please check your email and password.', 'error');
        button.disabled = false;
        return;
      }

      showMessage('Login successful.');
      location.replace(OVERVIEW_PAGE);
    });

    signupForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const button = signupForm.querySelector('button[type="submit"]');
      button.disabled = true;
      showMessage('Creating your account…');

      const name = signupForm.full_name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });

      if (error) {
        showMessage(error.message, 'error');
        button.disabled = false;
        return;
      }

      if (data.session) {
        location.replace(OVERVIEW_PAGE);
      } else {
        showMessage('Account created. Please check your email to confirm your account.', 'success');
        button.disabled = false;
      }
    });
  }

  window.LearnWithShenAuth = { getClient, requireSession };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (location.pathname.endsWith(`/${LOGIN_PAGE}`) || location.pathname.endsWith(LOGIN_PAGE)) initLoginPage();
      else if (location.pathname.endsWith(`/${MAIN_PAGE}`) || location.pathname.endsWith(MAIN_PAGE) || location.pathname.endsWith('/')) {
        // Main landing page is public.
      } else {
        initProtectedPage();
      }
    });
  } else {
    if (location.pathname.endsWith(`/${LOGIN_PAGE}`) || location.pathname.endsWith(LOGIN_PAGE)) initLoginPage();
    else if (location.pathname.endsWith(`/${MAIN_PAGE}`) || location.pathname.endsWith(MAIN_PAGE) || location.pathname.endsWith('/')) {
      // Main landing page is public.
    } else {
      initProtectedPage();
    }
  }
})();
