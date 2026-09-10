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

## 👤 Account roles

The project supports two application roles:

```text
Student
   ↓
Overview / Subjects / Learning pages

Admin
   ↓
Overview / Subjects / Learning pages
   ↓
Admin → Question Bank
```

Admin-only Question Bank management is protected by the Supabase role and database permissions.

## 📝 Admin Question Bank

The Admin Question Bank is organised around subjects and is intended to manage a large question collection.

Current admin flow:

```text
Admin
  ↓
Question Bank
  ↓
Select Subject
  ↓
Question Bank for that Subject
  ├── Search questions
  ├── Preview question
  ├── Edit question
  ├── Delete question
  └── Add Question
```

The question editor supports the fields and content required by the current project, including Chapter, Difficulty, Year, Tags, Hint, Correct Answer, Explanation and image/equation content.

Tags remain part of the question system but are not exposed as a separate Admin sidebar page.

## 📁 Repository structure

The repository keeps GitHub Pages HTML files in the root so the existing relative asset paths continue to work.

```text
Ace_My_Study/
│
├── index.html                    # Public landing page
├── login.html                    # Login / Sign Up
├── overview.html                 # Logged-in Overview
├── subjects.html                 # My Subjects / Explore Subject
├── course.html                   # Course Info
├── question-bank.html            # Student Question Bank
├── profile.html                  # User Profile
├── spm-addmath-landing.html      # SPM Additional Mathematics landing page
├── admin-question-bank.html      # Admin Question Bank
├── admin-add-question.html       # Admin Add Question
│
├── assets/
│   ├── css/                      # Page and theme styles
│   ├── js/                       # Page behaviour and shared logic
│   └── images/                   # Shared images and logo
│
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Pages deployment
│
├── docs/
│   └── PROJECT_STRUCTURE.md      # Repository organisation notes
│
└── README.md                     # Project documentation
```

### JavaScript organisation

```text
assets/js/
├── auth.js                       # Authentication and protected-page logic
├── sidebar.js                    # Shared sidebar and Admin navigation
├── subjects.js                   # Subject-page interactions
├── admin-question-bank.js        # Admin Question Bank
└── admin-add-question.js         # Add Question form
```

The old standalone `admin-tags.js` script has been removed because Tags are part of the Question Bank workflow rather than a separate Admin page.

## 🎨 Main design system

The website uses a warm, study-focused visual direction:

- Cream / warm neutral backgrounds
- Brown and dark-brown accents
- Dark navy typography
- Soft cards, borders and subtle shadows

The design is intended to feel calm, focused and slightly modern rather than overly bright or distracting.

## 🔐 Authentication and database

Authentication is handled through Supabase from the website's JavaScript authentication layer.

The intended permission model is:

- Student accounts use the normal learning pages.
- Admin accounts can access the Admin Question Bank.
- Admin Question Bank write operations are protected by Supabase database permissions.
- The `profiles.role` value is used for application role checks.

## 🚀 GitHub Pages

The repository uses GitHub Actions for GitHub Pages deployment through:

`/.github/workflows/pages.yml`

The public website is served from the repository's GitHub Pages deployment.

## 📝 Organisation principle

The repository is intentionally organised by responsibility without moving the root HTML pages:

```text
Pages        → Root
Styles       → assets/css
JavaScript   → assets/js
Images       → assets/images
Deployment   → .github/workflows
Documentation→ docs
```

This keeps the repository easy to understand while avoiding unnecessary path changes that could break GitHub Pages links.

---

**Ace My Study — Learn smarter. Make progress.**
