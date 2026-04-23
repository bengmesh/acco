// SVG icons (Lucide-style, stroked). Used throughout the app.
const ICONS = {
  'arrow-left':   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  'arrow-right':  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  'chevron-right':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  'plus':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  'check':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  'home':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  'users':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'trophy':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3"/><path d="M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3"/><path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>',
  'compass':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  'user':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'user-plus':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  'bell':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  'settings':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  'flame':        '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  'heart':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'heart-filled': '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'message-circle':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  'send':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  'search':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  'target':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  'award':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  'calendar':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  'trending-up':  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  'trending-down':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
  'flag':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  'sunrise':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>',
  'megaphone':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  'lock':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  'mail':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  'eye':          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  'log-out':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  'share':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  'edit':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  'x':            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  'more':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  'filter':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  'zap':          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  'google':       '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
  'apple':        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>',
  'facebook':     '<svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  'help-circle':  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  'shield':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  'moon':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'clock':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'link':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  'copy':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  'map-pin':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  'activity':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  'refresh':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  'globe':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  'sparkles':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.7L19.6 10l-5.7 1.9L12 17l-1.9-5.1L4.4 10l5.7-1.3L12 3z"/><path d="M19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></svg>',
  'strava':       '<svg viewBox="0 0 24 24" fill="#fc5200"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>',
};

function icon(name) {
  return ICONS[name] || '';
}

// Logo component
function logo(large = false) {
  return `
    <div class="logo" style="${large ? 'font-size:36px' : ''}">
      <span class="logo-mark"></span>
      <span class="wordmark">acc<em>o</em></span>
    </div>
  `;
}

// Status bar (iOS-style)
function statusBar() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  return `
    <div class="status-bar">
      <div>${h}:${m}</div>
      <div class="right">
        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 14a2 2 0 012-2h2v4H4a2 2 0 01-2-2zm5-4a2 2 0 012-2h2v8H9a2 2 0 01-2-2V10zm5-4a2 2 0 012-2h2v12h-2a2 2 0 01-2-2V6z"/></svg>
        <svg viewBox="0 0 20 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 7a9 9 0 0118 0"/><path d="M4.5 9.5a5 5 0 0111 0"/><circle cx="10" cy="12" r="1.2" fill="currentColor"/></svg>
        <svg viewBox="0 0 24 12" fill="none"><rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" stroke-width="1.2"/><rect x="3" y="3" width="13" height="6" rx="1" fill="currentColor"/><rect x="22" y="4" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
      </div>
    </div>
  `;
}

// Header with optional back
function header({ title, subtitle, back, right, simple }) {
  if (simple) {
    return `
      <div class="app-header">
        ${back ? `<button class="back-btn" onclick="navigate('${back}')">${icon('arrow-left')}<span>Back</span></button>` : '<div></div>'}
        ${right || '<div></div>'}
      </div>
    `;
  }
  return `
    <div class="app-header">
      <div class="flex-1">
        ${back ? `<button class="back-btn" onclick="navigate('${back}')" style="margin-bottom:4px">${icon('arrow-left')}<span>Back</span></button>` : ''}
        <div class="title">${title || ''}</div>
        ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
      </div>
      ${right || ''}
    </div>
  `;
}

// Bottom tab bar
function tabbar(active) {
  const tabs = [
    { key: 'dashboard', label: 'Home',    icon: 'home' },
    { key: 'buddies',   label: 'Buddies', icon: 'users' },
    { key: '_fab',      label: '',        icon: 'plus' },
    { key: 'leaderboard', label: 'Ranks', icon: 'trophy' },
    { key: 'profile',   label: 'Profile', icon: 'user' },
  ];
  return `
    <nav class="tabbar">
      ${tabs.map(t => {
        if (t.key === '_fab') {
          return `<button class="tab-fab" onclick="navigate('checkin')" aria-label="Daily check-in">${icon('plus')}</button>`;
        }
        return `
          <button class="tab ${active === t.key ? 'active' : ''}" onclick="navigate('${t.key}')" aria-label="${t.label}">
            ${icon(t.icon)}
            <span>${t.label}</span>
          </button>
        `;
      }).join('')}
    </nav>
  `;
}

// Avatar
function avatar(user, size = '') {
  const sizeClass = size ? `avatar-${size}` : '';
  const letters = user.initials || initials(user.name);
  return `<div class="avatar ${sizeClass}" data-color="${user.avatarColor || user.color || 1}">${letters}</div>`;
}

// Small chevron row (for settings-type lists)
function navRow(iconName, label, value, onclick) {
  return `
    <button class="list-row clickable" onclick="${onclick || ''}" style="width:100%;text-align:left;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);">
      <div class="avatar avatar-sm" style="background:var(--color-surface-3);color:var(--color-text-muted);width:36px;height:36px">${icon(iconName)}</div>
      <div class="list-row-main">
        <div class="list-row-title" style="font-size:var(--text-sm)">${label}</div>
      </div>
      ${value ? `<span class="list-row-meta">${value}</span>` : ''}
      <span style="color:var(--color-text-faint)">${icon('chevron-right')}</span>
    </button>
  `;
}

