# Ace My Study

**Ace My Study** is a focused learning website designed for students preparing for SPM in Malaysia.

The project provides a simple path from the public landing page into a personal learning space, where students can access subjects, course information and question banks.

## 🌐 Website

**Live site:** https://chiew24.github.io/Ace_My_Study/

## 🎯 Project purpose

Ace My Study is built around one main idea:

> **Choose → Learn → Practise → Improve**

The current website is designed to make the student's study journey easy to understand and easy to navigate.

## 🔄 User flow

```text
Main Page
   ↓
Login / Sign Up
   ↓
Overview
   ↓
Subjects
   ↓
My Subjects / Explore Subject
   ↓
Subject
   ├── Course Info
   └── Question Bank
```

### Main Page

The public landing page introduces Ace My Study and explains what the platform is for, what students can do, and how the learning flow works.

### Login / Sign Up

Students can create an account or log in before entering the protected learning pages.

### Overview

The Overview page is the main starting point after authentication. It provides quick access to the student's learning areas.

### Subjects

The Subjects page contains:

- **My Subjects** — subjects currently available to the student.
- **Explore Subject** — available subjects that can be explored.

### Subject navigation

When a subject is expanded in the sidebar, the current subject navigation provides:

- **Course Info**
- **Question Bank**

The sidebar keeps the subject navigation organised while the main page content remains separate.

## 📁 Repository structure

The repository is intentionally kept simple so the existing website paths and relative asset references continue to work without changing the website code.

```text
Ace_My_Study/
│
├── index.html                    # Public main / landing page
├── login.html                    # Login and Sign Up page
├── overview.html                 # Logged-in Overview page
├── subjects.html                 # My Subjects / Explore Subject page
├── course.html                   # Course Info page
├── question-bank.html            # Question Bank page
├── profile.html                  # User profile page
├── spm-addmath-landing.html      # SPM Additional Mathematics landing page
│
├── assets/
│   ├── css/                      # All website stylesheets
│   ├── js/                       # Website JavaScript
│   └── images/                   # Shared website images and logo
│
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Pages deployment workflow
│
├── docs/
│   └── PROJECT_STRUCTURE.md      # Repository organisation notes
│
└── README.md                     # Project documentation
```

## 🎨 Main design system

The website uses a warm, study-focused visual direction:

- Cream / warm neutral backgrounds
- Brown and dark-brown accents
- Dark navy typography
- Black logo/icon treatment where appropriate
- Soft cards, borders and subtle shadows

The design is intended to feel calm, focused and slightly modern rather than overly bright or distracting.

## 🧩 Main assets

### CSS

- `assets/css/style.css` — core site styles
- `assets/css/mainpage.css` — main landing page styles
- `assets/css/auth.css` — login / sign-up styles
- `assets/css/subjects.css` — subjects page styles
- `assets/css/subjects-banner.css` — subjects banner styles
- `assets/css/spm-addmath-landing.css` — SPM Additional Mathematics landing styles
- `assets/css/polish.css` — visual polish styles
- `assets/css/sidebar-black.css` — sidebar/logo/icon styling
- `assets/css/cream-brown-theme.css` — cream + brown theme layer

### JavaScript

- `assets/js/auth.js` — authentication and protected-page behaviour
- `assets/js/sidebar.js` — shared dynamic subject sidebar
- `assets/js/subjects.js` — subject-page behaviour

### Images

- `assets/images/Ace My Study.png` — shared Ace My Study logo

## 🔐 Authentication

Authentication is handled through Supabase from the website's JavaScript authentication layer.

The intended behaviour is:

- The main page is public.
- Login / Sign Up is the entry point to the learning system.
- Successful authentication leads to `overview.html`.
- Protected learning pages require an authenticated session.
- Logging out returns the user to the public main page.
- Returning to the main page does not bypass the login requirement for protected pages.

## 🚀 GitHub Pages

The repository uses GitHub Actions for GitHub Pages deployment through:

`/.github/workflows/pages.yml`

The public website is served from the repository's GitHub Pages deployment.

## 📝 Organisation principle

This repository keeps the existing HTML, CSS, JavaScript and asset paths intact. The organisation work is documentation-focused so that the current website functionality and relative file references are not changed.

## 📌 Current scope

The current project is focused on Malaysian SPM students, with the structure designed so that more subjects and learning content can be added later without changing the overall learning flow.

---

**Ace My Study — Learn smarter. Make progress.**
