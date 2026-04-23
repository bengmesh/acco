// All screen renderers. Each returns an HTML string.
const SCREENS = {};

// ==================== LANDING ====================
const LANDING_BG_IMAGES = [
  'https://images.unsplash.com/photo-1652396506470-34aa317f7beb?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561570121-c8219daec12b?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516827003699-2880f453d93b?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1732889516368-4c7dc531417d?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613845205719-8c87760ab728?w=1200&q=80&auto=format&fit=crop'
];
SCREENS.landing = () => `
  <div class="screen-body no-padding" style="display:flex;flex-direction:column">
    ${statusBar()}
    <div class="landing">
      <div class="landing-bg" aria-hidden="true">
        ${LANDING_BG_IMAGES.map((u, i) => `<div class="landing-bg-slide" style="background-image:url('${u}');animation-delay:${i * 7 - 1}s"></div>`).join('')}
        <div class="landing-bg-overlay"></div>
      </div>
      <div class="landing-top">
        ${logo(true)}
      </div>
      <div class="landing-content anim-in">
        <h1>Goals get done<br/>with <em>people</em>.</h1>
        <p>acco is a fitness accountability network. Set your goals, invite your people, and show up together.</p>
        <div class="landing-actions">
          <button class="btn btn-primary btn-block" onclick="navigate('signup')">Create account</button>
          <button class="btn btn-secondary btn-block" onclick="navigate('login')">I already have an account</button>
        </div>
        <div class="landing-footer">By continuing you agree to our Terms and Privacy Policy.</div>
      </div>
    </div>
  </div>
`;

// ==================== SIGN UP ====================
SCREENS.signup = () => `
  ${statusBar()}
  ${header({ back: 'landing', simple: true })}
  <div class="screen-body">
    <div class="auth-form anim-in" style="padding-left:0;padding-right:0">
      <h2>Start your streak.</h2>
      <p class="lead">It takes a minute — and friends will cheer you on from day one.</p>

      <button class="social-btn" style="margin-bottom:var(--space-3)">${icon('apple')}<span>Continue with Apple</span></button>
      <button class="social-btn" style="margin-bottom:var(--space-3)">${icon('google')}<span>Continue with Google</span></button>
      <button class="social-btn">${icon('facebook')}<span>Continue with Facebook</span></button>

      <div class="divider-or">or sign up with email</div>

      <div class="field">
        <label class="field-label">Full name</label>
        <div class="input-icon">${icon('user')}<input class="input" type="text" placeholder="Ben Taylor" value="Ben Taylor"/></div>
      </div>
      <div class="field">
        <label class="field-label">Email</label>
        <div class="input-icon">${icon('mail')}<input class="input" type="email" placeholder="you@example.com" value="ben@meshcreative.co"/></div>
      </div>
      <div class="field">
        <label class="field-label">Password</label>
        <div class="input-icon">${icon('lock')}<input class="input" type="password" placeholder="At least 8 characters"/></div>
      </div>

      <button class="btn btn-primary btn-block mt-4" onclick="completeSignup()">Create account</button>

      <p class="text-center text-sm text-muted mt-4">
        Already have an account?
        <a href="#" onclick="navigate('login');return false">Log in</a>
      </p>
    </div>
  </div>
`;

// ==================== LOG IN ====================
SCREENS.login = () => `
  ${statusBar()}
  ${header({ back: 'landing', simple: true })}
  <div class="screen-body">
    <div class="auth-form anim-in" style="padding-left:0;padding-right:0">
      <h2>Welcome back.</h2>
      <p class="lead">Your squad's been checking in. Let's get you caught up.</p>

      <button class="social-btn" style="margin-bottom:var(--space-3)">${icon('apple')}<span>Continue with Apple</span></button>
      <button class="social-btn">${icon('google')}<span>Continue with Google</span></button>

      <div class="divider-or">or</div>

      <div class="field">
        <label class="field-label">Email</label>
        <div class="input-icon">${icon('mail')}<input class="input" type="email" placeholder="you@example.com"/></div>
      </div>
      <div class="field">
        <label class="field-label">Password</label>
        <div class="input-icon">${icon('lock')}<input class="input" type="password" placeholder="Your password"/></div>
      </div>

      <div class="row-between mb-4">
        <label class="row gap-2" style="cursor:pointer">
          <input type="checkbox" style="accent-color:var(--color-primary)"/>
          <span class="text-sm text-muted">Remember me</span>
        </label>
        <a href="#" onclick="navigate('forgot');return false" class="text-sm">Forgot?</a>
      </div>

      <button class="btn btn-primary btn-block" onclick="completeLogin()">Log in</button>

      <p class="text-center text-sm text-muted mt-4">
        New here? <a href="#" onclick="navigate('signup');return false">Create an account</a>
      </p>
    </div>
  </div>
`;

// ==================== FORGOT ====================
SCREENS.forgot = () => `
  ${statusBar()}
  ${header({ back: 'login', simple: true })}
  <div class="screen-body">
    <div class="auth-form anim-in" style="padding-left:0;padding-right:0">
      <h2>Reset password.</h2>
      <p class="lead">We'll send you a link to reset it. No sweat.</p>
      <div class="field">
        <label class="field-label">Email</label>
        <div class="input-icon">${icon('mail')}<input class="input" type="email" placeholder="you@example.com"/></div>
      </div>
      <button class="btn btn-primary btn-block" onclick="showToast('Reset link sent','mail');setTimeout(()=>navigate('login'),800)">Send reset link</button>
    </div>
  </div>
`;

