// All screen renderers. Each returns an HTML string.
const SCREENS = {};

// ==================== LANDING ====================
SCREENS.landing = () => `
  <div class="screen-body no-padding" style="display:flex;flex-direction:column">
    ${statusBar()}
    <div class="landing">
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
      <div class="hero-sub">You're on an ${u.stats.streak}-day streak. Don't break it today.</div>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-num"><span class="accent">${u.stats.streak}</span></div>
          <div class="stat-lbl">Day streak</div>
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
          <h3>Today's check-in</h3>
        </div>
        <button class="card clickable" onclick="navigate('checkin')" style="width:100%;text-align:left;display:flex;align-items:center;gap:var(--space-4);background:linear-gradient(135deg,rgba(198,242,78,0.12),rgba(198,242,78,0.03));border-color:rgba(198,242,78,0.25)">
          <div class="icon-tile icon-tile-lg icon-tile-round icon-tile-primary-solid" style="box-shadow:var(--glow-primary)">${icon('check')}</div>
          <div class="flex-1">
            <div class="fw-600">Check in for today</div>
            <div class="text-xs text-muted mt-1">3 goals need a yes/no from you</div>
          </div>
          <span style="color:var(--color-primary)">${icon('chevron-right')}</span>
        </button>
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
SCREENS.checkin = () => `
  ${statusBar()}
  ${header({ back: 'dashboard', simple: true, right: `<div class="text-xs text-muted">Step 1 of 3</div>` })}
  <div class="screen-body anim-in">
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-bottom:var(--space-2)">Daily check-in</h2>
    <p class="text-muted text-sm mb-6">Thursday, April 23 · Keep your ${DATA.user.stats.streak}-day streak alive.</p>

    <div class="section" style="margin-top:0">
      <div class="section-title"><h3>How did today go?</h3></div>
      <div class="mood-grid">
        <button class="mood-btn" onclick="selectMood(this,1)" aria-label="Rough">😓</button>
        <button class="mood-btn" onclick="selectMood(this,2)" aria-label="Meh">😐</button>
        <button class="mood-btn selected" onclick="selectMood(this,3)" aria-label="Okay">🙂</button>
        <button class="mood-btn" onclick="selectMood(this,4)" aria-label="Good">😊</button>
        <button class="mood-btn" onclick="selectMood(this,5)" aria-label="Crushed it">🔥</button>
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
      <div class="section-title"><h3>Goals — did you do them?</h3></div>
      <div class="col gap-3">
        ${DATA.goals.map(g => `
          <div class="card card-compact row gap-3">
            <div class="flex-1">
              <div class="fw-600 text-sm">${g.title}</div>
              <div class="text-xs text-muted mt-1">${g.category}</div>
            </div>
            <div class="segmented" style="--cols:2">
              <button class="active" onclick="toggleSeg(this)">Yes</button>
              <button onclick="toggleSeg(this)">No</button>
            </div>
          </div>
        `).join('')}
      </div>
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
        <button class="card clickable row gap-3" style="width:100%;text-align:left" onclick="navigate('create-goal-2')">
          <div style="font-size:28px;flex-shrink:0">${t.emoji}</div>
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
      <label class="field-label">Frequency</label>
      <div class="segmented" style="--cols:4">
        <button>Daily</button>
        <button class="active">Weekly</button>
        <button>M-W-F</button>
        <button>Custom</button>
      </div>
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
      <span class="badge badge-primary">${g.category}</span>
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-3);line-height:1.1">${g.title}</h2>
      <p class="text-muted text-sm mt-2">${g.desc}</p>

      <div class="row gap-6 mt-6" style="align-items:center">
        ${progressRing(g.progress, 120)}
        <div class="col gap-3">
          <div>
            <div style="font-family:var(--font-display);font-size:22px;font-weight:600;letter-spacing:-0.02em;color:var(--color-warning);display:inline-flex;align-items:center;gap:6px">${icon('flame')}${g.streak} days</div>
            <div class="text-xs text-muted">Current streak</div>
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:22px;font-weight:600;letter-spacing:-0.02em">${g.checkIns}/${g.checkInsNeeded}</div>
            <div class="text-xs text-muted">Check-ins</div>
          </div>
          <div>
            <div style="font-family:var(--font-display);font-size:22px;font-weight:600;letter-spacing:-0.02em">${g.daysLeft}</div>
            <div class="text-xs text-muted">Days remaining</div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-block mt-6" onclick="navigate('checkin')">
        ${icon('check-circle')}<span>Check in for today</span>
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
      <p style="font-size:var(--text-xs)">You're all caught up ✓</p>
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
          <button class="icon-btn" style="position:absolute;bottom:0;right:-4px;width:32px;height:32px;background:var(--color-primary);color:var(--color-text-inverse);border:3px solid var(--color-bg)" aria-label="Edit avatar">${icon('edit')}</button>
        </div>
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;letter-spacing:-0.02em;margin-top:var(--space-4)">${u.name}</h2>
        <div class="text-muted text-sm mt-1">${u.handle} · ${u.location}</div>
        <p class="text-sm text-muted mt-3" style="max-width:32ch">${u.bio}</p>
        <div class="row gap-2 mt-4">
          <button class="btn btn-secondary btn-sm">${icon('edit')}<span>Edit profile</span></button>
          <button class="btn btn-secondary btn-sm">${icon('share')}<span>Share</span></button>
        </div>
      </div>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-num"><span class="accent">${u.stats.streak}</span></div>
          <div class="stat-lbl">Day streak</div>
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
      ${navRow('user', 'Edit profile', '')}
      ${navRow('mail', 'Email', 'ben@meshcreative.co')}
      ${navRow('lock', 'Password', '')}
      ${navRow('shield', 'Privacy', '')}
    </div>

    <div class="section-title"><h3>App</h3></div>
    <div class="col gap-2 mb-6">
      ${navRow('bell', 'Notifications', '', "navigate('notification-settings')")}
      ${navRow('moon', 'Appearance', 'Dark')}
      ${navRow('target', 'Goal preferences', '')}
    </div>

    <div class="section-title"><h3>Support</h3></div>
    <div class="col gap-2 mb-6">
      ${navRow('help-circle', 'Help center', '')}
      ${navRow('message-circle', 'Contact support', '')}
      ${navRow('share', 'Rate the app', '')}
    </div>

    <button class="btn btn-secondary btn-block">${icon('log-out')}<span>Log out</span></button>
    <button class="btn btn-ghost btn-block mt-2" style="color:var(--color-danger)">Delete account</button>
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
