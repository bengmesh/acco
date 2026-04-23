// Mock data for acco prototype
const DATA = {
  user: {
    id: 'me',
    name: 'Ben Taylor',
    handle: '@bentaylor',
    bio: 'Building consistency one day at a time. Dad of two, weekend trail runner.',
    avatar: null,
    avatarColor: 1,
    location: 'Houston, TX',
    joined: 'March 2025',
    // commitment streak = consecutive scheduled check-in windows kept (not calendar days)
    stats: { streak: 18, streakUnit: 'check-ins', goalsActive: 3, goalsCompleted: 12, points: 2840, buddies: 14 }
  },

  buddies: [
    { id: 'b1', name: 'Maya Chen',      handle: '@mayaruns',     color: 2, streak: 34, status: 'Checked in · 2h ago', lastGoal: 'Run 25mi this week', online: true },
    { id: 'b2', name: 'Derek Wallace',  handle: '@derekstrong',  color: 3, streak: 7,  status: 'Missed check-in yesterday', lastGoal: 'Lift 4x/week', online: false },
    { id: 'b3', name: 'Priya Shah',     handle: '@priyafit',     color: 4, streak: 52, status: 'Hit 52-day streak', lastGoal: 'Yoga + meditation daily', online: true },
    { id: 'b4', name: 'Marcus Okafor',  handle: '@marcuso',      color: 5, streak: 12, status: 'Needs a boost today', lastGoal: 'Drop 15 lbs by July', online: false },
    { id: 'b5', name: 'Jess Lindqvist', handle: '@jessl',        color: 6, streak: 21, status: 'Checked in · 30m ago', lastGoal: 'Swim 3x/week', online: true },
    { id: 'b6', name: 'Ethan Rivera',   handle: '@ethanr',       color: 7, streak: 4,  status: 'Just started a new goal', lastGoal: 'Walk 8k steps daily', online: true },
  ],

  // Cadence model:
  //   daily  — scheduled every day (streak unit = days)
  //   weekly — hit N times per week, any days (streak unit = weeks)
  //   days   — scheduled on specific weekdays (streak unit = scheduled days)
  // weekProgress.done / target applies to weekly goals (resets Monday).
  // dueToday flags whether today contributes to this goal's streak.
  goals: [
    {
      id: 'g1',
      title: 'Run 3x per week',
      desc: 'Build to a half-marathon by October',
      category: 'Cardio',
      cadence: { type: 'weekly', target: 3 },
      progress: 72,
      daysLeft: 42,
      streak: 6,              // 6 weeks in a row hitting 3 runs
      streakUnit: 'weeks',
      weekProgress: { done: 2, target: 3 },
      dueToday: true,         // flexible — can choose to run today
      supporters: ['b1', 'b3', 'b5'],
      checkIns: 32,
      checkInsNeeded: 44,
      featured: true,
    },
    {
      id: 'g2',
      title: 'Meditate 10 min daily',
      desc: 'Morning routine before the kids wake',
      category: 'Mindfulness',
      cadence: { type: 'daily' },
      progress: 45,
      daysLeft: 28,
      streak: 9,
      streakUnit: 'days',
      dueToday: true,
      supporters: ['b3', 'b2'],
      checkIns: 14,
      checkInsNeeded: 30,
    },
    {
      id: 'g3',
      title: 'No added sugar — weekdays',
      desc: 'Monday through Friday, clean eating',
      category: 'Nutrition',
      cadence: { type: 'days', days: [1, 2, 3, 4, 5] }, // Mon-Fri
      progress: 88,
      daysLeft: 12,
      streak: 18,
      streakUnit: 'weekdays',
      dueToday: true,         // Thursday is a weekday
      supporters: ['b4', 'b6'],
      checkIns: 22,
      checkInsNeeded: 25,
    },
  ],

  activity: [
    { id: 'a1', actor: 'b1', type: 'checkin',   text: 'completed her morning run — 5.2 miles', time: '12 min ago', cheered: false, liked: true, goal: 'Run 25mi this week' },
    { id: 'a2', actor: 'b3', type: 'streak',    text: 'hit a <span class="accent">52-day</span> meditation streak', time: '1 hr ago', cheered: true, liked: false },
    { id: 'a3', actor: 'b5', type: 'checkin',   text: 'crushed a 2k swim session', time: '2 hr ago', cheered: false, liked: false, goal: 'Swim 3x/week' },
    { id: 'a4', actor: 'b2', type: 'struggle',  text: 'shared that he\'s struggling this week and could use support', time: '3 hr ago', cheered: false, liked: false, needsSupport: true },
    { id: 'a5', actor: 'b4', type: 'goal',      text: 'started a new goal — <strong>Walk 10k steps daily</strong>', time: '5 hr ago', cheered: false, liked: false },
    { id: 'a6', actor: 'b6', type: 'badge',     text: 'earned the <span class="accent">Early Riser</span> badge', time: 'Yesterday', cheered: true, liked: false },
    { id: 'a7', actor: 'b1', type: 'complete',  text: 'completed her 8-week goal — <strong>Stretch every morning</strong>', time: 'Yesterday', cheered: true, liked: true },
  ],

  notifications: [
    { id: 'n1', type: 'cheer',    icon: 'heart',    color: 'pink',   text: '<strong>Priya</strong> and <strong>Maya</strong> cheered your 18-day streak', time: '8 min ago', unread: true },
    { id: 'n2', type: 'buddy',    icon: 'user-plus', color: 'blue',  text: '<strong>Marcus Okafor</strong> accepted your buddy request', time: '2 hr ago', unread: true },
    { id: 'n3', type: 'reminder', icon: 'bell',    color: 'green',  text: '2 goals are due today — keep your 18 check-in streak alive', time: '4 hr ago', unread: true },
    { id: 'n4', type: 'badge',    icon: 'award',   color: 'green',  text: 'You earned the <strong>Consistent</strong> badge — 14 commitments kept in a row', time: 'Yesterday', unread: false },
    { id: 'n5', type: 'message',  icon: 'message-circle', color: 'blue', text: '<strong>Derek</strong> sent you encouragement: "Keep pushing — this week is yours"', time: 'Yesterday', unread: false },
    { id: 'n6', type: 'reminder', icon: 'bell',    color: 'orange', text: '<strong>Derek</strong> missed his check-in yesterday — maybe send a boost?', time: '2 days ago', unread: false },
  ],

  leaderboard: [
    { id: 'b3', name: 'Priya Shah',     color: 4, points: 4120, streak: 52, rank: 1 },
    { id: 'b1', name: 'Maya Chen',      color: 2, points: 3680, streak: 34, rank: 2 },
    { id: 'me', name: 'You',            color: 1, points: 2840, streak: 18, rank: 3, isYou: true, initials: 'BT' },
    { id: 'b5', name: 'Jess Lindqvist', color: 6, points: 2610, streak: 21, rank: 4 },
    { id: 'b6', name: 'Ethan Rivera',   color: 7, points: 1950, streak: 4,  rank: 5 },
    { id: 'b4', name: 'Marcus Okafor',  color: 5, points: 1720, streak: 12, rank: 6 },
    { id: 'b2', name: 'Derek Wallace',  color: 3, points: 1480, streak: 7,  rank: 7 },
  ],

  badges: [
    { id: 'bd1', name: 'First Step',    desc: 'Completed your first check-in', icon: 'flag',       earned: true },
    { id: 'bd2', name: 'Week One',      desc: '7-day streak',                  icon: 'calendar',   earned: true },
    { id: 'bd3', name: 'Consistent',    desc: '14-day streak',                 icon: 'trending-up', earned: true },
    { id: 'bd4', name: 'Early Riser',   desc: '10 check-ins before 7am',       icon: 'sunrise',    earned: true },
    { id: 'bd5', name: 'Cheerleader',   desc: 'Cheered 25 buddies',            icon: 'megaphone',  earned: true },
    { id: 'bd6', name: 'Month Strong',  desc: '30-day streak',                 icon: 'award',      earned: false },
    { id: 'bd7', name: 'Goal Crusher',  desc: 'Completed 5 goals',             icon: 'target',     earned: false },
    { id: 'bd8', name: 'Pack Leader',   desc: 'Built a squad of 20 buddies',   icon: 'users',      earned: false },
  ],

  suggestions: [
    { id: 's1', name: 'Kira Nakamura',  handle: '@kirafit',    color: 2, mutual: 4, focus: 'Running, strength' },
    { id: 's2', name: 'Andre Delacroix',handle: '@andred',     color: 4, mutual: 2, focus: 'Cycling, nutrition' },
    { id: 's3', name: 'Lena Vollmer',   handle: '@lenav',      color: 6, mutual: 6, focus: 'Yoga, mindfulness' },
    { id: 's4', name: 'Tomás Rivera',   handle: '@tomasr',     color: 3, mutual: 1, focus: 'Climbing, hiking' },
  ],

  goalTemplates: [
    { emoji: '🏃', label: 'Run regularly',        desc: '3x per week' },
    { emoji: '🧘', label: 'Daily meditation',     desc: '10 minutes' },
    { emoji: '💪', label: 'Strength training',    desc: '4x per week' },
    { emoji: '🥗', label: 'Clean eating',         desc: 'No processed food' },
    { emoji: '💧', label: 'Hydration goal',       desc: '8 cups / day' },
    { emoji: '😴', label: 'Sleep 8 hours',        desc: 'By 10:30pm' },
    { emoji: '🚶', label: '10k steps daily',      desc: 'Every day' },
    { emoji: '📝', label: 'Custom goal',          desc: 'Design your own' },
  ],
};

