# Ace My Study — Project Structure

This document explains the current repository organisation and keeps the website paths compatible with GitHub Pages.

## Root pages

| File | Purpose |
|---|---|
| `index.html` | Public landing page |
| `login.html` | Login and Sign Up page |
| `overview.html` | Logged-in Overview page |
| `subjects.html` | My Subjects and Explore Subject |
| `course.html` | Course Info page |
| `question-bank.html` | Student Question Bank page |
| `profile.html` | Profile page |
| `spm-addmath-landing.html` | SPM Additional Mathematics landing page |
| `admin-question-bank.html` | Admin Question Bank |
| `admin-add-question.html` | Admin Add Question |

## Assets

### `assets/css/`

All visual styling is kept together here, including shared theme styles and page-specific styles.

### `assets/js/`

```text
assets/js/
├── auth.js
├── sidebar.js
├── subjects.js
├── admin-question-bank.js
└── admin-add-question.js
```

- `auth.js` — authentication and protected-page logic
- `sidebar.js` — shared sidebar and Admin navigation
- `subjects.js` — subject-page interactions
- `admin-question-bank.js` — Admin Question Bank behaviour
- `admin-add-question.js` — Add Question form behaviour

Tags are handled as part of the Question Bank workflow. There is no separate Admin Tags page.

### `assets/images/`

Shared images are stored here, including the Ace My Study logo.

## Deployment

`.github/workflows/pages.yml` contains the GitHub Pages deployment workflow.

## Why the HTML files remain in the root

The existing pages use relative paths such as `assets/css/...` and `assets/js/...`. Keeping the HTML files in the root avoids unnecessary path changes and helps preserve the current GitHub Pages deployment.

## Current organisation

```text
Ace_My_Study/
│
├── HTML pages                  # Root
├── assets/
│   ├── css/                    # Styles
│   ├── js/                     # JavaScript
│   └── images/                 # Images
├── .github/workflows/          # Deployment
├── docs/                       # Documentation
└── README.md
```

The repository has been cleaned so the current Admin Question Bank structure is reflected in the documentation and the unused standalone Admin Tags script is no longer included.
