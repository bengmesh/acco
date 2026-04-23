// App state + router
const APP = {
  currentScreen: 'landing',
  currentBuddyId: null,
  currentGoalId: null,
  history: [],
};

// Map route names → screen renderers
const ROUTES = {
  'landing':            SCREENS.landing,
  'signup':             SCREENS.signup,
  'login':              SCREENS.login,
  'forgot':             SCREENS.forgot,
  'dashboard':          SCREENS.dashboard,
  'checkin':            SCREENS.checkin,
  'goals':              SCREENS.goals,
  'goal-history':       SCREENS.goalHistory,
  'create-goal':        SCREENS.createGoal,
  'create-goal-2':      SCREENS.createGoal2,
  'create-goal-3':      SCREENS.createGoal3,
  'goal-detail':        SCREENS.goalDetail,
  'buddies':            SCREENS.buddies,
  'add-partners':       SCREENS.addPartners,
  'buddy-detail':       SCREENS.buddyDetail,
  'encouragement':      SCREENS.encouragement,
  'leaderboard':        SCREENS.leaderboard,
  'notifications':      SCREENS.notifications,
  'notification-settings': SCREENS.notificationSettings,
  'profile':            SCREENS.profile,
  'settings':           SCREENS.settings,
  'feed':               SCREENS.feed,
  'badges':             SCREENS.badges,
};

// Tabs that should reset history stack
const TAB_ROUTES = new Set(['dashboard', 'buddies', 'leaderboard', 'profile']);

function navigate(route, opts = {}) {
  if (!ROUTES[route]) {
    console.warn('Unknown route:', route);
    return;
  }
  // Don't navigate if already on the screen
  if (route === APP.currentScreen && !opts.force) return;

  const app = document.getElementById('app');
  const current = app.querySelector('.screen.active');

  // Create new screen
  const next = document.createElement('div');
  next.className = 'screen';
  next.dataset.route = route;
  next.innerHTML = ROUTES[route]();

  app.appendChild(next);

  // Force reflow then animate
  requestAnimationFrame(() => {
    if (current) current.classList.add('exiting');
    next.classList.add('active');
    setTimeout(() => {
      if (current) current.remove();
      // Scroll the body to top
      const body = next.querySelector('.screen-body');
      if (body) body.scrollTop = 0;
    }, 260);
  });

  if (TAB_ROUTES.has(route)) {
    APP.history = [route];
  } else {
    APP.history.push(route);
  }
  APP.currentScreen = route;
}

// Event handlers invoked from markup
function openBuddy(id) {
  APP.currentBuddyId = id;
  navigate('buddy-detail');
}
function openGoal(id) {
  APP.currentGoalId = id;
  navigate('goal-detail');
}
function openEncouragement(id) {
  APP.currentBuddyId = id;
  navigate('encouragement');
}

function toggleLike(actId, el) {
  const a = DATA.activity.find(x => x.id === actId);
  if (!a) return;
  a.liked = !a.liked;
  el.classList.toggle('liked', a.liked);
  el.querySelector('svg').outerHTML = a.liked ? ICONS['heart-filled'] : ICONS['heart'];
  el.querySelector('span').textContent = a.liked ? 'Liked' : 'Like';
  if (a.liked) showToast('Liked', 'heart-filled');
}
function toggleCheer(actId, el) {
  const a = DATA.activity.find(x => x.id === actId);
  if (!a) return;
  a.cheered = !a.cheered;
  el.classList.toggle('cheered', a.cheered);
  el.querySelector('span').textContent = a.cheered ? 'Cheered' : 'Cheer';
  if (a.cheered) {
    showToast('Cheer sent', 'zap');
  }
}

function selectMood(el, val) {
  el.parentElement.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}
function toggleSeg(el) {
  el.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function completeSignup() {
  showToast('Welcome to acco', 'check-circle');
  setTimeout(() => navigate('dashboard'), 500);
}
function completeLogin() {
  showToast('Welcome back', 'check-circle');
  setTimeout(() => navigate('dashboard'), 400);
}
function completeCheckIn() {
  showToast(`Streak: ${DATA.user.stats.streak + 1} days`, 'flame');
  confetti();
  DATA.user.stats.streak += 1;
  setTimeout(() => navigate('dashboard'), 900);
}
function completeCreateGoal(solo) {
  showToast(solo ? 'Goal created' : 'Goal created · 3 buddies invited', 'check-circle');
  confetti();
  setTimeout(() => navigate('goals'), 900);
}
function sendBuddyRequest(btn, name) {
  btn.innerHTML = `${ICONS['check']}<span>Sent</span>`;
  btn.classList.remove('btn-primary');
  btn.classList.add('btn-secondary');
  btn.disabled = true;
  showToast(`Request sent to ${name.split(' ')[0]}`, 'send');
}
function quickSend(btn, msg) {
  const note = document.getElementById('encouragementNote');
  if (note) note.value = msg;
  btn.style.borderColor = 'var(--color-primary)';
  btn.style.background = 'var(--color-primary-dim)';
}
function sendEncouragement() {
  const note = document.getElementById('encouragementNote');
  if (!note || !note.value.trim()) {
    showToast('Write a note first', 'edit');
    return;
  }
  showToast('Encouragement sent', 'send');
  setTimeout(() => history.length > 1 ? navigate('buddies') : navigate('buddies'), 700);
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  const app = document.getElementById('app');
  const first = document.createElement('div');
  first.className = 'screen active';
  first.dataset.route = 'landing';
  first.innerHTML = ROUTES['landing']();
  app.appendChild(first);

  // Basic keyboard shortcut — Esc goes back one step
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && APP.history.length > 1) {
      APP.history.pop();
      const prev = APP.history[APP.history.length - 1] || 'landing';
      APP.history.pop();
      navigate(prev);
    }
  });
});