// ==================== DASHBOARD ====================
SCREENS.dashboard = () => {
  const u = DATA.user;
  const hr = new Date().getHours();
  const greet = hr < 5 ? 'Late night,' : hr < 12 ? 'Good morning,' : hr < 18 ? 'Good afternoon,' : 'Good evening,';
  const dueGoals = goalsDueToday();
  const dueCount = dueGoals.length;
  const isRestDay = dueCount === 0;
  return `
    ${statusBar()}
    ${header({
      title: '',
      right: `
        <div class="row gap-2">
          <button class="icon-btn" onclick="navigate('notifications')" aria-label="Notifications">${icon('bell')}<span class="dot"></span></button>
          <button class="icon-btn" onclick="navigate('profile')" aria-label="Profile">${avatar(u, 'sm').replace('<div class="avatar avatar-sm"', '<div class="avatar avatar-sm" style="width:36px;height:36px"')}</button>
        </div>
      `,
      simple: true,
    })}
    <div class="screen-body with-tabbar anim-in">
      <div class="hero-greeting">${greet}<br/>${u.name.split(' ')[0]}.</div>
      <div class="hero-sub">${isRestDay
        ? `Rest day. You're still on an ${u.stats.streak}-check-in streak — nothing due today.`
        : `You're on an ${u.stats.streak}-check-in streak. ${dueCount} ${dueCount === 1 ? 'goal needs' : 'goals need'} you today.`}</div>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-num"><span class="accent">${u.stats.streak}</span></div>
          <div class="stat-lbl">Check-in streak</div>
        </div>
        <div class="stat">
          <div class="stat-num">${u.stats.goalsActive}</div>
          <div class="stat-lbl">Active goals</div>
        </div>
        <div class="stat">
          <div class="stat-num">${u.stats.points.toLocaleString()}</div>
          <div class="stat-lbl">Points</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <h3>Today</h3>
        </div>
        ${isRestDay ? `
          <div class="card row gap-4" style="align-items:center">
            <div class="icon-tile icon-tile-lg icon-tile-round" style="background:var(--color-surface-3);color:var(--color-text-muted)">${icon('moon')}</div>
            <div class="flex-1">
              <div class="fw-600">Nothing scheduled today</div>
              <div class="text-xs text-muted mt-1">Your streak is safe — rest is part of the plan.</div>
            </div>
          </div>
        ` : alreadyCheckedInToday() ? `
          <div class="card row gap-4" style="align-items:center;background:linear-gradient(135deg,rgba(198,242,78,0.14),rgba(198,242,78,0.03));border-color:rgba(198,242,78,0.35)">
            <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid" style="box-shadow:var(--glow-primary)">${icon('check-circle')}</div>
            <div class="flex-1">
              <div class="fw-600">Checked in for today</div>
              <div class="text-xs text-muted mt-1">${DATA.user.stats.streak}-check-in streak · Come back tomorrow</div>
            </div>
            <span style="color:var(--color-primary)">${icon('check')}</span>
          </div>
        ` : `
          <button class="card clickable" onclick="navigate('checkin')" style="width:100%;text-align:left;display:flex;align-items:center;gap:var(--space-4);background:linear-gradient(135deg,rgba(198,242,78,0.12),rgba(198,242,78,0.03));border-color:rgba(198,242,78,0.25)">
            <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid" style="box-shadow:var(--glow-primary)">${icon('check')}</div>
            <div class="flex-1">
              <div class="fw-600">Check in for today</div>
              <div class="text-xs text-muted mt-1">${dueCount} ${dueCount === 1 ? 'goal needs' : 'goals need'} a yes/no from you</div>
            </div>
            <span style="color:var(--color-primary)">${icon('chevron-right')}</span>
          </button>
        `}
      </div>

      <div class="section">
        <div class="section-title">
          <h3>Your goals</h3>
          <a href="#" onclick="navigate('goals');return false">See all</a>
        </div>
        <div class="col gap-3">
          ${DATA.goals.map(goalCard).join('')}
        </div>
      </div>

      ${DATA.detectedActivity.length ? `
        <div class="section">
          <div class="section-title"><h3>Auto-detected</h3><a href="#" onclick="navigate('integrations');return false">Sources</a></div>
          <div class="card card-detected">
            <div class="row gap-3" style="align-items:flex-start">
              <div class="source-chip" data-brand="${DATA.detectedActivity[0].source}">${icon(DATA.detectedActivity[0].source === 'strava' ? 'strava' : 'apple')}</div>
              <div class="flex-1" style="min-width:0">
                <div class="fw-600 text-sm">${DATA.detectedActivity[0].sourceLabel} saw your ${DATA.detectedActivity[0].value} ${DATA.detectedActivity[0].type.toLowerCase()}</div>
                <div class="text-xs text-muted mt-1">${DATA.detectedActivity[0].time}. Count it toward <span style="color:var(--color-primary)">${(DATA.goals.find(x=>x.id===DATA.detectedActivity[0].matchedGoal)||{}).title||'your goal'}</span>?</div>
              </div>
            </div>
            <div class="row gap-2 mt-4">
              <button class="btn btn-primary btn-sm flex-1" onclick="acceptDetected(this)">${icon('check')}<span>Yes, log it</span></button>
              <button class="btn btn-ghost btn-sm" onclick="dismissDetected(this)">Dismiss</button>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="section">
        <div class="section-title"><h3>Featured challenge</h3><a href="#" onclick="navigate('challenges');return false">All</a></div>
        ${(() => { const c = DATA.challenges.find(x => x.featured) || DATA.challenges[0]; return challengeCard(c, true); })()}
      </div>

      <div class="section">
        <div class="section-title"><h3>Your groups</h3><a href="#" onclick="navigate('groups');return false">See all</a></div>
        <div class="row gap-3" style="overflow-x:auto;padding-bottom:8px;margin:0 calc(var(--space-5) * -1);padding-left:var(--space-5);padding-right:var(--space-5)">
          ${DATA.groups.filter(g => g.joined).concat(DATA.groups.filter(g => !g.joined).slice(0,2)).map(g => `
            <button class="group-chip clickable" onclick="openGroup('${g.id}')">
              <div class="group-icon group-icon-${g.tint || 'primary'}">${icon(g.icon)}</div>
              <div class="fw-600 text-sm mt-2">${g.name}</div>
              <div class="group-meta mt-1">
                <span class="group-meta-chip" style="color:var(--color-text-muted)"><span class="group-meta-ico">${icon('users')}</span>${g.memberCount}</span>
                <span class="group-meta-chip" style="color:var(--color-warning);font-weight:600"><span class="group-meta-ico">${icon('flame')}</span>${g.groupStreak}d</span>
              </div>
              ${g.joined ? '<span class="badge badge-success" style="margin-top:auto">Joined</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>People near you</h3><a href="#" onclick="navigate('nearby');return false">See all</a></div>
        <div class="col gap-2">
          ${DATA.nearbyBuddies.slice(0,2).map(b => `
            <div class="card row gap-3" style="align-items:center;padding:var(--space-3) var(--space-4)">
              ${avatar(b)}
              <div class="flex-1" style="min-width:0">
                <div class="fw-600 text-sm">${b.name}</div>
                <div class="text-xs text-muted mt-1">${b.focus} · ${b.distance}</div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="sendBuddyRequest(this, '${b.name}')">${icon('user-plus')}<span>Add</span></button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <h3>Your squad's activity</h3>
          <a href="#" onclick="navigate('feed');return false">Full feed</a>
        </div>
        <div class="card" style="padding:0 var(--space-5)">
          ${DATA.activity.slice(0, 3).map(activityItem).join('')}
        </div>
      </div>
    </div>
    ${tabbar('dashboard')}
  `;
};

// ==================== CHECK-IN ====================
SCREENS.checkin = () => {
  const due = goalsDueToday();
  const dateLine = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  if (alreadyCheckedInToday()) {
    return `
    ${statusBar()}
    ${header({ back: 'dashboard', simple: true })}
    <div class="screen-body anim-in">
      <div class="card text-center" style="padding:var(--space-6);margin-top:var(--space-6);background:linear-gradient(135deg,rgba(198,242,78,0.14),rgba(198,242,78,0.03));border-color:rgba(198,242,78,0.35)">
        <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid" style="margin:0 auto var(--space-4);box-shadow:var(--glow-primary)">${icon('check-circle')}</div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">You're all set for today</h2>
        <p class="text-muted text-sm" style="margin-bottom:var(--space-5)">${dateLine}<br/>${DATA.user.stats.streak}-check-in streak · Come back tomorrow to keep it going.</p>
        <button class="btn btn-primary btn-block" onclick="navigate('dashboard')">
          ${icon('arrow-left')}<span>Back to dashboard</span>
        </button>
      </div>
    </div>
    `;
  }
  return `
  ${statusBar()}
  ${header({ back: 'dashboard', simple: true, right: `<div class="text-xs text-muted">Step 1 of 3</div>` })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">Check in</h2>
    <p class="text-muted text-sm mb-6">${dateLine} · Keep your ${DATA.user.stats.streak}-check-in streak alive.</p>

    <div class="section" style="margin-top:0">
      <div class="section-title"><h3>How did today go?</h3></div>
      <div class="mood-grid">
        <button class="mood-btn" onclick="selectMood(this,1)" aria-label="Rough">${icon('frown')}<span class="mood-label">Rough</span></button>
        <button class="mood-btn" onclick="selectMood(this,2)" aria-label="Meh">${icon('meh')}<span class="mood-label">Meh</span></button>
        <button class="mood-btn selected" onclick="selectMood(this,3)" aria-label="Okay">${icon('smile')}<span class="mood-label">Okay</span></button>
        <button class="mood-btn" onclick="selectMood(this,4)" aria-label="Good">${icon('heart')}<span class="mood-label">Good</span></button>
        <button class="mood-btn" onclick="selectMood(this,5)" aria-label="Crushed it">${icon('flame')}<span class="mood-label">Crushed</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-title"><h3>Energy level</h3></div>
      <div class="slider-wrap">
        <input type="range" class="slider" min="1" max="10" value="7" oninput="this.nextElementSibling.querySelector('.val').textContent=this.value"/>
        <div class="slider-labels"><span>Depleted</span><span class="val" style="color:var(--color-primary);font-weight:600">7</span><span>Peak</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title"><h3>Goals due today</h3></div>
      ${due.length === 0 ? `
        <div class="card text-center" style="padding:var(--space-5)">
          <div class="icon-tile icon-tile-lg icon-tile-round" style="background:var(--color-surface-3);color:var(--color-text-muted);margin:0 auto var(--space-3)">${icon('moon')}</div>
          <div class="fw-600">No goals scheduled today</div>
          <div class="text-xs text-muted mt-1">Your streak is safe. Log your mood if you want a record.</div>
        </div>
      ` : `
        <div class="col gap-3">
          ${due.map(g => {
            const sub = g.cadence?.type === 'weekly'
              ? `${cadenceLabel(g)} · ${g.weekProgress?.done ?? 0} of ${g.weekProgress?.target ?? g.cadence.target} this week`
              : `${g.category} · ${cadenceLabel(g)}`;
            return `
              <div class="card card-compact row gap-3">
                <div class="flex-1">
                  <div class="fw-600 text-sm">${g.title}</div>
                  <div class="text-xs text-muted mt-1">${sub}</div>
                </div>
                <div class="segmented" style="--cols:2">
                  <button class="active" onclick="toggleSeg(this)">Yes</button>
                  <button onclick="toggleSeg(this)">No</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        ${DATA.goals.length > due.length ? `
          <div class="text-xs text-muted mt-3" style="text-align:center">
            ${DATA.goals.length - due.length} ${DATA.goals.length - due.length === 1 ? 'goal is' : 'goals are'} resting today — not part of today's check-in.
          </div>
        ` : ''}
      `}
    </div>

    <div class="section">
      <div class="section-title"><h3>Note for your buddies <span style="font-weight:400;color:var(--color-text-faint);text-transform:none;letter-spacing:0">(optional)</span></h3></div>
      <textarea class="textarea" placeholder="What's on your mind? What worked, what didn't..."></textarea>
    </div>

    <div class="mt-6">
      <button class="btn btn-primary btn-block" onclick="completeCheckIn()">
        ${icon('check-circle')}<span>Complete check-in</span>
      </button>
      <button class="btn btn-ghost btn-block mt-2" onclick="navigate('dashboard')">Skip for now</button>
    </div>
  </div>
  `;
};

// ==================== GOALS LIST ====================
SCREENS.goals = () => `
  ${statusBar()}
  ${header({
    title: 'Goals',
    subtitle: `${DATA.goals.length} active`,
    right: `<button class="icon-btn" onclick="navigate('create-goal')" aria-label="New goal">${icon('plus')}</button>`
  })}
  <div class="screen-body with-tabbar anim-in">
    <div class="segmented mb-4" style="--cols:3">
      <button class="active">Active</button>
      <button onclick="navigate('goal-history')">Completed</button>
      <button onclick="navigate('goal-history')">Paused</button>
    </div>
    <div class="col gap-3">
      ${DATA.goals.map(goalCard).join('')}
    </div>

    <button class="card clickable mt-4" onclick="navigate('create-goal')" style="width:100%;border-style:dashed;text-align:center;color:var(--color-text-muted);padding:var(--space-6)">
      ${icon('plus')}
      <div class="fw-600 mt-2">Add another goal</div>
      <div class="text-xs mt-1">Free plan: up to 5 active goals</div>
    </button>
  </div>
  ${tabbar('dashboard')}
`;

// ==================== GOAL HISTORY ====================
SCREENS.goalHistory = () => `
  ${statusBar()}
  ${header({ title: 'Goal history', back: 'goals' })}
  <div class="screen-body anim-in">
    <div class="section-title"><h3>Completed · 12</h3></div>
    <div class="col gap-3">
      ${[
        { title: 'Stretch every morning', desc: 'Completed 8-week goal', when: 'Apr 15', streak: 56 },
        { title: 'No soda for 30 days',   desc: 'Completed', when: 'Mar 30', streak: 30 },
        { title: 'Read 20 min/night',     desc: 'Completed 6-week goal', when: 'Mar 02', streak: 42 },
        { title: 'Walk after dinner',     desc: 'Completed', when: 'Feb 14', streak: 28 },
      ].map(g => `
        <div class="card row gap-3">
          <div class="icon-tile icon-tile-md icon-tile-round icon-tile-success-dim">${icon('check')}</div>
          <div class="flex-1">
            <div class="fw-600 text-sm">${g.title}</div>
            <div class="text-xs text-muted mt-1">${g.desc} · ${g.when}</div>
          </div>
          <div class="text-xs" style="color:var(--color-warning);display:inline-flex;align-items:center;gap:4px">${icon('flame')}${g.streak}</div>
        </div>
      `).join('')}
    </div>
  </div>
`;

// ==================== CREATE GOAL ====================
SCREENS.createGoal = () => `
  ${statusBar()}
  ${header({ back: 'goals', simple: true, right: `<div class="text-xs text-muted">Step 1 of 3</div>` })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">What's the goal?</h2>
    <p class="text-muted text-sm mb-6">Pick a template or create your own.</p>

    <div class="col gap-3">
      ${DATA.goalTemplates.map(t => `
        <button class="card clickable row gap-3" style="width:100%;text-align:left;align-items:center" onclick="navigate('create-goal-2')">
          <div class="icon-tile icon-tile-md" style="background:var(--color-surface-3);color:var(--color-text);border:1px solid var(--color-border)">${icon(t.icon)}</div>
          <div class="flex-1">
            <div class="fw-600 text-sm">${t.label}</div>
            <div class="text-xs text-muted mt-1">${t.desc}</div>
          </div>
          <span style="color:var(--color-text-faint)">${icon('chevron-right')}</span>
        </button>
      `).join('')}
    </div>
  </div>
`;

SCREENS.createGoal2 = () => `
  ${statusBar()}
  ${header({ back: 'create-goal', simple: true, right: `<div class="text-xs text-muted">Step 2 of 3</div>` })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">Shape it up.</h2>
    <p class="text-muted text-sm mb-6">The more specific, the easier to check in on.</p>

    <div class="field">
      <label class="field-label">Goal name</label>
      <input class="input" value="Run 3x per week" />
    </div>
    <div class="field">
      <label class="field-label">Description</label>
      <textarea class="textarea" placeholder="Why this goal, and what does success look like?">Build up to a half-marathon by October.</textarea>
    </div>
    <div class="field">
      <label class="field-label">Cadence</label>
      <div class="segmented" style="--cols:4">
        <button>Daily</button>
        <button class="active">3x / week</button>
        <button>Mon–Fri</button>
        <button>Custom</button>
      </div>
      <div class="text-xs text-muted mt-2">Your streak tracks the cadence you set. Off days don't break it.</div>
    </div>
    <div class="row gap-3">
      <div class="field flex-1">
        <label class="field-label">Start</label>
        <input class="input" value="Apr 24, 2026" />
      </div>
      <div class="field flex-1">
        <label class="field-label">End</label>
        <input class="input" value="Jun 05, 2026" />
      </div>
    </div>

    <div class="field">
      <label class="field-label">Visibility</label>
      <div class="segmented" style="--cols:3">
        <button class="active">Buddies</button>
        <button>Public</button>
        <button>Private</button>
      </div>
    </div>

    <button class="btn btn-primary btn-block mt-4" onclick="navigate('create-goal-3')">Next — invite partners</button>
  </div>
`;

SCREENS.createGoal3 = () => `
  ${statusBar()}
  ${header({ back: 'create-goal-2', simple: true, right: `<div class="text-xs text-muted">Step 3 of 3</div>` })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">Pick your crew.</h2>
    <p class="text-muted text-sm mb-6">These people will see your progress and can cheer you on.</p>

    <div class="input-icon mb-4">
      ${icon('search')}
      <input class="input" placeholder="Search buddies..." />
    </div>

    <div class="col gap-2">
      ${DATA.buddies.map(b => `
        <label class="card row gap-3" style="cursor:pointer;padding:var(--space-3)">
          ${avatar(b)}
          <div class="flex-1">
            <div class="fw-600 text-sm">${b.name}</div>
            <div class="text-xs text-muted">${b.handle}</div>
          </div>
          <input type="checkbox" style="width:22px;height:22px;accent-color:var(--color-primary)" ${['b1','b3','b5'].includes(b.id)?'checked':''}/>
        </label>
      `).join('')}
    </div>

    <button class="btn btn-primary btn-block mt-6" onclick="completeCreateGoal()">
      ${icon('check-circle')}<span>Create goal</span>
    </button>
    <button class="btn btn-ghost btn-block mt-2" onclick="completeCreateGoal(true)">Skip — just me</button>
  </div>
`;

// ==================== GOAL DETAIL ====================
SCREENS.goalDetail = () => {
  const g = DATA.goals.find(x => x.id === APP.currentGoalId) || DATA.goals[0];
  return `
    ${statusBar()}
    ${header({ back: 'goals', simple: true, right: `<button class="icon-btn" aria-label="More">${icon('more')}</button>` })}
    <div class="screen-body anim-in">
      <div class="row gap-2" style="flex-wrap:wrap">
        <span class="badge badge-primary">${g.category}</span>
        <span class="badge">${cadenceLabel(g)}</span>
      </div>
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-3);line-height:1.1">${g.title}</h2>
      <p class="text-muted text-sm mt-2">${g.desc}</p>

      <div class="row gap-5 mt-6" style="align-items:center">
        ${progressRing(g.progress, 104)}
        <div class="col gap-3 flex-1" style="min-width:0">
          <div>
            <div style="font-family:var(--font-display);font-size:20px;font-weight:600;letter-spacing:-0.02em;color:var(--color-warning);display:inline-flex;align-items:center;gap:6px;white-space:nowrap"><span style="width:20px;height:20px;display:inline-flex;flex-shrink:0">${icon('flame')}</span>${streakLabel(g)}</div>
            <div class="text-xs text-muted">Current streak</div>
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:20px;font-weight:600;letter-spacing:-0.02em">${g.checkIns}/${g.checkInsNeeded}</div>
            <div class="text-xs text-muted">Check-ins</div>
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:20px;font-weight:600;letter-spacing:-0.02em">${g.daysLeft}</div>
            <div class="text-xs text-muted">Days remaining</div>
          </div>
        </div>
      </div>

      ${g.cadence?.type === 'weekly' ? weekProgress(g) : ''}

      <button class="btn btn-primary btn-block mt-6" onclick="navigate('checkin')">
        ${icon('check-circle')}<span>${isDueOn(g) ? 'Check in for today' : 'Log a ' + g.category.toLowerCase() + ' session'}</span>
      </button>

      <div class="section">
        <div class="section-title"><h3>Supporters · ${g.supporters.length}</h3><a href="#" onclick="navigate('add-partners');return false">Add more</a></div>
        <div class="card" style="padding:var(--space-3)">
          <div class="col gap-1">
            ${g.supporters.map(id => {
              const b = findBuddy(id);
              return `
                <div class="list-row" style="padding:var(--space-2)">
                  ${avatar(b)}
                  <div class="list-row-main">
                    <div class="list-row-title text-sm">${b.name}</div>
                    <div class="list-row-sub">Cheered you ${Math.floor(Math.random()*8)+2}x this week</div>
                  </div>
                  <button class="btn btn-sm btn-secondary" onclick="openEncouragement('${b.id}')">${icon('message-circle')}</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Recent activity</h3></div>
        <div class="col gap-2">
          ${[
            {day:'Today', done:null, note:'Pending check-in'},
            {day:'Yesterday', done:true, note:'Ran 5.2 miles, felt great'},
            {day:'Tuesday', done:true, note:'Easy recovery run'},
            {day:'Monday', done:false, note:'Skipped — meetings ran long'},
            {day:'Sunday', done:true, note:'Long run — 8 miles'},
          ].map(d => `
            <div class="list-row" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3)">
              <div style="width:36px;height:36px;border-radius:var(--radius-full);display:grid;place-items:center;flex-shrink:0;${d.done===null?'background:var(--color-surface-3);color:var(--color-text-faint)':d.done?'background:var(--color-success-dim);color:var(--color-success)':'background:var(--color-danger-dim);color:var(--color-danger)'}">
                ${d.done===null?icon('clock'):d.done?icon('check'):icon('x')}
              </div>
              <div class="list-row-main">
                <div class="list-row-title text-sm">${d.day}</div>
                <div class="list-row-sub">${d.note}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

// ==================== BUDDIES ====================
SCREENS.buddies = () => `
  ${statusBar()}
  ${header({
    title: 'Buddies',
    subtitle: `${DATA.buddies.length} in your circle`,
    right: `<button class="icon-btn" onclick="navigate('add-partners')" aria-label="Add buddy">${icon('user-plus')}</button>`
  })}
  <div class="screen-body with-tabbar anim-in">
    <div class="input-icon mb-4">
      ${icon('search')}
      <input class="input" placeholder="Search your buddies..." />
    </div>

    <button class="card clickable mb-5" onclick="navigate('nearby')" style="width:100%;text-align:left;display:flex;align-items:center;gap:var(--space-4);background:linear-gradient(135deg,rgba(198,242,78,0.10),rgba(198,242,78,0.02));border-color:rgba(198,242,78,0.22)">
      <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid">${icon('map-pin')}</div>
      <div class="flex-1">
        <div class="fw-600">People near you</div>
        <div class="text-xs text-muted mt-1">${DATA.nearbyBuddies.length} runners and lifters within 5 miles</div>
      </div>
      <span style="color:var(--color-primary)">${icon('chevron-right')}</span>
    </button>

    <div class="section-title"><h3>Online now</h3></div>
    <div class="col gap-2 mb-6">
      ${DATA.buddies.filter(b => b.online).map(buddyRow).join('')}
    </div>

    <div class="section-title"><h3>All buddies</h3></div>
    <div class="col gap-2">
      ${DATA.buddies.filter(b => !b.online).map(buddyRow).join('')}
    </div>
  </div>
  ${tabbar('buddies')}
`;

// ==================== ADD PARTNERS ====================
SCREENS.addPartners = () => `
  ${statusBar()}
  ${header({ title: 'Add buddies', back: 'buddies' })}
  <div class="screen-body anim-in">
    <div class="input-icon mb-4">
      ${icon('search')}
      <input class="input" placeholder="Search by name or @handle" />
    </div>

    <div class="segmented mb-4" style="--cols:3">
      <button class="active">Suggested</button>
      <button>Contacts</button>
      <button>Invite</button>
    </div>

    <div class="section-title"><h3>People who share your goals</h3></div>
    <div class="col gap-2">
      ${DATA.suggestions.map(s => `
        <div class="list-row" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4)">
          ${avatar(s)}
          <div class="list-row-main">
            <div class="list-row-title text-sm">${s.name}</div>
            <div class="list-row-sub">${s.focus} · ${s.mutual} mutual</div>
          </div>
          <button class="btn btn-sm btn-primary" onclick="sendBuddyRequest(this, '${s.name}')">${icon('user-plus')}<span>Add</span></button>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title"><h3>Invite someone new</h3></div>
      <div class="card">
        <p class="text-sm text-muted mb-4">Share your invite link — they'll join as your buddy automatically.</p>
        <div class="row gap-2">
          <input class="input flex-1" value="acco.fit/join/ben-taylor" readonly style="font-size:var(--text-xs)"/>
          <button class="btn btn-secondary btn-sm" onclick="showToast('Link copied','check')">Copy</button>
        </div>
        <button class="btn btn-primary btn-block mt-3">${icon('share')}<span>Share invite</span></button>
      </div>
    </div>
  </div>
`;

// ==================== BUDDY DETAIL ====================
SCREENS.buddyDetail = () => {
  const b = DATA.buddies.find(x => x.id === APP.currentBuddyId) || DATA.buddies[0];
  return `
    ${statusBar()}
    ${header({ back: 'buddies', simple: true, right: `<button class="icon-btn" aria-label="More">${icon('more')}</button>` })}
    <div class="screen-body anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-4) 0">
        ${avatar(b, 'xl').replace('<div class="avatar avatar-xl"', '<div class="avatar avatar-xl avatar-ring"')}
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-4)">${b.name}</h2>
        <div class="text-muted text-sm mt-1">${b.handle}</div>
        <div class="row gap-2 mt-3">
          ${b.online?'<span class="badge badge-success">● Online</span>':''}
          <span class="badge" style="color:var(--color-warning)">${icon('flame')}<span>${b.streak}-day streak</span></span>
        </div>
      </div>

      <div class="row gap-2 mt-4">
        <button class="btn btn-primary flex-1" onclick="openEncouragement('${b.id}')">${icon('send')}<span>Encourage</span></button>
        <button class="btn btn-secondary flex-1">${icon('message-circle')}<span>Message</span></button>
      </div>

      <div class="section">
        <div class="section-title"><h3>Their goals</h3></div>
        <div class="card">
          <div class="list-row" style="padding:var(--space-2)">
            <div class="icon-tile icon-tile-round icon-tile-primary-dim" style="width:36px;height:36px">${icon('target')}</div>
            <div class="list-row-main">
              <div class="list-row-title text-sm">${b.lastGoal}</div>
              <div class="list-row-sub">68% complete · 12 days left</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Recent check-ins</h3></div>
        <div class="card" style="padding:0 var(--space-5)">
          ${DATA.activity.filter(a => a.actor === b.id).slice(0, 3).map(activityItem).join('')}
          ${DATA.activity.filter(a => a.actor === b.id).length === 0 ? '<p class="text-muted text-sm" style="padding:var(--space-4) 0">No recent activity.</p>' : ''}
        </div>
      </div>

      <div class="section">
        <div class="col gap-2">
          <button class="btn btn-secondary btn-block">${icon('bell')}<span>Mute notifications</span></button>
          <button class="btn btn-danger btn-block">${icon('x')}<span>Remove buddy</span></button>
        </div>
      </div>
    </div>
  `;
};

// ==================== ENCOURAGEMENT ====================
SCREENS.encouragement = () => {
  const b = DATA.buddies.find(x => x.id === APP.currentBuddyId) || DATA.buddies[0];
  const presets = [
    "You've got this — keep going.",
    "Proud of you. One day at a time.",
    "This week's tough, but you're tougher.",
    "Remember why you started.",
    "Showing up is the whole game.",
  ];
  return `
    ${statusBar()}
    ${header({ back: 'buddies', simple: true })}
    <div class="screen-body anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-4) 0 var(--space-6)">
        ${avatar(b, 'lg')}
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-3)">Send ${b.name.split(' ')[0]} a boost</h2>
        <p class="text-muted text-sm mt-2" style="max-width:30ch">Quick notes are great. Specific notes are better.</p>
      </div>

      <div class="section-title"><h3>Quick send</h3></div>
      <div class="col gap-2 mb-6">
        ${presets.map(p => `<button class="card clickable" style="text-align:left;padding:var(--space-3) var(--space-4);font-size:var(--text-sm)" onclick="quickSend(this, '${p}')">"${p}"</button>`).join('')}
      </div>

      <div class="section-title"><h3>Custom message</h3></div>
      <textarea class="textarea" placeholder="Write a personal note..." id="encouragementNote"></textarea>

      <button class="btn btn-primary btn-block mt-4" onclick="sendEncouragement()">
        ${icon('send')}<span>Send encouragement</span>
      </button>
    </div>
  `;
};

// ==================== LEADERBOARD ====================
SCREENS.leaderboard = () => `
  ${statusBar()}
  ${header({ title: 'Leaderboard', subtitle: 'Your buddy circle' })}
  <div class="screen-body with-tabbar anim-in">
    <div class="segmented mb-4" style="--cols:3">
      <button class="active">This week</button>
      <button>This month</button>
      <button>All time</button>
    </div>

    <!-- Top 3 podium -->
    <div class="row gap-2 mb-6" style="align-items:flex-end;justify-content:center;padding:var(--space-4) 0">
      ${[DATA.leaderboard[1], DATA.leaderboard[0], DATA.leaderboard[2]].map((p, i) => {
        const heights = [100, 130, 80];
        const medals = ['2', '1', '3'];
        const colors = ['#D4D4E0', '#FFD84A', '#E8A16A'];
        return `
          <div class="col" style="align-items:center;gap:var(--space-2);flex:1;max-width:100px">
            ${avatar(p, i === 1 ? 'lg' : '').replace('<div class="avatar', `<div class="avatar ${i===1?'avatar-ring':''}"`).replace('<div class="avatar ', '<div class="avatar ')}
            <div class="fw-600 text-sm truncate" style="width:100%;text-align:center">${p.name.split(' ')[0]}</div>
            <div style="font-family:var(--font-display);font-weight:600;color:var(--color-primary);font-size:var(--text-lg);letter-spacing:-0.02em">${p.points.toLocaleString()}</div>
            <div style="width:100%;height:${heights[i]}px;background:linear-gradient(180deg,${colors[i]}33, ${colors[i]}11);border:1px solid ${colors[i]}44;border-radius:var(--radius-md) var(--radius-md) 0 0;display:grid;place-items:center;font-family:var(--font-display);font-size:28px;font-weight:600;color:${colors[i]};letter-spacing:-0.03em">${medals[i]}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="col gap-1">
      ${DATA.leaderboard.slice(3).map(p => `
        <div class="leader-row ${p.isYou?'you':''}">
          <div class="leader-rank">${p.rank}</div>
          ${avatar(p)}
          <div class="leader-info">
            <div class="leader-name">${p.name}</div>
            <div class="leader-meta">${icon('flame').replace('<svg', '<svg style="display:inline;width:11px;height:11px;vertical-align:-1px"')} ${p.streak}-day streak</div>
          </div>
          <div class="leader-points">${p.points.toLocaleString()}</div>
        </div>
      `).join('')}
    </div>

    <div class="card mt-6">
      <div class="row gap-3">
        <div class="icon-tile icon-tile-md icon-tile-round icon-tile-primary-dim">${icon('trending-up')}</div>
        <div class="flex-1">
          <div class="fw-600 text-sm">You moved up 2 spots this week</div>
          <div class="text-xs text-muted mt-1">Keep your streak going to catch Maya.</div>
        </div>
      </div>
    </div>
  </div>
  ${tabbar('leaderboard')}
`;

// ==================== NOTIFICATIONS ====================
SCREENS.notifications = () => `
  ${statusBar()}
  ${header({
    title: 'Notifications',
    back: 'dashboard',
    right: `<button class="icon-btn" onclick="navigate('notification-settings')" aria-label="Settings">${icon('settings')}</button>`
  })}
  <div class="screen-body anim-in">
    <div class="segmented mb-4" style="--cols:3">
      <button class="active">All</button>
      <button>Unread</button>
      <button>Mentions</button>
    </div>
    <div class="col">
      ${DATA.notifications.map(n => `
        <div class="notif-item ${n.unread?'unread':''}">
          <div class="notif-icon ${n.color}">${icon(n.icon)}</div>
          <div class="notif-body">
            <div class="notif-text">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="empty-state" style="padding-top:var(--space-8)">
      <p style="font-size:var(--text-xs);display:inline-flex;align-items:center;gap:6px;justify-content:center">You're all caught up <span class="inline-check">${icon('check')}</span></p>
    </div>
  </div>
`;

// ==================== NOTIFICATION SETTINGS ====================
SCREENS.notificationSettings = () => {
  const toggle = (id, on) => `
    <label style="display:inline-flex;align-items:center;cursor:pointer">
      <input type="checkbox" ${on?'checked':''} style="display:none" onchange="this.parentElement.querySelector('span.sw').classList.toggle('on', this.checked)"/>
      <span class="sw ${on?'on':''}" style="width:44px;height:26px;background:var(--color-surface-3);border-radius:999px;position:relative;transition:all 200ms"><span style="position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all 200ms"></span></span>
    </label>`;
  const row = (label, desc, on = true) => `
    <div class="list-row" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4)">
      <div class="list-row-main">
        <div class="list-row-title text-sm">${label}</div>
        <div class="list-row-sub">${desc}</div>
      </div>
      ${toggle(label, on)}
    </div>`;
  return `
    <style>.sw.on { background: var(--color-primary) !important; } .sw.on > span { left: 21px !important; }</style>
    ${statusBar()}
    ${header({ title: 'Notifications', back: 'notifications' })}
    <div class="screen-body anim-in">
      <div class="section-title"><h3>Daily</h3></div>
      <div class="col gap-2 mb-6">
        ${row('Check-in reminder', 'Nudge me if I haven\'t checked in by evening', true)}
        ${row('Streak at risk', 'Warn me 2 hours before I lose my streak', true)}
      </div>
      <div class="section-title"><h3>Social</h3></div>
      <div class="col gap-2 mb-6">
        ${row('Cheers and likes', 'When buddies react to my activity', true)}
        ${row('Encouragement messages', 'Personal notes from buddies', true)}
        ${row('Buddy requests', 'When someone wants to be your buddy', true)}
        ${row('Buddy check-ins', 'When buddies complete their daily check-in', false)}
      </div>
      <div class="section-title"><h3>Achievements</h3></div>
      <div class="col gap-2">
        ${row('Badges earned', 'Celebrate new badges', true)}
        ${row('Leaderboard updates', 'Weekly rank changes', true)}
        ${row('Marketing emails', 'Product updates and tips', false)}
      </div>
    </div>
  `;
};

// ==================== PROFILE ====================
SCREENS.profile = () => {
  const u = DATA.user;
  return `
    ${statusBar()}
    ${header({
      title: 'Profile',
      right: `<button class="icon-btn" onclick="navigate('settings')" aria-label="Settings">${icon('settings')}</button>`
    })}
    <div class="screen-body with-tabbar anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-4) 0">
        <div style="position:relative">
          ${avatar(u, 'xl').replace('avatar-xl"', 'avatar-xl avatar-ring"')}
          <button class="icon-btn" onclick="navigate('editProfile')" style="position:absolute;bottom:0;right:-4px;width:32px;height:32px;background:var(--color-primary);color:var(--color-text-inverse);border:3px solid var(--color-bg)" aria-label="Edit avatar">${icon('edit')}</button>
        </div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-4)">${u.name}</h2>
        <div class="text-muted text-sm mt-1">${u.handle}${(u.visibility?.showLocation ?? true) && u.location ? ` · ${u.location}` : ''}</div>
        <p class="text-sm text-muted mt-3" style="max-width:32ch">${u.bio}</p>
        <div class="row gap-2 mt-4">
          <button class="btn btn-secondary btn-sm" onclick="navigate('editProfile')">${icon('edit')}<span>Edit profile</span></button>
          <button class="btn btn-secondary btn-sm" onclick="navigate('share-profile')">${icon('share')}<span>Share</span></button>
        </div>
      </div>

      <div class="stat-row">
        <div class="stat" title="Scheduled check-ins kept in a row — rest days don't break it">
          <div class="stat-num"><span class="accent">${u.stats.streak}</span></div>
          <div class="stat-lbl">Check-in streak</div>
        </div>
        <div class="stat">
          <div class="stat-num">${u.stats.goalsCompleted}</div>
          <div class="stat-lbl">Completed</div>
        </div>
        <div class="stat">
          <div class="stat-num">${u.stats.buddies}</div>
          <div class="stat-lbl">Buddies</div>
        </div>
      </div>

      ${DATA.subscription.planId === 'trainer' ? `
      <div class="card mt-4" style="padding:var(--space-4);background:linear-gradient(135deg,rgba(255,154,86,0.10),rgba(255,154,86,0.02));border-color:rgba(255,154,86,0.28);cursor:pointer" onclick="navigate('trainerDashboard')">
        <div class="row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-lg group-icon-warm" style="border-radius:var(--radius-md)">${icon('award')}</div>
          <div class="flex-1" style="min-width:0">
            <div class="fw-600">Trainer dashboard</div>
            <div class="text-xs text-muted mt-1">${DATA.trainees.length} trainees · ${DATA.trainerGoals.length} active goals</div>
          </div>
          <span style="width:18px;height:18px;display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;color:var(--text-muted)">${icon('chevron-right')}</span>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="section-title"><h3>Badges</h3><a href="#" onclick="navigate('badges');return false">See all</a></div>
        <div class="row gap-3" style="overflow-x:auto;padding-bottom:8px">
          ${DATA.badges.filter(b=>b.earned).map(b=>`
            <div class="col" style="align-items:center;text-align:center;flex-shrink:0;width:88px">
              <div class="icon-tile icon-tile-2xl icon-tile-primary">${icon(b.icon)}</div>
              <div class="text-xs fw-600 mt-2" style="white-space:nowrap">${b.name}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Active goals</h3></div>
        <div class="col gap-3">
          ${DATA.goals.slice(0,2).map(goalCard).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Recent activity</h3></div>
        <div class="card" style="padding:0 var(--space-5)">
          ${[
            {text:'completed a 5.2 mile run', time:'12 min ago'},
            {text:'hit an <span class="accent">18-day</span> streak', time:'2 hr ago'},
            {text:'checked in for <strong>No added sugar</strong>', time:'Yesterday'},
          ].map(a => `
            <div class="activity-item">
              ${avatar(u)}
              <div class="activity-body">
                <div class="activity-text"><strong>You</strong> ${a.text}</div>
                <div class="activity-time">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    ${tabbar('profile')}
  `;
};

// ==================== SETTINGS ====================
SCREENS.settings = () => `
  ${statusBar()}
  ${header({ title: 'Settings', back: 'profile' })}
  <div class="screen-body anim-in">
    <div class="section-title"><h3>Account</h3></div>
    <div class="col gap-2 mb-6">
      ${navRow('user', 'Edit profile', '', "navigate('editProfile')")}
      ${navRow('mail', 'Email', DATA.user.email || 'ben@meshcreative.co', "navigate('accountEmail')")}
      ${navRow('lock', 'Password', '', "navigate('accountPassword')")}
      ${navRow('shield', 'Privacy', '', "navigate('accountPrivacy')")}
      ${navRow('sparkles', 'Plan', (DATA.plans.find(p => p.id === DATA.subscription.planId) || {}).name || 'Free', "navigate('plans')")}
    </div>

    <div class="section-title"><h3>App</h3></div>
    <div class="col gap-2 mb-6">
      ${navRow('bell', 'Notifications', '', "navigate('notification-settings')")}
      ${navRow('moon', 'Appearance', (DATA.user.appearance ? DATA.user.appearance.charAt(0).toUpperCase() + DATA.user.appearance.slice(1) : 'Dark'), "navigate('appearance')")}
      ${navRow('target', 'Goal preferences', '', "navigate('goalPreferences')")}
    </div>

    <div class="section-title"><h3>Support</h3></div>
    <div class="col gap-2 mb-6">
      ${navRow('help-circle', 'Help center', '', "navigate('helpCenter')")}
      ${navRow('message-circle', 'Contact support', '', "navigate('contactSupport')")}
      ${navRow('share', 'Rate the app', '', "showToast('Thanks for the love','heart-filled')")}
    </div>

    <button class="btn btn-secondary btn-block" onclick="logOut()">${icon('log-out')}<span>Log out</span></button>
    <button class="btn btn-ghost btn-block mt-2" onclick="confirmDeleteAccount()" style="color:var(--color-danger)">Delete account</button>
  </div>
`;

// ==================== FEED ====================
SCREENS.feed = () => `
  ${statusBar()}
  ${header({ title: 'Activity', subtitle: 'Your squad, this week' })}
  <div class="screen-body with-tabbar anim-in">
    <div class="segmented mb-4" style="--cols:3">
      <button class="active">All</button>
      <button>Check-ins</button>
      <button>Milestones</button>
    </div>
    <div class="card" style="padding:0 var(--space-5)">
      ${DATA.activity.map(activityItem).join('')}
    </div>
  </div>
  ${tabbar('buddies')}
`;

// ==================== BADGES ====================
SCREENS.badges = () => `
  ${statusBar()}
  ${header({ title: 'Badge gallery', back: 'profile', subtitle: `${DATA.badges.filter(b=>b.earned).length} of ${DATA.badges.length} earned` })}
  <div class="screen-body anim-in">
    <div class="card" style="background:linear-gradient(135deg,var(--color-primary-dim),rgba(198,242,78,0.02));border-color:rgba(198,242,78,0.25);margin-bottom:var(--space-6)">
      <div class="row gap-3">
        <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid">${icon('award')}</div>
        <div class="flex-1">
          <div class="fw-600">Next badge: Month Strong</div>
          <div class="text-xs text-muted mt-1">12 more days to go</div>
          <div class="progress mt-2"><div class="progress-bar" style="width:60%"></div></div>
        </div>
      </div>
    </div>

    <div class="section-title"><h3>Earned</h3></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-bottom:var(--space-6)">
      ${DATA.badges.filter(b=>b.earned).map(b=>`
        <div class="card text-center" style="padding:var(--space-4) var(--space-2)">
          <div class="icon-tile icon-tile-xl icon-tile-primary" style="margin:0 auto var(--space-3)">${icon(b.icon)}</div>
          <div class="text-xs fw-600">${b.name}</div>
          <div class="text-xs text-faint mt-1" style="line-height:1.3">${b.desc}</div>
        </div>
      `).join('')}
    </div>

    <div class="section-title"><h3>Locked</h3></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3)">
      ${DATA.badges.filter(b=>!b.earned).map(b=>`
        <div class="card text-center" style="padding:var(--space-4) var(--space-2);opacity:0.5">
          <div class="icon-tile icon-tile-xl icon-tile-muted" style="margin:0 auto var(--space-3)">${icon('lock')}</div>
          <div class="text-xs fw-600">${b.name}</div>
          <div class="text-xs text-faint mt-1" style="line-height:1.3">${b.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
`;


// ==================== INTEGRATIONS (Health sources) ====================
SCREENS.integrations = () => {
  const connected = DATA.healthSources.filter(s => s.connected);
  const available = DATA.healthSources.filter(s => !s.connected);
  const row = (s) => `
    <div class="source-row">
      <div class="source-brand" data-brand="${s.brand}">${icon(s.brand === 'strava' ? 'strava' : s.brand === 'apple' ? 'apple' : 'activity')}</div>
      <div class="flex-1" style="min-width:0">
        <div class="fw-600 text-sm">${s.name}</div>
        <div class="text-xs text-muted mt-1">${s.summary}</div>
      </div>
      <button class="btn btn-sm ${s.connected ? 'btn-secondary' : 'btn-primary'}" onclick="toggleSource('${s.id}', this)">
        ${s.connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  `;
  return `
    ${statusBar()}
    ${header({ title: 'Integrations', subtitle: 'Auto-log activity from your apps', back: 'dashboard' })}
    <div class="screen-body anim-in">
      <div class="card" style="background:linear-gradient(135deg,rgba(198,242,78,0.10),rgba(198,242,78,0.02));border-color:rgba(198,242,78,0.22)">
        <div class="row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid">${icon('sparkles')}</div>
          <div class="flex-1">
            <div class="fw-600">Auto-detect your workouts</div>
            <div class="text-xs text-muted mt-1">We'll match activity to your goals so you don't have to log manually.</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Connected · ${connected.length}</h3></div>
        <div class="col gap-2">${connected.map(row).join('') || '<div class="text-sm text-muted">No sources connected yet.</div>'}</div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Available</h3></div>
        <div class="col gap-2">${available.map(row).join('')}</div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Recently detected</h3></div>
        <div class="card" style="padding:0">
          ${DATA.detectedActivity.map(d => {
            const g = DATA.goals.find(x => x.id === d.matchedGoal);
            return `
              <div class="detected-row">
                <div class="source-chip" data-brand="${d.source}">${icon(d.source === 'strava' ? 'strava' : d.source === 'apple' ? 'apple' : 'activity')}</div>
                <div class="flex-1" style="min-width:0">
                  <div class="fw-600 text-sm">${d.type} · ${d.value}</div>
                  <div class="text-xs text-muted mt-1">${d.sourceLabel} · ${d.time}${g ? ` · Matched to <span style="color:var(--color-primary)">${g.title}</span>` : ''}</div>
                </div>
                <button class="icon-btn" style="width:32px;height:32px" onclick="showToast('Refreshed', 'refresh')" aria-label="Refresh">${icon('refresh')}</button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
};

// ==================== CHALLENGES LIST ====================
SCREENS.challenges = () => {
  const joined = DATA.challenges.filter(c => c.joined);
  const discover = DATA.challenges.filter(c => !c.joined);
  return `
    ${statusBar()}
    ${header({ title: 'Challenges', subtitle: 'Public events · Solo or squad', back: 'dashboard' })}
    <div class="screen-body anim-in">
      ${joined.length ? `
        <div class="section" style="margin-top:0">
          <div class="section-title"><h3>You're in</h3></div>
          <div class="col gap-3">${joined.map(c => challengeCard(c, true)).join('')}</div>
        </div>
      ` : ''}

      <div class="section">
        <div class="section-title"><h3>Discover</h3><span class="text-xs text-muted">${discover.length} open</span></div>
        <div class="col gap-3">${discover.map(c => challengeCard(c, false)).join('')}</div>
      </div>
    </div>
  `;
};

function challengeCard(c, featured) {
  const pct = c.daysTotal ? Math.round((c.daysIn / c.daysTotal) * 100) : 0;
  return `
    <div class="card card-challenge clickable ${featured ? 'card-challenge-featured' : ''}" onclick="openChallenge('${c.id}')">
      <div class="row gap-2" style="flex-wrap:wrap">
        <span class="badge badge-primary">${c.tag}</span>
        ${c.joined ? `<span class="badge badge-success">Joined</span>` : ''}
        <span class="badge">${c.endsIn}</span>
      </div>
      <div class="fw-600 mt-3" style="font-size:var(--text-base);line-height:1.3">${c.title}</div>
      <div class="text-xs text-muted mt-1" style="line-height:1.5">${c.desc}</div>
      ${c.joined ? `
        <div class="challenge-progress">
          <div class="challenge-progress-bar"><div style="width:${pct}%"></div></div>
          <div class="text-xs text-muted mt-2">Day ${c.daysIn} of ${c.daysTotal} · ${pct}%</div>
        </div>
      ` : ''}
      <div class="row" style="justify-content:space-between;align-items:center;margin-top:var(--space-3)">
        <div class="row gap-2" style="align-items:center">
          <div class="avatar-stack">${(c.topParticipants || []).slice(0,3).map(id => avatar(findBuddy(id), 'sm')).join('')}</div>
          <span class="text-xs text-muted">${c.participants.toLocaleString()} in</span>
        </div>
        <span class="text-xs" style="color:var(--color-primary);display:inline-flex;align-items:center;gap:4px">${icon('award')}<span>${c.reward.split(' + ')[0]}</span></span>
      </div>
    </div>
  `;
}

// ==================== CHALLENGE DETAIL ====================
SCREENS.challengeDetail = () => {
  const c = DATA.challenges.find(x => x.id === APP.currentChallengeId) || DATA.challenges[0];
  const pct = c.daysTotal ? Math.round((c.daysIn / c.daysTotal) * 100) : 0;
  return `
    ${statusBar()}
    ${header({ back: 'challenges', simple: true, right: `<button class="icon-btn" aria-label="Share" onclick="showToast('Link copied', 'copy')">${icon('share')}</button>` })}
    <div class="screen-body anim-in">
      <div class="row gap-2" style="flex-wrap:wrap">
        <span class="badge badge-primary">${c.tag}</span>
        ${c.joined ? `<span class="badge badge-success">Joined</span>` : `<span class="badge">${c.endsIn}</span>`}
      </div>
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-3)">${c.title}</h2>
      <p class="text-sm text-muted mt-2">${c.desc}</p>

      ${c.joined ? `
        <div class="card mt-5">
          <div class="row" style="justify-content:space-between;align-items:baseline">
            <div class="fw-600">Your progress</div>
            <div class="text-sm" style="color:var(--color-primary);font-weight:600">${pct}%</div>
          </div>
          <div class="challenge-progress-bar mt-3"><div style="width:${pct}%"></div></div>
          <div class="text-xs text-muted mt-2">Day ${c.daysIn} of ${c.daysTotal} · ${c.daysTotal - c.daysIn} to go</div>
        </div>
      ` : ''}

      <div class="stat-row mt-5">
        <div class="stat">
          <div class="stat-num">${c.participants.toLocaleString()}</div>
          <div class="stat-lbl">Participants</div>
        </div>
        <div class="stat">
          <div class="stat-num">${c.daysTotal}</div>
          <div class="stat-lbl">Days</div>
        </div>
        <div class="stat">
          <div class="stat-num">${c.endsIn.replace(/ days?$/, '')}</div>
          <div class="stat-lbl">${c.joined ? 'Left' : 'Start'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Reward</h3></div>
        <div class="card row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid">${icon('award')}</div>
          <div class="flex-1">
            <div class="fw-600 text-sm">${c.reward}</div>
            <div class="text-xs text-muted mt-1">Unlocked after finishing</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Top participants</h3></div>
        <div class="col gap-2">
          ${(c.topParticipants || []).map((id, i) => {
            const b = findBuddy(id);
            return `
              <div class="list-row" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4)">
                <div class="fw-600" style="width:24px;text-align:center;color:var(--color-text-muted);font-size:var(--text-sm)">${i+1}</div>
                ${avatar(b, 'sm')}
                <div class="list-row-main">
                  <div class="list-row-title" style="font-size:var(--text-sm)">${b.name}</div>
                  <div class="list-row-sub">${b.streak}-day streak</div>
                </div>
                <span style="display:inline-flex;align-items:center;gap:4px;color:var(--color-warning);font-size:var(--text-xs);font-weight:600">${icon('flame')}<span>${b.streak}</span></span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="mt-6">
        ${c.joined
          ? `<button class="btn btn-secondary btn-block" onclick="showToast('You left the challenge', 'x')">Leave challenge</button>`
          : `<button class="btn btn-primary btn-block" onclick="joinChallenge('${c.id}')">${icon('plus')}<span>Join challenge</span></button>`}
      </div>
    </div>
  `;
};

// ==================== GROUPS LIST ====================
SCREENS.groups = () => {
  const joined = DATA.groups.filter(g => g.joined);
  const publicDiscover = DATA.groups.filter(g => !g.joined && g.privacy !== 'private');
  const privateDiscover = DATA.groups.filter(g => !g.joined && g.privacy === 'private');
  return `
    ${statusBar()}
    ${header({ title: 'Groups', subtitle: 'Small squads, shared accountability', back: 'dashboard' })}
    <div class="screen-body anim-in">
      ${joined.length ? `
        <div class="section" style="margin-top:0">
          <div class="section-title"><h3>Your groups</h3></div>
          <div class="col gap-3">${joined.map(groupCard).join('')}</div>
        </div>
      ` : ''}

      ${publicDiscover.length ? `
        <div class="section">
          <div class="section-title"><h3>Open to join</h3><span class="text-xs text-muted">${publicDiscover.length} public</span></div>
          <div class="col gap-3">${publicDiscover.map(groupCard).join('')}</div>
        </div>
      ` : ''}

      ${privateDiscover.length ? `
        <div class="section">
          <div class="section-title"><h3>Private · request to join</h3><span class="text-xs text-muted">${privateDiscover.length} private</span></div>
          <div class="col gap-3">${privateDiscover.map(groupCard).join('')}</div>
        </div>
      ` : ''}

      <button class="card clickable mt-4" style="width:100%;border-style:dashed;text-align:center;color:var(--color-text-muted);padding:var(--space-6)" onclick="navigate('create-group')">
        <div class="icon-tile icon-tile-lg icon-tile-round" style="background:var(--color-surface-3);color:var(--color-text-muted);margin:0 auto">${icon('plus')}</div>
        <div class="fw-600 mt-3">Start a group</div>
        <div class="text-xs mt-1">Invite friends or open it publicly</div>
      </button>
    </div>
  `;
};

function privacyChip(g, opts = {}) {
  const isPrivate = g.privacy === 'private';
  const ico = isPrivate ? 'lock' : 'globe';
  const label = isPrivate ? 'Private' : 'Public';
  const color = isPrivate ? 'var(--color-text-muted)' : 'var(--color-primary)';
  return `<span class="group-meta-chip" style="color:${color};font-weight:600"><span class="group-meta-ico">${icon(ico)}</span><span>${label}</span></span>`;
}

function groupCard(g) {
  const statusPill = g.joined
    ? `<span class="group-meta-chip" style="color:var(--color-primary);background:var(--color-primary-dim);font-weight:600"><span class="group-meta-ico">${icon('check')}</span><span>Joined</span></span>`
    : g.requested
      ? `<span class="group-meta-chip" style="color:var(--color-text-muted);font-weight:600"><span class="group-meta-ico">${icon('clock')}</span><span>Requested</span></span>`
      : '';
  return `
    <div class="card card-group clickable" onclick="openGroup('${g.id}')">
      <div class="row gap-3" style="align-items:flex-start">
        <div class="group-icon group-icon-${g.tint || 'primary'}">${icon(g.icon)}</div>
        <div class="flex-1" style="min-width:0">
          <div class="row gap-2" style="align-items:center">
            <div class="fw-600" style="font-size:var(--text-base);line-height:1.3">${g.name}</div>
            ${g.coachLed ? `<span class="coach-badge">${icon('award')}<span>Coach-led</span></span>` : ''}
          </div>
          <div class="text-xs text-muted mt-1">${g.focus}${g.coachName ? ' · with ' + g.coachName : ''}</div>
          <div class="group-meta mt-2">
            ${privacyChip(g)}
            <span class="group-meta-chip" style="color:var(--color-text-muted)"><span class="group-meta-ico">${icon('users')}</span><span>${g.memberCount}</span></span>
            <span class="group-meta-chip" style="color:var(--color-warning);font-weight:600"><span class="group-meta-ico">${icon('flame')}</span><span>${g.groupStreak}d</span></span>
            ${statusPill}
          </div>
        </div>
        <span style="color:var(--color-text-faint)">${icon('chevron-right')}</span>
      </div>
    </div>
  `;
}

// ==================== GROUP DETAIL ====================
SCREENS.groupDetail = () => {
  const g = DATA.groups.find(x => x.id === APP.currentGroupId) || DATA.groups[0];
  const memberObjs = g.members.map(id => id === 'me' ? DATA.user : findBuddy(id));
  return `
    ${statusBar()}
    ${header({ back: 'groups', simple: true, right: `<button class="icon-btn" aria-label="More" onclick="showToast('Invite link copied', 'copy')">${icon('share')}</button>` })}
    <div class="screen-body anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-3) 0">
        <div class="group-icon group-icon-xl group-icon-${g.tint || 'primary'}">${icon(g.icon)}</div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-3)">${g.name}</h2>
        <div class="row gap-2 mt-2" style="justify-content:center;flex-wrap:wrap">
          ${privacyChip(g)}
          <span class="group-meta-chip" style="color:var(--color-text-muted)"><span class="group-meta-ico">${icon('map-pin')}</span><span>${g.city.replace(/^—\s*/, '')}</span></span>
          ${g.coachLed ? `<span class="coach-badge">${icon('award')}<span>Coach-led</span></span>` : ''}
        </div>
        ${g.coachName ? `<div class="text-xs mt-2" style="color:#ff9a56">With ${g.coachName}</div>` : ''}
        <div class="text-muted text-sm mt-2">${g.focus}</div>
        <p class="text-sm text-muted mt-3" style="max-width:34ch">${g.description}</p>
        ${g.privacy === 'private' && !g.joined ? `
          <div class="text-xs mt-3" style="color:var(--color-text-muted);display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--color-border);border-radius:999px;background:var(--color-surface-2)">
            <span style="width:14px;height:14px;display:inline-flex;flex-shrink:0">${icon('lock')}</span><span>Admin approval needed to join</span>
          </div>
        ` : ''}
      </div>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-num">${g.memberCount}</div>
          <div class="stat-lbl">Members</div>
        </div>
        <div class="stat">
          <div class="stat-num"><span class="accent">${g.groupStreak}</span></div>
          <div class="stat-lbl">Group streak</div>
        </div>
        <div class="stat">
          <div class="stat-num">${g.activity.length}</div>
          <div class="stat-lbl">This week</div>
        </div>
      </div>

      ${g.privacy === 'private' && !g.joined ? `
        <div class="section">
          <div class="card text-center" style="padding:var(--space-5)">
            <div class="icon-tile icon-tile-lg icon-tile-round" style="background:var(--color-surface-3);color:var(--color-text-muted);margin:0 auto var(--space-3)">${icon('lock')}</div>
            <div class="fw-600">Members and activity are private</div>
            <div class="text-xs text-muted mt-1">Join this group to see who's in it and what they're up to.</div>
          </div>
        </div>
      ` : `
        <div class="section">
          <div class="section-title"><h3>Members</h3><a href="#" onclick="showToast('Full member list coming soon');return false">See all</a></div>
          <div class="row gap-3" style="overflow-x:auto;padding-bottom:8px">
            ${memberObjs.slice(0,8).map(m => `
              <div class="col" style="align-items:center;text-align:center;flex-shrink:0;width:64px">
                ${avatar(m)}
                <div class="text-xs fw-600 mt-2" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:64px">${m.name.split(' ')[0]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <div class="section-title"><h3>Group activity</h3></div>
          <div class="card" style="padding:0 var(--space-5)">
            ${g.activity.map(a => {
              const actor = findBuddy(a.actor);
              return `
                <div class="activity-item">
                  ${avatar(actor)}
                  <div class="activity-body">
                    <div class="activity-text"><strong>${actor.name}</strong> ${a.text}</div>
                    <div class="activity-time">${a.time}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `}

      <div class="mt-6">
        ${g.joined
          ? `<button class="btn btn-secondary btn-block" onclick="showToast('Left the group', 'x')">Leave group</button>`
          : g.privacy === 'private'
            ? (g.requested
                ? `<button class="btn btn-secondary btn-block" disabled style="opacity:0.7;cursor:default">${icon('clock')}<span>Request pending</span></button>`
                : `<button class="btn btn-primary btn-block" onclick="requestJoinGroup('${g.id}')">${icon('lock')}<span>Request to join</span></button>`)
            : `<button class="btn btn-primary btn-block" onclick="joinGroup('${g.id}')">${icon('plus')}<span>Join group</span></button>`}
      </div>
    </div>
  `;
};

// ==================== CREATE GROUP ====================
SCREENS.createGroup = () => `
  ${statusBar()}
  ${header({ back: 'groups', simple: true })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">Start a group</h2>
    <p class="text-muted text-sm mb-6">Invite friends or open it up publicly.</p>

    <div class="field">
      <label class="field-label">Group name</label>
      <input id="newGroupName" class="input" placeholder="Morning Runners Austin" />
    </div>

    <div class="field">
      <label class="field-label">Focus</label>
      <input id="newGroupFocus" class="input" placeholder="Running · 3x per week" />
    </div>

    <div class="field">
      <label class="field-label">Description</label>
      <textarea id="newGroupDesc" class="textarea" placeholder="What's this group about? What's expected?"></textarea>
    </div>

    <div class="field">
      <label class="field-label">Privacy</label>
      <div class="segmented" style="--cols:2" id="newGroupPrivacySeg">
        <button class="active" data-val="public" onclick="selectGroupPrivacy(this,'public')"><span style="width:16px;height:16px;display:inline-flex;flex-shrink:0;align-items:center;justify-content:center">${icon('globe')}</span><span style="margin-left:6px">Public</span></button>
        <button data-val="private" onclick="selectGroupPrivacy(this,'private')"><span style="width:16px;height:16px;display:inline-flex;flex-shrink:0;align-items:center;justify-content:center">${icon('lock')}</span><span style="margin-left:6px">Private</span></button>
      </div>
      <div id="newGroupPrivacyHelp" class="text-xs text-muted mt-2">Anyone can discover this group and join with one tap.</div>
    </div>

    <button class="btn btn-primary btn-block mt-4" onclick="completeCreateGroup()">${icon('plus')}<span>Create group</span></button>
    <button class="btn btn-ghost btn-block mt-2" onclick="navigate('groups')">Cancel</button>
  </div>
`;

// ==================== NEARBY / BUDDY MATCHMAKING ====================
SCREENS.nearby = () => {
  return `
    ${statusBar()}
    ${header({ title: 'People near you', subtitle: `${DATA.user.location}`, back: 'buddies' })}
    <div class="screen-body anim-in">
      <div class="card" style="background:linear-gradient(135deg,rgba(198,242,78,0.10),rgba(198,242,78,0.02));border-color:rgba(198,242,78,0.22)">
        <div class="row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid">${icon('map-pin')}</div>
          <div class="flex-1">
            <div class="fw-600">Matched by goals + location</div>
            <div class="text-xs text-muted mt-1">Same focus, close by. Better accountability.</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Nearby</h3><span class="text-xs text-muted">${DATA.nearbyBuddies.length} found</span></div>
        <div class="col gap-3">
          ${DATA.nearbyBuddies.map(b => `
            <div class="card row gap-3" style="align-items:center">
              ${avatar(b)}
              <div class="flex-1" style="min-width:0">
                <div class="fw-600 text-sm">${b.name}</div>
                <div class="text-xs text-muted mt-1">${b.focus}</div>
                <div class="row gap-3 mt-2" style="align-items:center">
                  <span class="text-xs" style="display:inline-flex;align-items:center;gap:4px;color:var(--color-text-muted)"><span class="group-meta-ico">${icon('map-pin')}</span><span>${b.distance}</span></span>
                  <span class="text-xs text-muted">${b.mutual} mutual</span>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="sendBuddyRequest(this, '${b.name}')">${icon('user-plus')}<span>Add</span></button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card text-center mt-4" style="padding:var(--space-5)">
        <div class="text-xs text-muted">Location is fuzzy — we never share your exact address.</div>
      </div>
    </div>
  `;
};

// ==================== SHARE PROFILE ====================
SCREENS.shareProfile = () => {
  const u = DATA.user;
  const url = `acco.fit/${u.handle.slice(1)}`;
  // Simple geometric QR-style placeholder
  const qrSize = 12;
  let cells = '';
  // Deterministic pseudo-random pattern based on handle
  const seed = u.handle.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let y = 0; y < qrSize; y++) {
    for (let x = 0; x < qrSize; x++) {
      const isFinderZone = (x < 3 && y < 3) || (x > qrSize - 4 && y < 3) || (x < 3 && y > qrSize - 4);
      const isFinderCell = (x === 0 || x === 2 || y === 0 || y === 2 || (x === 1 && y === 1))
        && ((x < 3 && y < 3) || (x > qrSize - 4 && y < 3) || (x < 3 && y > qrSize - 4));
      const on = isFinderZone ? isFinderCell : ((x * 37 + y * 59 + seed) % 7 < 3);
      if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1" fill="currentColor"/>`;
    }
  }
  return `
    ${statusBar()}
    ${header({ title: 'Share profile', back: 'profile' })}
    <div class="screen-body anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-4) 0">
        ${avatar(u, 'xl').replace('avatar-xl"', 'avatar-xl avatar-ring"')}
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-4)">${u.name}</h2>
        <div class="text-muted text-sm mt-1">${u.handle} · ${u.stats.streak}-day streak</div>
      </div>

      <div class="card col" style="align-items:center;padding:var(--space-6)">
        <div class="qr-frame">
          <svg viewBox="0 0 12 12" width="180" height="180" style="color:var(--color-text);shape-rendering:crispEdges">${cells}</svg>
        </div>
        <div class="text-xs text-muted mt-4">Scan to view profile</div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Your link</h3></div>
        <div class="card row gap-2" style="align-items:center;padding:var(--space-3) var(--space-4)">
          <div class="icon-tile icon-tile-md" style="background:var(--color-surface-3);color:var(--color-text-muted)">${icon('link')}</div>
          <div class="flex-1" style="min-width:0;font-family:var(--font-mono,monospace);font-size:var(--text-sm);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${url}</div>
          <button class="btn btn-primary btn-sm" onclick="copyShareLink(this, '${url}')">${icon('copy')}<span>Copy</span></button>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><h3>Share to</h3></div>
        <div class="col gap-2">
          ${navRow('message-circle', 'Send in message', '', `showToast('Opening messages','message-circle')`)}
          ${navRow('mail',            'Email',            '', `showToast('Opening mail','mail')`)}
          ${navRow('globe',           'Copy as text',     '', `copyShareLink(this, '${url}')`)}
        </div>
      </div>

      <div class="card text-center mt-4" style="padding:var(--space-5)">
        <div class="text-xs text-muted">Public profiles show your streak + badges, never your goals.</div>
      </div>
    </div>
  `;
};

// ==================== EDIT PROFILE ====================
// Reusable toggle widget
function settingsToggle(id, on) {
  return `
    <label class="sw-label" data-for="${id}" style="display:inline-flex;align-items:center;cursor:pointer">
      <input id="${id}" type="checkbox" ${on?'checked':''} style="display:none" onchange="this.parentElement.querySelector('span.sw').classList.toggle('on', this.checked)"/>
      <span class="sw ${on?'on':''}" style="width:44px;height:26px;background:var(--color-surface-3);border-radius:999px;position:relative;transition:all 200ms"><span style="position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all 200ms"></span></span>
    </label>`;
}
function toggleRow(id, label, desc, on = true) {
  return `
    <div class="list-row" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4)">
      <div class="list-row-main">
        <div class="list-row-title text-sm">${label}</div>
        ${desc ? `<div class="list-row-sub">${desc}</div>` : ''}
      </div>
      ${settingsToggle(id, on)}
    </div>`;
}

SCREENS.editProfile = () => {
  const u = DATA.user;
  return `
    <style>.sw.on { background: var(--color-primary) !important; } .sw.on > span { left: 21px !important; }</style>
    ${statusBar()}
    ${header({
      title: 'Edit profile',
      back: 'profile',
      right: `<button class="icon-btn" onclick="saveProfile()" aria-label="Save" style="color:var(--color-primary);font-weight:600;font-family:var(--font-body);font-size:var(--text-sm);width:auto;padding:0 10px">Save</button>`
    })}
    <div class="screen-body anim-in">
      <div class="col" style="align-items:center;text-align:center;padding:var(--space-2) 0 var(--space-5)">
        <div style="position:relative">
          ${avatar(u, 'xl').replace('avatar-xl"', 'avatar-xl avatar-ring"')}
          <button class="icon-btn" onclick="showToast('Photo picker coming soon','camera')" style="position:absolute;bottom:0;right:-4px;width:34px;height:34px;background:var(--color-primary);color:var(--color-text-inverse);border:3px solid var(--color-bg)" aria-label="Change photo">${icon('camera')}</button>
        </div>
        <button class="btn btn-ghost btn-sm mt-3" onclick="showToast('Photo picker coming soon','camera')" style="color:var(--color-primary)">Change photo</button>
      </div>

      <div class="auth-form" style="padding:0">
        <div class="field">
          <label class="field-label">Name</label>
          <div class="input-icon">${icon('user')}<input id="ep-name" class="input" type="text" value="${u.name}"/></div>
        </div>
        <div class="field">
          <label class="field-label">Username</label>
          <div class="input-icon">${icon('at-sign')}<input id="ep-handle" class="input" type="text" value="${u.handle.replace(/^@/, '')}"/></div>
          <div class="field-hint text-xs text-muted" style="margin-top:6px">acco.fit/${u.handle.replace(/^@/, '')}</div>
        </div>
        <div class="field">
          <label class="field-label">Bio</label>
          <textarea id="ep-bio" class="input" rows="3" maxlength="160" oninput="updateBioCount(this)" style="resize:none;padding:12px 14px;font-family:var(--font-body)">${u.bio}</textarea>
          <div class="field-hint text-xs text-muted" style="margin-top:6px;display:flex;justify-content:space-between"><span>A short line your buddies will see.</span><span id="ep-bio-count">${u.bio.length}/160</span></div>
        </div>
        <div class="field">
          <label class="field-label">Location</label>
          <div class="input-icon">${icon('map-pin')}<input id="ep-location" class="input" type="text" value="${u.location}"/></div>
        </div>
        <div class="field">
          <label class="field-label">Birthday</label>
          <div class="input-icon">${icon('calendar')}<input id="ep-birthday" class="input" type="text" placeholder="MM / DD / YYYY" value="${u.birthday || ''}"/></div>
        </div>
      </div>

      <div class="section-title" style="margin-top:var(--space-6)"><h3>Visibility</h3></div>
      <div class="col gap-2 mb-6">
        ${toggleRow('ep-vis-public',  'Public profile',  'Anyone with your link can see your streak and badges', u.visibility?.publicProfile ?? true)}
        ${toggleRow('ep-vis-location','Show location',   'Display your city on your profile', u.visibility?.showLocation ?? true)}
        ${toggleRow('ep-vis-activity','Share activity',  'Let buddies see your recent check-ins', u.visibility?.shareActivity ?? true)}
      </div>

      <button class="btn btn-primary btn-block" onclick="saveProfile()">Save changes</button>
      <button class="btn btn-ghost btn-block mt-2" onclick="navigate('profile')">Cancel</button>
    </div>
  `;
};

// ==================== EMAIL ====================
SCREENS.accountEmail = () => {
  const u = DATA.user;
  return `
    ${statusBar()}
    ${header({ title: 'Email', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4)">
        <div class="row" style="gap:12px;align-items:center">
          <div class="icon-tile icon-tile-md" style="background:var(--color-primary-dim);color:var(--color-primary)">${icon('check-circle')}</div>
          <div class="flex-1">
            <div class="text-sm fw-600">${u.email || 'ben@meshcreative.co'}</div>
            <div class="text-xs text-muted">Verified · primary address</div>
          </div>
        </div>
      </div>

      <div class="section-title"><h3>Change email</h3></div>
      <div class="auth-form" style="padding:0">
        <div class="field">
          <label class="field-label">New email</label>
          <div class="input-icon">${icon('mail')}<input id="ae-new" class="input" type="email" placeholder="you@example.com"/></div>
        </div>
        <div class="field">
          <label class="field-label">Current password</label>
          <div class="input-icon">${icon('lock')}<input id="ae-pw" class="input" type="password" placeholder="Confirm with password"/></div>
        </div>
      </div>
      <button class="btn btn-primary btn-block mt-4" onclick="updateEmail()">Send verification</button>
      <div class="text-xs text-muted text-center mt-3">We'll send a confirmation to the new address before switching.</div>
    </div>
  `;
};

// ==================== PASSWORD ====================
SCREENS.accountPassword = () => `
  ${statusBar()}
  ${header({ title: 'Password', back: 'settings' })}
  <div class="screen-body anim-in">
    <div class="auth-form" style="padding:0">
      <div class="field">
        <label class="field-label">Current password</label>
        <div class="input-icon">${icon('lock')}<input id="pw-current" class="input" type="password" placeholder="Enter current password"/></div>
      </div>
      <div class="field">
        <label class="field-label">New password</label>
        <div class="input-icon">${icon('lock')}<input id="pw-new" class="input" type="password" placeholder="At least 8 characters"/></div>
      </div>
      <div class="field">
        <label class="field-label">Confirm new password</label>
        <div class="input-icon">${icon('lock')}<input id="pw-confirm" class="input" type="password" placeholder="Repeat new password"/></div>
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-4" onclick="updatePassword()">Update password</button>
    <div class="card mt-5" style="padding:var(--space-4)">
      <div class="text-sm fw-600 mb-2">Password tips</div>
      <div class="text-xs text-muted" style="line-height:1.6">Use 12+ characters with a mix of letters, numbers, and symbols. Avoid reusing passwords from other apps.</div>
    </div>
    <a href="#" onclick="showToast('Reset link sent','mail');return false" class="text-sm text-center" style="display:block;margin-top:var(--space-4);color:var(--color-primary)">Forgot current password?</a>
  </div>
`;

// ==================== PRIVACY ====================
SCREENS.accountPrivacy = () => {
  const v = DATA.user.visibility || {};
  return `
    <style>.sw.on { background: var(--color-primary) !important; } .sw.on > span { left: 21px !important; }</style>
    ${statusBar()}
    ${header({ title: 'Privacy', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="section-title"><h3>Profile visibility</h3></div>
      <div class="col gap-2 mb-6">
        ${toggleRow('pr-public',    'Public profile',     'Anyone with the link can view your profile', v.publicProfile ?? true)}
        ${toggleRow('pr-location',  'Show my city',       'Display your city on your profile', v.showLocation ?? true)}
        ${toggleRow('pr-nearby',    'Discoverable nearby','Appear in Nearby Buddies results', v.discoverable ?? true)}
      </div>

      <div class="section-title"><h3>Activity</h3></div>
      <div class="col gap-2 mb-6">
        ${toggleRow('pr-activity',  'Share activity',     'Buddies see your check-ins and streaks', v.shareActivity ?? true)}
        ${toggleRow('pr-leaderboard','Show on leaderboard','Rank publicly among buddies', v.showLeaderboard ?? true)}
        ${toggleRow('pr-milestones','Milestone cheers',   'Let buddies celebrate your milestones', v.milestones ?? true)}
      </div>

      <div class="section-title"><h3>Data</h3></div>
      <div class="col gap-2 mb-6">
        ${navRow('download','Download my data','', "showToast('Export queued · we\\'ll email you','mail')")}
        ${navRow('shield','Blocked accounts','2', "showToast('Blocked accounts','shield')")}
      </div>

      <button class="btn btn-primary btn-block" onclick="savePrivacy()">Save changes</button>
    </div>
  `;
};

// ==================== APPEARANCE ====================
SCREENS.appearance = () => {
  const mode = DATA.user.appearance || 'dark';
  const opt = (val, label, desc, iconName) => `
    <button class="list-row clickable" onclick="setAppearance('${val}')" style="width:100%;text-align:left;background:var(--color-surface);border:1px solid ${mode===val?'var(--color-primary)':'var(--color-border)'};border-radius:var(--radius-md);padding:var(--space-4)">
      <div class="icon-tile icon-tile-md" style="background:var(--color-surface-3);color:var(--color-text)">${icon(iconName)}</div>
      <div class="list-row-main">
        <div class="list-row-title text-sm">${label}</div>
        <div class="list-row-sub">${desc}</div>
      </div>
      ${mode===val ? `<span style="color:var(--color-primary)">${icon('check')}</span>` : ''}
    </button>`;
  return `
    ${statusBar()}
    ${header({ title: 'Appearance', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="section-title"><h3>Theme</h3></div>
      <div class="col gap-2 mb-6">
        ${opt('dark',   'Dark',  'Acid lime on deep navy (default)', 'moon')}
        ${opt('light',  'Light', 'Bright backgrounds, high contrast', 'sun')}
        ${opt('system', 'Match system', 'Follow your phone setting', 'smartphone')}
      </div>

      <div class="section-title"><h3>Text size</h3></div>
      <div class="card" style="padding:var(--space-4)">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:var(--space-3)">
          <span class="text-xs text-muted">A</span>
          <input id="text-size" type="range" min="0" max="2" value="1" style="flex:1;margin:0 12px;accent-color:var(--color-primary)"/>
          <span class="text-lg">A</span>
        </div>
        <div class="text-xs text-muted text-center">Default</div>
      </div>
    </div>
  `;
};

// ==================== GOAL PREFERENCES ====================
SCREENS.goalPreferences = () => {
  const p = DATA.user.goalPrefs || {};
  return `
    <style>.sw.on { background: var(--color-primary) !important; } .sw.on > span { left: 21px !important; }</style>
    ${statusBar()}
    ${header({ title: 'Goal preferences', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="section-title"><h3>Defaults</h3></div>
      <div class="col gap-2 mb-6">
        ${navRow('calendar','Default cadence','3x per week', "showToast('Cadence picker','calendar')")}
        ${navRow('clock','Check-in window','Evening (6–10pm)', "showToast('Window picker','clock')")}
        ${navRow('users','Default visibility','Buddies only', "showToast('Visibility picker','eye')")}
      </div>

      <div class="section-title"><h3>Accountability</h3></div>
      <div class="col gap-2 mb-6">
        ${toggleRow('gp-restdays','Honor rest days','Don\'t break streaks on scheduled off days', p.honorRest ?? true)}
        ${toggleRow('gp-graceperiod','Grace period','Allow a 12-hour catch-up after a missed check-in', p.gracePeriod ?? true)}
        ${toggleRow('gp-autoshare','Auto-share milestones','Post badges and PRs to your feed', p.autoShare ?? true)}
      </div>

      <div class="section-title"><h3>Reminders</h3></div>
      <div class="col gap-2">
        ${toggleRow('gp-morning','Morning nudge','8am reminder of today\'s goal', p.morningNudge ?? false)}
        ${toggleRow('gp-evening','Evening check-in','7pm tap-to-check-in', p.eveningCheckin ?? true)}
      </div>

      <button class="btn btn-primary btn-block mt-6" onclick="saveGoalPrefs()">Save preferences</button>
    </div>
  `;
};

// ==================== HELP CENTER ====================
SCREENS.helpCenter = () => {
  const topics = [
    { icon: 'flame',    title: 'Streaks and rest days',         desc: 'How check-in streaks really work' },
    { icon: 'users',    title: 'Buddies and groups',            desc: 'Adding people, managing requests' },
    { icon: 'target',   title: 'Setting goals',                 desc: 'Cadence, visibility, and partners' },
    { icon: 'bell',     title: 'Notifications',                 desc: 'What triggers a nudge' },
    { icon: 'shield',   title: 'Privacy and blocking',          desc: 'Control who sees what' },
    { icon: 'trophy',   title: 'Leaderboards and badges',       desc: 'How points are earned' },
    { icon: 'lock',     title: 'Account and login',             desc: 'Email, password, sign-in methods' },
    { icon: 'zap',      title: 'Integrations',                  desc: 'Apple Health, Strava, Fitbit' }
  ];
  return `
    ${statusBar()}
    ${header({ title: 'Help center', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="field" style="margin-bottom:var(--space-5)">
        <div class="input-icon">${icon('search')}<input class="input" type="text" placeholder="Search help articles"/></div>
      </div>
      <div class="section-title"><h3>Popular topics</h3></div>
      <div class="col gap-2 mb-6">
        ${topics.map(t => `
          <button class="list-row clickable" onclick="showToast('Opening ${t.title.replace(/'/g, "\\'")}','help-circle')" style="width:100%;text-align:left;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4)">
            <div class="icon-tile icon-tile-md" style="background:var(--color-surface-3);color:var(--color-text-muted)">${icon(t.icon)}</div>
            <div class="list-row-main">
              <div class="list-row-title text-sm">${t.title}</div>
              <div class="list-row-sub">${t.desc}</div>
            </div>
            <span style="color:var(--color-text-faint)">${icon('chevron-right')}</span>
          </button>
        `).join('')}
      </div>
      <button class="btn btn-secondary btn-block" onclick="navigate('contactSupport')">${icon('message-circle')}<span>Still need help? Contact support</span></button>
    </div>
  `;
};

// ==================== CONTACT SUPPORT ====================
SCREENS.contactSupport = () => `
  ${statusBar()}
  ${header({ title: 'Contact support', back: 'helpCenter' })}
  <div class="screen-body anim-in">
    <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4)">
      <div class="text-sm fw-600 mb-1">We reply within 1 business day</div>
      <div class="text-xs text-muted">For urgent account issues, tell us in the first line.</div>
    </div>

    <div class="auth-form" style="padding:0">
      <div class="field">
        <label class="field-label">Topic</label>
        <div class="input-icon">${icon('target')}<select id="cs-topic" class="input" style="appearance:none;padding-left:44px">
          <option>Account or login</option>
          <option>Billing</option>
          <option>Feature request</option>
          <option>Report a bug</option>
          <option>Privacy or safety</option>
          <option>Something else</option>
        </select></div>
      </div>
      <div class="field">
        <label class="field-label">Message</label>
        <textarea id="cs-msg" class="input" rows="6" placeholder="Tell us what's going on…" style="resize:none;padding:12px 14px;font-family:var(--font-body)"></textarea>
      </div>
      <div class="field">
        <label class="field-label">Reply-to</label>
        <div class="input-icon">${icon('mail')}<input id="cs-email" class="input" type="email" value="${DATA.user.email || 'ben@meshcreative.co'}"/></div>
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-4" onclick="sendSupportMessage()">Send message</button>
  </div>
`;

// ==================== PLANS ====================
// Rank used to know if a switch is an upgrade, downgrade, or current
const PLAN_RANK = { free: 0, pro: 1, trainer: 2 };

function planPriceLine(plan, cycle) {
  if (plan.id === 'free') return `<span class="plan-price">Free<span class="unit">forever</span></span>`;
  if (cycle === 'yearly') {
    const perMo = (plan.priceYearly / 12).toFixed(0);
    return `<span class="plan-price">$${perMo}<span class="unit">/ month, billed yearly</span></span>`;
  }
  return `<span class="plan-price">$${plan.priceMonthly}<span class="unit">/ month</span></span>`;
}

function featureRowHTML(f) {
  return `<div class="feature-row ${f.ok ? 'ok' : 'no'}"><span class="feature-ico">${icon(f.ok ? 'check' : 'x')}</span><span>${f.text}</span></div>`;
}

SCREENS.plans = () => {
  const sub = DATA.subscription;
  const cycle = sub.billingCycle || 'yearly';
  const currentRank = PLAN_RANK[sub.planId];
  const currentPlan = DATA.plans.find(p => p.id === sub.planId);
  return `
    ${statusBar()}
    ${header({ title: 'Plans', back: 'settings' })}
    <div class="screen-body anim-in">
      <div class="card plan-current mb-6" style="padding:var(--space-5)">
        <div class="row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-lg icon-tile-primary">${icon(currentPlan.icon)}</div>
          <div class="flex-1" style="min-width:0">
            <div class="text-xs text-muted" style="letter-spacing:0.08em;text-transform:uppercase">Current plan</div>
            <div class="fw-600" style="font-size:var(--text-lg)">${currentPlan.name}</div>
            <div class="text-xs text-muted mt-1">${sub.planId === 'free' ? 'Since ' + sub.since : 'Renews ' + (sub.renewsOn || 'monthly')}</div>
          </div>
        </div>
      </div>

      <div class="section-title"><h3>Billing</h3></div>
      <div class="segmented mb-6" style="--cols:2" id="planCycleSeg">
        <button class="${cycle === 'monthly' ? 'active' : ''}" data-val="monthly" onclick="selectBillingCycle(this,'monthly')">Monthly</button>
        <button class="${cycle === 'yearly' ? 'active' : ''}" data-val="yearly" onclick="selectBillingCycle(this,'yearly')">Yearly<span style="margin-left:6px;font-size:10px;padding:2px 6px;background:rgba(198,242,78,0.18);color:var(--color-primary);border-radius:999px;font-weight:700">Save 25%</span></button>
      </div>

      <div class="section-title"><h3>All plans</h3></div>
      <div class="col gap-4" id="planList">
        ${DATA.plans.map(p => planCardHTML(p, cycle, currentRank, sub.planId)).join('')}
      </div>

      <div class="card text-center mt-6" style="padding:var(--space-5)">
        <div class="text-xs text-muted">Prototype · no real charges. Payment step is mocked.</div>
      </div>
    </div>
  `;
};

function planCardHTML(plan, cycle, currentRank, currentId) {
  const isCurrent = plan.id === currentId;
  const myRank = PLAN_RANK[plan.id];
  let btn;
  if (isCurrent) {
    btn = `<button class="btn btn-secondary btn-block" disabled style="opacity:0.7;cursor:default">${icon('check-circle')}<span>Current plan</span></button>`;
  } else if (myRank > currentRank) {
    btn = `<button class="btn btn-primary btn-block" onclick="startUpgrade('${plan.id}')">${icon('arrow-right')}<span>Upgrade to ${plan.name}</span></button>`;
  } else {
    btn = `<button class="btn btn-secondary btn-block" onclick="startDowngrade('${plan.id}')"><span>Switch to ${plan.name}</span></button>`;
  }
  return `
    <div class="plan-card ${isCurrent ? 'plan-current' : ''} ${plan.popular && !isCurrent ? 'plan-popular' : ''}">
      ${plan.popular && !isCurrent ? `<div class="plan-ribbon">Most popular</div>` : ''}
      <div class="row gap-3" style="align-items:flex-start">
        <div class="icon-tile icon-tile-lg group-icon-${plan.tint === 'primary' ? 'primary' : plan.tint === 'warm' ? 'warm' : 'muted'}" style="border-radius:var(--radius-md)">${icon(plan.icon)}</div>
        <div class="flex-1" style="min-width:0">
          <div class="fw-600" style="font-size:var(--text-lg)">${plan.name}</div>
          <div class="text-xs text-muted mt-1">${plan.tagline}</div>
        </div>
      </div>
      <div class="mt-4 mb-4">${planPriceLine(plan, cycle)}</div>
      <div class="col gap-0 mb-4">${plan.features.map(featureRowHTML).join('')}</div>
      ${btn}
    </div>
  `;
}

// ==================== PLAN CHECKOUT (upgrade confirm) ====================
SCREENS.planCheckout = () => {
  const plan = DATA.plans.find(p => p.id === APP.pendingPlanId) || DATA.plans[1];
  const cycle = APP.pendingCycle || DATA.subscription.billingCycle || 'yearly';
  const price = cycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
  const unit = cycle === 'yearly' ? 'year' : 'month';
  const savings = cycle === 'yearly' ? (plan.priceMonthly * 12 - plan.priceYearly) : 0;
  return `
    ${statusBar()}
    ${header({ title: 'Confirm upgrade', back: 'plans' })}
    <div class="screen-body anim-in">
      <div class="card" style="padding:var(--space-5);text-align:center">
        <div class="icon-tile icon-tile-xl icon-tile-primary" style="margin:0 auto var(--space-4)">${icon(plan.icon)}</div>
        <div class="text-xs text-muted" style="letter-spacing:0.08em;text-transform:uppercase">Upgrading to</div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-2)">${plan.name}</h2>
        <div class="text-sm text-muted mt-1">${plan.tagline}</div>
      </div>

      <div class="section-title mt-6"><h3>What you get</h3></div>
      <div class="card" style="padding:var(--space-4) var(--space-5)">
        ${plan.features.filter(f => f.ok).map(featureRowHTML).join('')}
      </div>

      <div class="section-title mt-6"><h3>Summary</h3></div>
      <div class="card" style="padding:var(--space-4) var(--space-5)">
        <div class="row gap-3" style="justify-content:space-between;padding:6px 0">
          <span class="text-sm text-muted">${plan.name} · ${cycle === 'yearly' ? 'Yearly' : 'Monthly'}</span>
          <span class="text-sm fw-600">$${price} / ${unit}</span>
        </div>
        ${savings > 0 ? `<div class="row gap-3" style="justify-content:space-between;padding:6px 0">
          <span class="text-sm" style="color:var(--color-primary)">Yearly savings</span>
          <span class="text-sm fw-600" style="color:var(--color-primary)">-$${savings}</span>
        </div>` : ''}
        <div style="height:1px;background:var(--color-border);margin:8px 0"></div>
        <div class="row gap-3" style="justify-content:space-between;padding:6px 0">
          <span class="fw-600">Total today</span>
          <span class="fw-600">$${price}</span>
        </div>
      </div>

      <div class="card mt-4" style="padding:var(--space-4) var(--space-5)">
        <div class="row gap-3" style="align-items:center">
          <div class="icon-tile icon-tile-muted" style="width:36px;height:36px;border-radius:var(--radius-md)">${icon('lock')}</div>
          <div class="flex-1" style="min-width:0">
            <div class="text-sm fw-600">Payment · Apple Pay</div>
            <div class="text-xs text-muted">Mocked for prototype</div>
          </div>
          <button class="text-xs" style="color:var(--color-primary);background:none;border:none;cursor:pointer">Change</button>
        </div>
      </div>

      <button class="btn btn-primary btn-block mt-6" onclick="completeUpgrade()">${icon('check')}<span>Confirm and upgrade</span></button>
      <button class="btn btn-ghost btn-block mt-2" onclick="navigate('plans')">Cancel</button>
    </div>
  `;
};

// ==================== DOWNGRADE CONFIRM ====================
SCREENS.planDowngrade = () => {
  const plan = DATA.plans.find(p => p.id === APP.pendingPlanId) || DATA.plans[0];
  const currentPlan = DATA.plans.find(p => p.id === DATA.subscription.planId);
  // Features user loses = features currently available but missing from target plan
  const targetOK = new Set(plan.features.filter(f => f.ok).map(f => f.text));
  // Exclude umbrella "Everything in X" lines — those don't represent losable features.
  const losing = currentPlan.features.filter(f => f.ok && !targetOK.has(f.text) && !/^Everything in /i.test(f.text));
  return `
    ${statusBar()}
    ${header({ title: 'Switch plan', back: 'plans' })}
    <div class="screen-body anim-in">
      <div class="card" style="padding:var(--space-5);text-align:center">
        <div class="icon-tile icon-tile-xl icon-tile-muted" style="margin:0 auto var(--space-4)">${icon(plan.icon)}</div>
        <div class="text-xs text-muted" style="letter-spacing:0.08em;text-transform:uppercase">Switching to</div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-2)">${plan.name}</h2>
        <div class="text-sm text-muted mt-1">${plan.tagline}</div>
      </div>

      ${losing.length ? `
      <div class="section-title mt-6"><h3>You'll lose access to</h3></div>
      <div class="card" style="padding:var(--space-4) var(--space-5)">
        ${losing.map(f => `<div class="feature-row no"><span class="feature-ico">${icon('x')}</span><span>${f.text}</span></div>`).join('')}
      </div>
      ` : ''}

      <div class="card mt-4" style="padding:var(--space-4) var(--space-5);border-color:rgba(255,154,86,0.3);background:rgba(255,154,86,0.04)">
        <div class="row gap-3" style="align-items:flex-start">
          <div style="width:20px;height:20px;flex-shrink:0;color:#ff9a56;margin-top:2px">${icon('clock')}</div>
          <div class="text-sm">Your current plan stays active until the end of your billing period. The switch takes effect then.</div>
        </div>
      </div>

      <button class="btn btn-primary btn-block mt-6" onclick="completeDowngrade()">${icon('check')}<span>Switch to ${plan.name}</span></button>
      <button class="btn btn-ghost btn-block mt-2" onclick="navigate('plans')">Keep ${currentPlan.name}</button>
    </div>
  `;
};

// ==================== TRAINER DASHBOARD ====================
function traineeStatusLabel(s) {
  return { 'crushing': 'Crushing it', 'on-track': 'On track', 'needs-nudge': 'Needs a nudge' }[s] || s;
}
function traineeCardHTML(t) {
  const pct = t.weekProgress ? Math.round(100 * t.weekProgress.done / t.weekProgress.target) : 0;
  return `
    <div class="trainee-card" onclick="openTrainee('${t.id}')" style="cursor:pointer">
      <div class="row gap-3" style="align-items:center">
        ${avatar(t)}
        <div class="flex-1" style="min-width:0">
          <div class="row gap-2" style="align-items:center">
            <div class="fw-600 text-sm" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.name}</div>
            <span class="status-dot ${t.status}"></span>
          </div>
          <div class="text-xs text-muted mt-1" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.focus}</div>
        </div>
        <div class="text-right" style="flex-shrink:0">
          <div class="text-xs" style="color:${t.streak > 0 ? 'var(--color-primary)' : 'var(--color-text-faint)'};font-weight:600">${t.streak}d streak</div>
          <div class="text-xs text-muted mt-1">${t.lastCheckIn}</div>
        </div>
      </div>
      <div class="row gap-3 mt-3" style="align-items:center">
        <div class="progress flex-1"><div class="progress-bar" style="width:${pct}%"></div></div>
        <span class="text-xs text-muted" style="flex-shrink:0">${t.weekProgress.done}/${t.weekProgress.target} this wk</span>
      </div>
    </div>
  `;
}

SCREENS.trainerDashboard = () => {
  const trainees = DATA.trainees;
  const needsNudge = trainees.filter(t => t.status === 'needs-nudge');
  const crushing = trainees.filter(t => t.status === 'crushing');
  const onTrack = trainees.filter(t => t.status === 'on-track');
  return `
    ${statusBar()}
    ${header({
      title: 'Trainer',
      subtitle: `${trainees.length} trainees`,
      back: 'profile',
      right: `<button class="icon-btn" onclick="navigate('addTrainee')" aria-label="Add trainee">${icon('user-plus')}</button>`
    })}
    <div class="screen-body anim-in">
      <div class="stat-row">
        <div class="stat">
          <div class="stat-num"><span class="accent">${crushing.length}</span></div>
          <div class="stat-lbl">Crushing it</div>
        </div>
        <div class="stat">
          <div class="stat-num">${onTrack.length}</div>
          <div class="stat-lbl">On track</div>
        </div>
        <div class="stat">
          <div class="stat-num" style="color:#ff9a56">${needsNudge.length}</div>
          <div class="stat-lbl">Needs nudge</div>
        </div>
      </div>

      <div class="row gap-2 mb-4 mt-4">
        <button class="btn btn-primary btn-sm flex-1" onclick="navigate('assignGoal')">${icon('target')}<span>Assign goal</span></button>
        <button class="btn btn-secondary btn-sm flex-1" onclick="showToast('Nudge sent to ' + ${needsNudge.length} + ' trainee' + (${needsNudge.length} === 1 ? '' : 's'), 'send')">${icon('send')}<span>Nudge all</span></button>
      </div>

      ${needsNudge.length ? `
      <div class="section-title"><h3>Needs a nudge</h3><span class="text-xs text-muted">${needsNudge.length}</span></div>
      <div class="col gap-3 mb-6">${needsNudge.map(traineeCardHTML).join('')}</div>
      ` : ''}

      <div class="section-title"><h3>All trainees</h3><a href="#" onclick="navigate('addTrainee');return false">+ Add</a></div>
      <div class="col gap-3 mb-6">${trainees.map(traineeCardHTML).join('')}</div>

      <div class="section-title"><h3>Active assignments</h3></div>
      <div class="col gap-3">
        ${DATA.trainerGoals.map(g => `
          <div class="card" style="padding:var(--space-4)">
            <div class="row gap-3" style="align-items:center">
              <div class="icon-tile icon-tile-lg icon-tile-primary-dim" style="border-radius:var(--radius-md)">${icon('target')}</div>
              <div class="flex-1" style="min-width:0">
                <div class="fw-600 text-sm">${g.title}</div>
                <div class="text-xs text-muted mt-1">${g.cadence === 'daily' ? 'Daily' : g.target + 'x per week'} · ${g.assignedTo.length} trainee${g.assignedTo.length === 1 ? '' : 's'} · Created ${g.created}</div>
              </div>
              <span style="width:18px;height:18px;display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;color:var(--text-muted)">${icon('chevron-right')}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// ==================== ADD TRAINEE ====================
SCREENS.addTrainee = () => `
  ${statusBar()}
  ${header({ title: 'Add trainee', back: 'trainerDashboard' })}
  <div class="screen-body anim-in">
    <p class="text-sm text-muted mb-6">Invite a client by email or share a personal join code they can redeem.</p>

    <div class="field">
      <label class="field-label">Email</label>
      <input id="newTraineeEmail" class="input" type="email" placeholder="client@example.com" />
    </div>
    <div class="field">
      <label class="field-label">Name (optional)</label>
      <input id="newTraineeName" class="input" placeholder="Alex Romano" />
    </div>
    <div class="field">
      <label class="field-label">Focus (what they're working on)</label>
      <input id="newTraineeFocus" class="input" placeholder="Half-marathon · Oct" />
    </div>

    <button class="btn btn-primary btn-block mt-4" onclick="completeAddTrainee()">${icon('send')}<span>Send invite</span></button>

    <div class="section-title mt-6"><h3>Or share your trainer code</h3></div>
    <div class="card text-center" style="padding:var(--space-5)">
      <div class="text-xs text-muted" style="letter-spacing:0.08em;text-transform:uppercase">Your code</div>
      <div class="fw-600 mt-2" style="font-family:var(--font-display);font-size:var(--text-2xl);letter-spacing:0.1em">BEN-ACCO-24</div>
      <button class="btn btn-secondary btn-sm mt-4" onclick="showToast('Code copied','copy')">${icon('copy')}<span>Copy code</span></button>
    </div>

    <button class="btn btn-ghost btn-block mt-4" onclick="navigate('trainerDashboard')">Cancel</button>
  </div>
`;

// ==================== ASSIGN GOAL (trainer) ====================
SCREENS.assignGoal = () => `
  ${statusBar()}
  ${header({ title: 'Assign a goal', back: 'trainerDashboard' })}
  <div class="screen-body anim-in">
    <p class="text-sm text-muted mb-6">Set a shared goal for one or more trainees. They'll be notified and can start checking in today.</p>

    <div class="field">
      <label class="field-label">Goal title</label>
      <input id="assignTitle" class="input" placeholder="Run 3x per week" />
    </div>
    <div class="field">
      <label class="field-label">Description</label>
      <textarea id="assignDesc" class="textarea" placeholder="What does success look like?"></textarea>
    </div>

    <div class="field">
      <label class="field-label">Cadence</label>
      <div class="segmented" style="--cols:2" id="assignCadenceSeg">
        <button class="active" data-val="daily" onclick="selectAssignCadence(this,'daily')">Daily</button>
        <button data-val="weekly" onclick="selectAssignCadence(this,'weekly')">Per week</button>
      </div>
    </div>

    <div class="field" id="assignTargetWrap" style="display:none">
      <label class="field-label">Target per week</label>
      <div class="segmented" style="--cols:5" id="assignTargetSeg">
        ${[1,2,3,4,5].map(n => `<button ${n===3?'class="active"':''} data-val="${n}" onclick="selectAssignTarget(this,${n})">${n}x</button>`).join('')}
      </div>
    </div>

    <div class="section-title mt-2"><h3>Assign to</h3><span class="text-xs text-muted" id="assignCountLbl">0 selected</span></div>
    <div class="col gap-2 mb-4">
      <div class="row gap-2" style="padding:6px 0;align-items:center">
        <button class="chip" onclick="toggleAllTrainees(this)" id="assignAllBtn">Select all</button>
      </div>
      ${DATA.trainees.map(t => `
        <label class="card row gap-3" style="align-items:center;padding:var(--space-3) var(--space-4);cursor:pointer">
          <input type="checkbox" class="assign-trainee-chk" data-id="${t.id}" onchange="updateAssignCount()" style="width:18px;height:18px;accent-color:var(--color-primary);flex-shrink:0"/>
          ${avatar(t)}
          <div class="flex-1" style="min-width:0">
            <div class="fw-600 text-sm">${t.name}</div>
            <div class="text-xs text-muted mt-1">${t.focus}</div>
          </div>
        </label>
      `).join('')}
    </div>

    <button class="btn btn-primary btn-block mt-4" onclick="completeAssignGoal()">${icon('check')}<span>Assign goal</span></button>
    <button class="btn btn-ghost btn-block mt-2" onclick="navigate('trainerDashboard')">Cancel</button>
  </div>
`;