// Activity item
function activityItem(a) {
  const actor = findBuddy(a.actor);
  const avatarHtml = avatar(actor);
  const supportHint = a.needsSupport
    ? '<div style="margin-top:6px;font-size:var(--text-xs);color:var(--color-warning);display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:var(--color-warning-dim);border-radius:var(--radius-full);">needs support</div>'
    : '';
  return `
    <div class="activity-item">
      ${avatarHtml}
      <div class="activity-body">
        <div class="activity-text"><strong>${actor.name}</strong> ${a.text}</div>
        <div class="activity-time">${a.time}</div>
        ${supportHint}
        <div class="activity-actions">
          <button class="activity-action ${a.cheered ? 'cheered' : ''}" onclick="toggleCheer('${a.id}', this)">
            ${icon('zap')}
            <span>${a.cheered ? 'Cheered' : 'Cheer'}</span>
          </button>
          <button class="activity-action ${a.liked ? 'liked' : ''}" onclick="toggleLike('${a.id}', this)">
            ${icon(a.liked ? 'heart-filled' : 'heart')}
            <span>${a.liked ? 'Liked' : 'Like'}</span>
          </button>
          <button class="activity-action" onclick="openEncouragement('${actor.id}')">
            ${icon('message-circle')}
            <span>Send note</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Buddy row
function buddyRow(b) {
  const statusColor = b.online ? 'var(--color-success)' : 'var(--color-text-faint)';
  return `
    <div class="list-row clickable" onclick="openBuddy('${b.id}')" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);">
      <div style="position:relative">
        ${avatar(b)}
        ${b.online ? `<span style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:var(--color-success);border:2px solid var(--color-surface);border-radius:50%"></span>` : ''}
      </div>
      <div class="list-row-main">
        <div class="list-row-title" style="font-size:var(--text-sm);display:flex;align-items:center;gap:8px">
          ${b.name}
          ${b.streak > 10 ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:11px;color:var(--color-warning);font-weight:600">${icon('flame')}<span>${b.streak}</span></span>` : ''}
        </div>
        <div class="list-row-sub">${b.status}</div>
      </div>
      <button class="icon-btn" style="width:36px;height:36px" onclick="event.stopPropagation();openEncouragement('${b.id}')">${icon('message-circle')}</button>
    </div>
  `;
}

// Goal card
function goalCard(g) {
  const isWeekly = g.cadence?.type === 'weekly';
  const unit = g.streakUnit || 'days';
  const unitShort = unit === 'weeks' ? 'week streak' : unit === 'weekdays' ? 'weekday streak' : 'day streak';
  return `
    <div class="goal-card ${g.featured ? 'goal-card-featured' : ''}" onclick="openGoal('${g.id}')">
      <div class="goal-card-head">
        <div style="flex:1;min-width:0">
          <div class="row gap-2" style="flex-wrap:wrap">
            <span class="badge badge-primary">${g.category}</span>
            <span class="badge">${cadenceLabel(g)}</span>
          </div>
          <div class="goal-card-title" style="margin-top:8px">${g.title}</div>
          <div class="goal-card-desc">${g.desc}</div>
        </div>
        <div style="flex-shrink:0">
          ${progressRing(g.progress, 56)}
        </div>
      </div>
      ${isWeekly ? weekProgress(g) : ''}
      <div class="goal-card-foot">
        <div class="row gap-4">
          <div class="goal-card-stat">
            <div class="num"><em>${g.streak}</em></div>
            <div class="lbl">${unitShort}</div>
          </div>
          <div class="goal-card-stat">
            <div class="num">${g.daysLeft}</div>
            <div class="lbl">days left</div>
          </div>
        </div>
        <div class="col" style="align-items:flex-end;gap:4px">
          <div class="avatar-stack">
            ${g.supporters.slice(0,3).map(id => avatar(findBuddy(id), 'sm')).join('')}
          </div>
          <span style="font-size:11px;color:var(--color-text-faint)">${g.supporters.length} supporters</span>
        </div>
      </div>
    </div>
  `;
}

// Weekly progress — pip row showing done/target for this week (for weekly-cadence goals)
function weekProgress(g) {
  const done = g.weekProgress?.done ?? 0;
  const target = g.weekProgress?.target ?? g.cadence?.target ?? 1;
  const pips = Array.from({length: target}, (_, i) => `<span class="week-pip ${i < done ? 'filled' : ''}"></span>`).join('');
  const remaining = Math.max(0, target - done);
  const label = done >= target
    ? 'This week — locked in ✓'
    : `This week · ${done} of ${target} · ${remaining} to go`;
  return `
    <div class="week-progress">
      <div class="week-progress-label">${label}</div>
      <div class="week-pips">${pips}</div>
    </div>
  `;
}

// Circular progress ring
function progressRing(percent, size = 80) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return `
    <svg class="progress-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="progress-ring-track" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${stroke}"/>
      <circle class="progress-ring-fill" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${stroke}"
              stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
            transform="rotate(90 ${size/2} ${size/2})"
            style="font-family:var(--font-display);font-weight:600;font-size:${size*0.24}px;fill:var(--color-text);letter-spacing:-0.02em">${percent}%</text>
    </svg>
  `;
}

// Show toast
function showToast(msg, iconName = 'check') {
  const el = document.getElementById('toast');
  el.innerHTML = `${icon(iconName)}<span>${msg}</span>`;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

// Confetti burst
function confetti() {
  const colors = ['#C6F24E', '#8FB3FF', '#FF9EB5', '#FFE066', '#7FE0C4'];
  const frame = document.querySelector('.device-screen') || document.body;
  const wrap = document.createElement('div');
  wrap.className = 'confetti';
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.background = colors[i % colors.length];
    s.style.animationDelay = Math.random() * 300 + 'ms';
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    wrap.appendChild(s);
  }
  frame.appendChild(wrap);
  setTimeout(() => wrap.remove(), 2500);
}
