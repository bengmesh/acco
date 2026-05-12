// Mock data for acco prototype
const DATA = {
  user: {
    id: 'me',
    name: 'Ben Guerra',
    handle: '@benguerra',
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

  // ===== Connected health sources =====
  // Simulates Apple Health / Strava / wearable integrations. `connected` flips the UI state.
  healthSources: [
    { id: 'apple',    name: 'Apple Health', brand: 'apple',   color: '#ffffff', connected: true,  summary: 'Steps, workouts, sleep, heart rate' },
    { id: 'strava',   name: 'Strava',       brand: 'strava',  color: '#fc5200', connected: true,  summary: 'Runs, rides, workouts' },
    { id: 'whoop',    name: 'Whoop',        brand: 'whoop',   color: '#e7e7e7', connected: false, summary: 'Recovery + strain' },
    { id: 'oura',     name: 'Oura Ring',    brand: 'oura',    color: '#a0c8ff', connected: false, summary: 'Sleep + readiness' },
    { id: 'garmin',   name: 'Garmin',       brand: 'garmin',  color: '#007cc3', connected: false, summary: 'Activity + training load' },
    { id: 'mfp',      name: 'MyFitnessPal', brand: 'mfp',     color: '#005daa', connected: false, summary: 'Nutrition + macros' },
    { id: 'calendar', name: 'Calendar',     brand: 'calendar',color: '#4285f4', connected: false, summary: 'Auto-schedule from workouts you block' },
  ],

  // ===== Public challenges =====
  challenges: [
    {
      id: 'c1',
      title: 'April 30-Day Run Streak',
      tag: 'Running',
      desc: 'Run at least 1 mile every day in April. No buddy required — join solo, we’ll match you with a cohort.',
      participants: 8421,
      endsIn: '7 days',
      daysIn: 23,
      daysTotal: 30,
      joined: true,
      reward: 'Finisher badge + 500 points',
      featured: true,
      topParticipants: ['b1', 'b3', 'b5']
    },
    {
      id: 'c2',
      title: 'Morning Mindful — 21 Days',
      tag: 'Mindfulness',
      desc: '10 minutes of meditation before 9am for 21 days. Great for starting a daily practice.',
      participants: 2140,
      endsIn: 'Starts Monday',
      daysIn: 0,
      daysTotal: 21,
      joined: false,
      reward: 'Mindful badge + 250 points',
      topParticipants: ['b3', 'b4']
    },
    {
      id: 'c3',
      title: 'Squat Century',
      tag: 'Strength',
      desc: '100 bodyweight squats a day for 14 days. Takes under 4 minutes.',
      participants: 3602,
      endsIn: '3 days left to join',
      daysIn: 0,
      daysTotal: 14,
      joined: false,
      reward: 'Centurion badge + 300 points',
      topParticipants: ['b2', 'b6']
    },
    {
      id: 'c4',
      title: 'No Added Sugar — Weekdays',
      tag: 'Nutrition',
      desc: 'Clean eating Monday through Friday for 4 weeks. Weekends are yours.',
      participants: 1287,
      endsIn: 'Rolling — start anytime',
      daysIn: 0,
      daysTotal: 20,
      joined: false,
      reward: 'Clean Plate badge + 200 points',
      topParticipants: ['b4']
    },
  ],

  // ===== Groups / squads =====
  groups: [
    {
      id: 'gr1',
      name: 'Morning Runners Houston',
      icon: 'activity',
      tint: 'primary',
      city: 'Houston, TX',
      memberCount: 18,
      groupStreak: 42,
      focus: 'Running · 5am meetups',
      description: 'Houstonians who run before sunrise. Hop on the group chat for meetup spots.',
      privacy: 'public',
      members: ['me', 'b1', 'b3', 'b5', 'b6'],
      joined: true,
      requested: false,
      activity: [
        { actor: 'b1', text: 'logged a 6am run — 4.2 miles at Memorial Park', time: '1h ago' },
        { actor: 'b5', text: 'posted a route for Saturday: Buffalo Bayou loop, 8mi', time: '3h ago' },
        { actor: 'b3', text: 'crushed hill repeats and shared her splits', time: 'Yesterday' },
      ],
    },
    {
      id: 'gr2',
      name: 'Dad Fit Collective',
      icon: 'dumbbell',
      tint: 'warm',
      city: '— Global',
      memberCount: 126,
      groupStreak: 91,
      focus: 'Strength · 3x/week',
      description: 'Busy dads keeping each other strong. Kids-welcome workout videos encouraged.',
      privacy: 'public',
      members: ['b2', 'b4', 'b6'],
      joined: false,
      requested: false,
      activity: [
        { actor: 'b2', text: 'hit a deadlift PR: 315lb × 3', time: '2h ago' },
        { actor: 'b4', text: 'shared a 20-min garage circuit', time: 'Yesterday' },
      ],
    },
    {
      id: 'gr3',
      name: 'Calm Squad',
      icon: 'brain',
      tint: 'cool',
      city: '— Global',
      memberCount: 67,
      groupStreak: 128,
      focus: 'Meditation · Daily',
      description: 'Mindfulness practitioners of all levels. Weekly guided session every Sunday.',
      privacy: 'private',
      members: ['b3'],
      joined: false,
      requested: false,
      activity: [
        { actor: 'b3', text: 'finished day 52 of her meditation streak', time: '4h ago' },
      ],
    },
    {
      id: 'gr4',
      coachName: 'Coach Leila Park',
      coachLed: true,
      name: 'Sub-3 Marathon Club',
      icon: 'footprints',
      tint: 'warm',
      city: '— Invite only',
      memberCount: 24,
      groupStreak: 73,
      focus: 'Marathon · Sub-3:00 pace',
      description: 'Serious marathoners chasing a sub-3 hour finish. Approval by an admin after you share a recent race time.',
      privacy: 'private',
      members: ['b4', 'b5'],
      joined: false,
      requested: false,
      activity: [
        { actor: 'b4', text: 'logged a 20-mile progression run at 6:35/mi average', time: 'Yesterday' },
        { actor: 'b5', text: 'posted a Berlin Marathon training plan', time: '2d ago' },
      ],
    },
  ],

  // ===== Auto-detected activity (from connected sources) =====
  detectedActivity: [
    { id: 'da1', source: 'apple',  sourceLabel: 'Apple Health', type: 'Outdoor Run', value: '5.2 mi', duration: '48 min', time: 'This morning, 6:12am', matchedGoal: 'g1' },
    { id: 'da2', source: 'strava', sourceLabel: 'Strava',       type: 'Morning Run', value: '5.2 mi', duration: '48 min', time: 'This morning, 6:12am', matchedGoal: 'g1' },
    { id: 'da3', source: 'apple',  sourceLabel: 'Apple Health', type: 'Mindful Minutes', value: '12 min', duration: '12 min', time: 'This morning, 5:48am', matchedGoal: 'g2' },
  ],

  // ===== Nearby / matched buddies =====
  nearbyBuddies: [
    { id: 'nb1', name: 'Rosa Patel',    handle: '@rosapatel',  color: 2, distance: '1.2 mi away', focus: 'Running · 3x/wk', mutual: 3 },
    { id: 'nb2', name: 'Kai Johansson', handle: '@kaij',       color: 4, distance: 'Same zip',    focus: 'Meditation daily',  mutual: 1 },
    { id: 'nb3', name: 'Devin Ortiz',   handle: '@devinortiz', color: 5, distance: '3.4 mi away', focus: 'Strength 4x/wk',    mutual: 2 },
  ],

  goalTemplates: [
    { icon: 'activity',   label: 'Run regularly',      desc: '3x per week' },
    { icon: 'brain',      label: 'Daily meditation',   desc: '10 minutes' },
    { icon: 'dumbbell',   label: 'Strength training',  desc: '4x per week' },
    { icon: 'leaf',       label: 'Clean eating',       desc: 'No processed food' },
    { icon: 'droplet',    label: 'Hydration goal',     desc: '8 cups / day' },
    { icon: 'moon',       label: 'Sleep 8 hours',      desc: 'By 10:30pm' },
    { icon: 'footprints', label: '10k steps daily',    desc: 'Every day' },
    { icon: 'edit',       label: 'Custom goal',        desc: 'Design your own' },
  ],

  // ===== Plans catalog =====
  plans: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'Get consistent with friends',
      priceMonthly: 0,
      priceYearly: 0,
      icon: 'heart',
      tint: 'muted',
      features: [
        { ok: true,  text: 'Up to 5 active goals' },
        { ok: true,  text: 'Up to 10 accountability buddies' },
        { ok: true,  text: 'Daily check-ins + streaks' },
        { ok: true,  text: 'Join public groups' },
        { ok: false, text: 'Private groups & invite links' },
        { ok: false, text: 'Advanced insights' },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Unlock the full experience',
      priceMonthly: 8,
      priceYearly: 72,
      icon: 'sparkles',
      tint: 'primary',
      popular: true,
      features: [
        { ok: true, text: 'Unlimited goals & buddies' },
        { ok: true, text: 'Create private groups' },
        { ok: true, text: 'Advanced insights & trends' },
        { ok: true, text: 'Priority support' },
        { ok: true, text: 'Early access to new features' },
      ],
    },
    {
      id: 'trainer',
      name: 'Trainer',
      tagline: 'Coach clients and teams',
      priceMonthly: 24,
      priceYearly: 216,
      icon: 'award',
      tint: 'warm',
      features: [
        { ok: true, text: 'Everything in Pro' },
        { ok: true, text: 'Up to 50 trainees' },
        { ok: true, text: 'Assign goals & check-in cadence' },
        { ok: true, text: 'Coach-led groups with your branding' },
        { ok: true, text: 'Trainee progress dashboard' },
        { ok: true, text: 'Bulk messaging & nudges' },
      ],
    },
  ],

  // Current plan state (user can upgrade/downgrade in-app)
  subscription: {
    planId: 'free',        // 'free' | 'pro' | 'trainer'
    billingCycle: 'yearly', // 'monthly' | 'yearly' — preview only while on Free
    renewsOn: null,         // ISO-ish date when paid plan renews
    since: 'March 2025',
  },

  // ===== Trainer roster (used when user is on Trainer plan) =====
  trainees: [
    { id: 't1', name: 'Alex Romano',    handle: '@alexr',     color: 2, focus: 'Half-marathon · Oct',      streak: 14, lastCheckIn: '2h ago',       status: 'on-track',   weekProgress: { done: 2, target: 3 } },
    { id: 't2', name: 'Priya Desai',    handle: '@priyad',    color: 4, focus: 'Strength 4x/wk',           streak: 9,  lastCheckIn: 'Yesterday',    status: 'on-track',   weekProgress: { done: 3, target: 4 } },
    { id: 't3', name: 'Marco Lopez',    handle: '@marcol',    color: 5, focus: 'Lose 20 lbs · 16wk',       streak: 0,  lastCheckIn: '3 days ago',   status: 'needs-nudge', weekProgress: { done: 0, target: 5 } },
    { id: 't4', name: 'Kim Anderson',   handle: '@kima',      color: 6, focus: 'Yoga daily',               streak: 41, lastCheckIn: '25m ago',      status: 'crushing',   weekProgress: { done: 7, target: 7 } },
    { id: 't5', name: 'Jordan Hughes',  handle: '@jhughes',   color: 7, focus: 'Sub-25 5k · 8wk',          streak: 6,  lastCheckIn: 'This morning', status: 'on-track',   weekProgress: { done: 2, target: 3 } },
  ],

  // Goals a trainer has assigned. Prototype-only.
  trainerGoals: [
    { id: 'tg1', title: 'Run 3x per week',   cadence: 'weekly', target: 3, assignedTo: ['t1','t5'],      created: '2 weeks ago' },
    { id: 'tg2', title: 'Strength 4x/week',  cadence: 'weekly', target: 4, assignedTo: ['t2'],            created: '3 weeks ago' },
    { id: 'tg3', title: 'Daily yoga flow',   cadence: 'daily',  target: 1, assignedTo: ['t4'],            created: '6 weeks ago' },
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
