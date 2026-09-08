# Ace My Study

A learning website for students to explore subjects and practise with question banks.

## User flow

Main Page → Login / Sign Up → Overview → Subjects → My Subjects → Question Bank

## Repository structure

- `index.html` — public Main Page
- `login.html` — Login / Sign Up page
- `overview.html` — learning website Overview
- `subjects.html` — My Subjects and Explore Subject page
- `course.html` — subject learning space / Question Bank entry
- `question-bank.html` — Question Bank page
- `profile.html` — profile and logout page
- `spm-addmath-landing.html` — SPM Additional Mathematics landing page
- `assets/css/` — stylesheets
- `assets/js/` — JavaScript modules
- `assets/images/` — shared Ace My Study logo
- `.github/workflows/` — GitHub Pages deployment workflow

## Navigation rules

- The public site opens on the Main Page.
- Login and Sign Up are available from the Main Page.
- Successful Login / Sign Up leads to `overview.html`.
- `subjects.html` opens on **My Subjects** first.
- Adding a subject makes it available in the sidebar.
- Subject navigation currently keeps **Question Bank** as the only subject sub-item.
- Course Info, Lessons and History are not part of the current subject flow.
- The shared sidebar stays fixed while the main content scrolls.
- Account remains at the bottom of the sidebar.
- The old Learn with Shen logo assets have been removed; the site uses `Ace My Study.png` from `assets/images/`.