// Initials helper
function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function findBuddy(id) { return DATA.buddies.find(b => b.id === id) || DATA.user; }

// ===== Cadence helpers =====
// Describe a goal's cadence in human copy, e.g. "3x per week" / "Daily" / "Mon-Fri".
function cadenceLabel(g) {
  const c = g.cadence || { type: 'daily' };
  if (c.type === 'daily')  return 'Daily';
  if (c.type === 'weekly') return `${c.target}x per week`;
  if (c.type === 'days') {
    const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const d = (c.days || []).slice().sort();
    if (d.length === 5 && d.join(',') === '1,2,3,4,5') return 'Mon – Fri';
    if (d.length === 2 && d.join(',') === '0,6')       return 'Weekends';
    if (d.length === 7) return 'Daily';
    return d.map(i => names[i]).join(' · ');
  }
  return 'Daily';
}

// Is this goal scheduled to contribute to streak on the given date?
function isDueOn(g, date = new Date()) {
  const c = g.cadence || { type: 'daily' };
  if (c.type === 'daily')  return true;
  if (c.type === 'weekly') return (g.weekProgress?.done ?? 0) < (g.weekProgress?.target ?? c.target);
  if (c.type === 'days')   return (c.days || []).includes(date.getDay());
  return true;
}

// Goals that need a yes/no answer today (for the check-in prompt).
function goalsDueToday(date = new Date()) {
  return DATA.goals.filter(g => g.dueToday !== false && isDueOn(g, date));
}

// Human streak line for a single goal, e.g. "6-week streak", "9-day streak".
function streakLabel(g) {
  const n = g.streak;
  if (n <= 0) return 'No streak yet';
  const unit = g.streakUnit || 'days';
  if (unit === 'weeks')    return `${n}-week streak`;
  if (unit === 'weekdays') return `${n}-weekday streak`;
  return `${n}-day streak`;
}
