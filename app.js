// App state + router
const APP = {
  currentScreen: 'landing',
  currentBuddyId: null,
  currentGoalId: null,
  currentChallengeId: null,
  currentGroupId: null,
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
  'integrations':       SCREENS.integrations,
  'challenges':         SCREENS.challenges,
  'challenge-detail':   SCREENS.challengeDetail,
  'groups':             SCREENS.groups,
  'group-detail':       SCREENS.groupDetail,
  'create-group':       SCREENS.createGroup,
  'nearby':             SCREENS.nearby,
  'share-profile':      SCREENS.shareProfile,
  'editProfile':        SCREENS.editProfile,
  'accountEmail':       SCREENS.accountEmail,
  'accountPassword':    SCREENS.accountPassword,
  'accountPrivacy':     SCREENS.accountPrivacy,
  'appearance':         SCREENS.appearance,
  'goalPreferences':    SCREENS.goalPreferences,
  'helpCenter':         SCREENS.helpCenter,
  'contactSupport':     SCREENS.contactSupport,
  'plans':              SCREENS.plans,
  'planCheckout':       SCREENS.planCheckout,
  'planDowngrade':      SCREENS.planDowngrade,
  'trainerDashboard':   SCREENS.trainerDashboard,
  'addTrainee':         SCREENS.addTrainee,
  'assignGoal':         SCREENS.assignGoal,
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
function openChallenge(id) {
  APP.currentChallengeId = id;
  navigate('challenge-detail');
}
function openGroup(id) {
  APP.currentGroupId = id;
  navigate('group-detail');
}
function toggleSource(id, btn) {
  const s = DATA.healthSources.find(x => x.id === id);
  if (!s) return;
  s.connected = !s.connected;
  showToast(s.connected ? `${s.name} connected` : `${s.name} disconnected`, s.connected ? 'check-circle' : 'x');
  setTimeout(() => navigate('integrations', { force: true }), 300);
}
function joinGroup(id) {
  const g = DATA.groups.find(x => x.id === id);
  if (!g) return;
  g.joined = true;
  g.requested = false;
  g.memberCount = (g.memberCount || 0) + 1;
  if (!g.members.includes('me')) g.members = ['me', ...g.members];
  showToast('Welcome to ' + g.name, 'check-circle');
  confetti();
  setTimeout(() => navigate('group-detail', { force: true }), 600);
}
function requestJoinGroup(id) {
  const g = DATA.groups.find(x => x.id === id);
  if (!g) return;
  g.requested = true;
  showToast('Request sent to ' + g.name, 'send');
  setTimeout(() => navigate('group-detail', { force: true }), 600);
}
function selectGroupPrivacy(btn, val) {
  const seg = document.getElementById('newGroupPrivacySeg');
  if (seg) seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const help = document.getElementById('newGroupPrivacyHelp');
  if (help) {
    help.textContent = val === 'private'
      ? 'Hidden from discovery. People must request to join and be approved by an admin.'
      : 'Anyone can discover this group and join with one tap.';
  }
}
function completeCreateGroup() {
  const nameEl = document.getElementById('newGroupName');
  const focusEl = document.getElementById('newGroupFocus');
  const descEl = document.getElementById('newGroupDesc');
  const seg = document.getElementById('newGroupPrivacySeg');
  const name = (nameEl && nameEl.value.trim()) || 'New group';
  const focusVal = (focusEl && focusEl.value.trim()) || 'General · Weekly';
  const desc = (descEl && descEl.value.trim()) || 'A new accountability group.';
  const activeBtn = seg && seg.querySelector('button.active');
  const privacy = (activeBtn && activeBtn.dataset.val) || 'public';
  const id = 'gr' + (DATA.groups.length + 1) + Date.now().toString(36).slice(-3);
  const newGroup = {
    id, name, icon: 'users', tint: 'primary',
    city: privacy === 'private' ? '— Invite only' : DATA.user.location || '— Global',
    memberCount: 1, groupStreak: 0,
    focus: focusVal, description: desc,
    privacy,
    members: ['me'], joined: true, requested: false,
    activity: [],
  };
  DATA.groups.unshift(newGroup);
  APP.currentGroupId = id;
  showToast(`Group created · ${privacy === 'private' ? 'Private' : 'Public'}`, 'check-circle');
  confetti();
  setTimeout(() => navigate('group-detail', { force: true }), 700);
}
function joinChallenge(id) {
  const c = DATA.challenges.find(x => x.id === id);
  if (!c) return;
  c.joined = true;
  showToast('Joined ' + c.title.split(' ').slice(0,3).join(' '), 'check-circle');
  confetti();
  setTimeout(() => navigate('challenge-detail', { force: true }), 600);
}
function acceptDetected(btn) {
  const card = btn.closest('.card-detected');
  if (card) card.style.display = 'none';
  showToast('Logged to your goal', 'check-circle');
}
function dismissDetected(btn) {
  const card = btn.closest('.card-detected');
  if (card) card.style.display = 'none';
}
function copyShareLink(btn, url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
  showToast('Link copied', 'copy');
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
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function alreadyCheckedInToday() {
  return DATA.user.lastCheckIn === todayKey();
}
function completeCheckIn() {
  if (alreadyCheckedInToday()) {
    showToast("You've already checked in today", 'check-circle');
    setTimeout(() => navigate('dashboard', { force: true }), 600);
    return;
  }
  DATA.user.lastCheckIn = todayKey();
  DATA.user.stats.streak += 1;
  const unit = DATA.user.stats.streakUnit || 'check-ins';
  showToast(`Streak: ${DATA.user.stats.streak} ${unit}`, 'flame');
  confetti();
  setTimeout(() => navigate('dashboard', { force: true }), 900);
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

  // Splash screen: remove from DOM after the CSS animation completes.
  const splash = document.getElementById('splash');
  if (splash) {
    const dismiss = () => splash.classList.add('splash-done');
    splash.addEventListener('animationend', (e) => {
      // The container animation is what drives the fade-out; wait for it.
      if (e.animationName === 'splash-container') dismiss();
    });
    // Safety fallback in case animationend doesn't fire (e.g. reduced motion).
    setTimeout(dismiss, 2800);
  }
});

// =============== Profile + Settings handlers ===============
function updateBioCount(el) {
  const counter = document.getElementById('ep-bio-count');
  if (counter) counter.textContent = `${el.value.length}/160`;
}

function saveProfile() {
  const name     = (document.getElementById('ep-name')?.value || '').trim();
  const handle   = (document.getElementById('ep-handle')?.value || '').trim().replace(/^@/, '');
  const bio      = (document.getElementById('ep-bio')?.value || '').trim();
  const location = (document.getElementById('ep-location')?.value || '').trim();
  const birthday = (document.getElementById('ep-birthday')?.value || '').trim();

  if (!name)   { showToast('Name can\'t be empty', 'x'); return; }
  if (!handle) { showToast('Username can\'t be empty', 'x'); return; }

  DATA.user.name     = name;
  DATA.user.handle   = '@' + handle;
  DATA.user.bio      = bio;
  DATA.user.location = location;
  DATA.user.birthday = birthday;
  DATA.user.visibility = Object.assign({}, DATA.user.visibility, {
    publicProfile: document.getElementById('ep-vis-public')?.checked,
    showLocation:  document.getElementById('ep-vis-location')?.checked,
    shareActivity: document.getElementById('ep-vis-activity')?.checked,
  });

  showToast('Profile saved', 'check-circle');
  navigate('profile', { force: true });
}

function updateEmail() {
  const newEmail = document.getElementById('ae-new')?.value.trim();
  const pw       = document.getElementById('ae-pw')?.value;
  if (!newEmail || !/^\S+@\S+\.\S+$/.test(newEmail)) { showToast('Enter a valid email', 'x'); return; }
  if (!pw) { showToast('Confirm with your password', 'x'); return; }
  showToast(`Verification sent to ${newEmail}`, 'mail');
  setTimeout(() => navigate('settings'), 500);
}

function updatePassword() {
  const cur = document.getElementById('pw-current')?.value;
  const nw  = document.getElementById('pw-new')?.value;
  const cf  = document.getElementById('pw-confirm')?.value;
  if (!cur) { showToast('Enter current password', 'x'); return; }
  if (!nw || nw.length < 8) { showToast('New password too short', 'x'); return; }
  if (nw !== cf) { showToast('Passwords don\'t match', 'x'); return; }
  showToast('Password updated', 'check-circle');
  setTimeout(() => navigate('settings'), 500);
}

function savePrivacy() {
  DATA.user.visibility = Object.assign({}, DATA.user.visibility, {
    publicProfile:   document.getElementById('pr-public')?.checked,
    showLocation:    document.getElementById('pr-location')?.checked,
    discoverable:    document.getElementById('pr-nearby')?.checked,
    shareActivity:   document.getElementById('pr-activity')?.checked,
    showLeaderboard: document.getElementById('pr-leaderboard')?.checked,
    milestones:      document.getElementById('pr-milestones')?.checked,
  });
  showToast('Privacy updated', 'check-circle');
  setTimeout(() => navigate('settings'), 500);
}

function setAppearance(mode) {
  DATA.user.appearance = mode;
  showToast(mode === 'system' ? 'Matching system' : `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`, 'check-circle');
  // Re-render current screen to reflect selection state
  navigate('appearance', { force: true });
}

function saveGoalPrefs() {
  DATA.user.goalPrefs = Object.assign({}, DATA.user.goalPrefs, {
    honorRest:      document.getElementById('gp-restdays')?.checked,
    gracePeriod:    document.getElementById('gp-graceperiod')?.checked,
    autoShare:      document.getElementById('gp-autoshare')?.checked,
    morningNudge:   document.getElementById('gp-morning')?.checked,
    eveningCheckin: document.getElementById('gp-evening')?.checked,
  });
  showToast('Preferences saved', 'check-circle');
  setTimeout(() => navigate('settings'), 500);
}

function sendSupportMessage() {
  const msg = document.getElementById('cs-msg')?.value.trim();
  if (!msg || msg.length < 10) { showToast('Tell us a bit more', 'edit'); return; }
  showToast('Message sent · we\'ll reply soon', 'send');
  setTimeout(() => navigate('helpCenter'), 600);
}

function logOut() {
  showToast('Logged out', 'log-out');
  setTimeout(() => navigate('landing', { force: true }), 500);
}

function confirmDeleteAccount() {
  const ok = window.confirm('Delete your acco account? This can\'t be undone. Your buddies will be notified.');
  if (!ok) return;
  showToast('Account deletion queued', 'x');
  setTimeout(() => navigate('landing', { force: true }), 700);
}

// ============= PLAN HANDLERS =============
function selectBillingCycle(btn, val) {
  const seg = document.getElementById('planCycleSeg');
  if (seg) seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  DATA.subscription.billingCycle = val;
  // Re-render just the plan list to reflect pricing
  const list = document.getElementById('planList');
  if (list) {
    const currentRank = PLAN_RANK[DATA.subscription.planId];
    list.innerHTML = DATA.plans.map(p => planCardHTML(p, val, currentRank, DATA.subscription.planId)).join('');
  }
}
function startUpgrade(planId) {
  APP.pendingPlanId = planId;
  APP.pendingCycle = DATA.subscription.billingCycle || 'yearly';
  navigate('planCheckout');
}
function startDowngrade(planId) {
  APP.pendingPlanId = planId;
  navigate('planDowngrade');
}
function completeUpgrade() {
  const planId = APP.pendingPlanId;
  const plan = DATA.plans.find(p => p.id === planId);
  if (!plan) return;
  DATA.subscription.planId = planId;
  DATA.subscription.billingCycle = APP.pendingCycle || 'yearly';
  // Set renews date = today + 1 month or + 1 year
  const d = new Date();
  if (DATA.subscription.billingCycle === 'yearly') d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  DATA.subscription.renewsOn = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  showToast(`You're on ${plan.name}`, 'check-circle');
  confetti();
  setTimeout(() => navigate('plans', { force: true }), 700);
}
function completeDowngrade() {
  const planId = APP.pendingPlanId;
  const plan = DATA.plans.find(p => p.id === planId);
  if (!plan) return;
  DATA.subscription.planId = planId;
  if (planId === 'free') {
    DATA.subscription.renewsOn = null;
  }
  showToast(`Switched to ${plan.name}`, 'check-circle');
  setTimeout(() => navigate('plans', { force: true }), 500);
}

// ============= TRAINER HANDLERS =============
function openTrainee(id) {
  const t = DATA.trainees.find(x => x.id === id);
  if (t) showToast(`Opening ${t.name} · coming soon`, 'user');
}
function completeAddTrainee() {
  const emailEl = document.getElementById('newTraineeEmail');
  const nameEl = document.getElementById('newTraineeName');
  const focusEl = document.getElementById('newTraineeFocus');
  const email = (emailEl && emailEl.value.trim()) || '';
  const name = (nameEl && nameEl.value.trim()) || (email ? email.split('@')[0] : 'New trainee');
  const focus = (focusEl && focusEl.value.trim()) || 'Getting started';
  if (!email) {
    showToast('Add an email address', 'x');
    return;
  }
  const id = 't' + (DATA.trainees.length + 1) + Date.now().toString(36).slice(-3);
  DATA.trainees.push({
    id, name,
    handle: '@' + name.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,10),
    color: ((DATA.trainees.length) % 7) + 1,
    focus,
    streak: 0,
    lastCheckIn: 'Invited · pending',
    status: 'on-track',
    weekProgress: { done: 0, target: 3 },
  });
  showToast(`Invite sent to ${email}`, 'send');
  setTimeout(() => navigate('trainerDashboard', { force: true }), 600);
}
function selectAssignCadence(btn, val) {
  const seg = document.getElementById('assignCadenceSeg');
  if (seg) seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const targetWrap = document.getElementById('assignTargetWrap');
  if (targetWrap) targetWrap.style.display = val === 'weekly' ? '' : 'none';
  APP.pendingAssignCadence = val;
}
function selectAssignTarget(btn, val) {
  const seg = document.getElementById('assignTargetSeg');
  if (seg) seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  APP.pendingAssignTarget = val;
}
function updateAssignCount() {
  const checks = document.querySelectorAll('.assign-trainee-chk:checked');
  const lbl = document.getElementById('assignCountLbl');
  if (lbl) lbl.textContent = `${checks.length} selected`;
}
function toggleAllTrainees(btn) {
  const all = document.querySelectorAll('.assign-trainee-chk');
  const anyUnchecked = Array.from(all).some(c => !c.checked);
  all.forEach(c => { c.checked = anyUnchecked; });
  btn.textContent = anyUnchecked ? 'Unselect all' : 'Select all';
  updateAssignCount();
}
function completeAssignGoal() {
  const titleEl = document.getElementById('assignTitle');
  const descEl = document.getElementById('assignDesc');
  const title = (titleEl && titleEl.value.trim()) || 'New goal';
  const cadence = APP.pendingAssignCadence || 'daily';
  const target = APP.pendingAssignTarget || 3;
  const picked = Array.from(document.querySelectorAll('.assign-trainee-chk:checked')).map(c => c.dataset.id);
  if (picked.length === 0) {
    showToast('Pick at least one trainee', 'x');
    return;
  }
  const id = 'tg' + (DATA.trainerGoals.length + 1) + Date.now().toString(36).slice(-3);
  DATA.trainerGoals.unshift({
    id, title, cadence, target, assignedTo: picked, created: 'Just now',
  });
  showToast(`Goal assigned to ${picked.length} trainee${picked.length === 1 ? '' : 's'}`, 'check-circle');
  confetti();
  setTimeout(() => navigate('trainerDashboard', { force: true }), 700);
}
