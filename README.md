# Acco

The accountability fitness app for people who actually show up.

Acco turns fitness goals into shared commitments. Set a goal, bring your friends, and build streaks together. Includes a Trainer tier so coaches can hold whole rosters accountable inside the same social experience their clients already love.

**Live:** [acco.fit](https://acco.fit)

---

## What's in this repo

A vanilla, framework-free static web app — no build step, no dependencies.

| File             | Purpose                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `index.html`     | Single-page shell                                                                        |
| `styles.css`     | All styling — dark navy + acid green theme, hand-rolled CSS variables                    |
| `data.js`        | Global `DATA` object: goals, buddies, groups, plans, subscription state, trainees        |
| `components.js`  | Reusable helpers: `icon()`, `avatar()`, `header()`, `navRow()`, inline SVG icon library  |
| `screens.js`     | `SCREENS` object — one function per route returning an HTML string                       |
| `app.js`         | `ROUTES` table, `navigate()` router, `APP` state, all event handlers                     |

## Running locally

No install required. Any static server will do:

```bash
python3 -m http.server 5000
# then open http://127.0.0.1:5000
```

## Features

- Social-first goal tracking — every goal has supporters who can cheer, nudge, and check in
- Cadence-aware streaks (daily, weekly, or specific days — streak logic respects rest days)
- Public and private groups with request-to-join flow
- Three plan tiers: Free, Pro ($8/mo), Trainer ($24/mo)
- Trainer dashboard — trainee roster with live status, one-tap goal assignment, coach-led groups
- Mobile-first dark UI with brand iconography (no emoji)
- Daily check-in cap with confetti + streak preservation logic

## Tech notes

- Pure HTML/CSS/JS, no framework
- Designed to be wrapped as a PWA (manifest + service worker planned)
- Deployable as static files to any host (currently HostGator)

## Author

Ben Guerra — [ben@meshcreative.co](mailto:ben@meshcreative.co)

## License

MIT — see [LICENSE](LICENSE).
