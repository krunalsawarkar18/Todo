📞 Contact
Krunal Sawarkar

Email: krunalsawarkar2004@gmail.com
# Momentum Todo

A modern, local-first todo application built with React, Vite, JavaScript, and Tailwind CSS.

This project is designed to show more than CRUD. It highlights product thinking, polished UI execution, responsive frontend architecture, and clean state management that is ready to scale from `localStorage` to a future MERN backend.

## Why This Project Stands Out

Momentum Todo was built to answer both.

- Modern, friendly UI instead of a basic checklist demo
- Local-first persistence with a storage abstraction that can later swap to an API
- Thoughtful task prioritization, filtering, due-date handling, and responsive behavior
- Clean component boundaries for maintainability and future expansion
- Fast developer workflow using Vite and production-ready frontend conventions

## Product Snapshot

Momentum Todo is a focused productivity dashboard for a single user. It helps users capture work quickly, prioritize what matters, and see what needs attention right now.

### Core Features

- Create, edit, delete, and complete tasks
- Reopen completed tasks with a dedicated action button
- Assign task priority: `low`, `medium`, `high`
- Add optional descriptions and due dates
- Filter by:
  - all tasks
  - active
  - completed
  - high priority
  - due today
  - overdue
- Search tasks by title and description
- Clear completed tasks in one action
- Persist tasks in browser `localStorage`
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- JavaScript (ES modules)
- Vite 7
- Tailwind CSS 4
- Browser `localStorage`

## Architecture Highlights

This project intentionally keeps the stack lightweight for v1 while preserving a clean upgrade path.

### Frontend

- Component-based React UI with focused responsibilities
- Responsive dashboard layout with:
  - header/search area
  - stats cards
  - sidebar filters
  - task stream
  - modal task form

### State Management

- React state drives UI updates
- Derived task views use memoized filtering/sorting logic
- Persistence is isolated from UI components

### Data Layer

All task storage logic lives in a dedicated utility instead of being spread across components.

Current contract:

- Storage key: `todo-app.tasks`
- Task model:
  - `id`
  - `title`
  - `description`
  - `status`
  - `priority`
  - `dueDate`
  - `createdAt`
  - `updatedAt`

This design makes it straightforward to replace `localStorage` with:

- Express API routes
- MongoDB persistence
- user authentication
- multi-device sync

## UI/UX Decisions

This is not a generic tutorial UI. The design aims to feel like a lightweight productivity product.

- Soft gradient background and glass-style panels
- Strong typography hierarchy
- Clear visual emphasis on urgent and high-priority work
- Empty states that still feel intentional
- Mobile filter drawer for smaller screens
- Dedicated completion button for clearer usability

## Folder Structure

```text
src/
  components/
    DashboardHeader.jsx
    SidebarFilters.jsx
    StatsCards.jsx
    TaskForm.jsx
    TaskItem.jsx
    TaskList.jsx
  utils/
    taskStorage.js
  App.jsx
  main.jsx
  styles.css
```

## Running Locally

```bash
npm install
npm run dev
```

Open the local development URL shown by Vite.

## Production Build

```bash
npm run build
```

This project has already been verified with a successful production build.

## What This Project Demonstrates About Me

- I can turn a simple brief into a polished user-facing product
- I care about UX details, not just functionality
- I structure frontend code so it can evolve instead of becoming fragile
- I make pragmatic tradeoffs: lightweight where possible, scalable where needed
- I build with both delivery speed and maintainability in mind

## Next Iteration Roadmap

Potential upgrades for a full MERN version:

- Node/Express backend
- MongoDB persistence
- authentication and user accounts
- drag-and-drop task ordering
- subtasks
- categories/tags
- analytics dashboard
- cloud sync across devices

## If You’re Reviewing This Project

Momentum Todo reflects how I approach real product work:

- build a clean foundation
- make the UI feel intentional
- focus on user value first
- leave the codebase ready for the next level of complexity

If you’re hiring for frontend or full-stack roles, this project is a good example of how I think about shipping polished interfaces with solid engineering fundamentals.
