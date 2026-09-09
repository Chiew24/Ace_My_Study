# Ace My Study — Project Structure

This document explains how the repository is organised without changing the existing website code or file paths.

## Root pages

| File | Purpose |
|---|---|
| `index.html` | Public main / landing page |
| `login.html` | Login and Sign Up page |
| `overview.html` | Logged-in Overview page |
| `subjects.html` | My Subjects and Explore Subject |
| `course.html` | Course Info page |
| `question-bank.html` | Question Bank page |
| `profile.html` | Profile page |
| `spm-addmath-landing.html` | SPM Additional Mathematics landing page |

## Assets

### `assets/css/`

All visual styling is kept together here. The files are separated by page or purpose so the existing pages can continue using their current relative paths.

### `assets/js/`

The JavaScript used by the website is kept in one place:

- `auth.js` — authentication and protected-page logic
- `sidebar.js` — shared dynamic sidebar and subject navigation
- `subjects.js` — subject-page interactions

### `assets/images/`

Shared images are stored here, including the Ace My Study logo.

## Deployment

`.github/workflows/pages.yml` contains the GitHub Pages deployment workflow.

## Why the HTML files remain in the root

The existing pages reference assets with paths such as `assets/css/...` and `assets/js/...`. Moving the HTML pages into new folders would require changing those references.

Because the goal of this organisation pass is **not to change the website code or functionality**, the current page locations are intentionally preserved.

## Organisation goal

The repository should be easy to understand at a glance:

```text
Pages → Root
Styles → assets/css
JavaScript → assets/js
Images → assets/images
Deployment → .github/workflows
Documentation → docs
```

This keeps the project tidy while preserving the existing website structure and behaviour.
