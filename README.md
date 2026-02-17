# Hintro Frontend Internship Assignment - AI-Ready Task Board

A high-performance, fully persistent Kanban Task Board built with React and Redux Toolkit. This application was developed as a React Js Developer assessment for Hintro, focusing on architecture, state management, and user experience.

**Live Demo:**  https://trello-likeapp.netlify.app/

##  Static Login Credentials
To access the application, please use the following hardcoded credentials:
- **Email:** `intern@demo.com`
- **Password:** `intern123`

---

##  Tech Stack & Engineering Choices

- **Framework:** React 18 (Bootstrapped with Vite for instant server start and fast HMR).
- **State Management:** Redux Toolkit (RTK). Chosen to seamlessly synchronize the Task Board state with the Activity Log state, decoupling complex business logic from UI components.
- **Drag and Drop:** `@hello-pangea/dnd`. A highly optimized, accessible fork of `react-beautiful-dnd`, perfect for Kanban-style column interactions.
- **Styling:** Tailwind CSS. Used for rapid, utility-first styling to ensure a responsive and modern UI without heavy CSS bundles.
- **Testing:** Vitest & React Testing Library for fast, reliable unit and component testing.

---

##  Architecture & Explanations

### 1. State Persistence Strategy
The application requires data to persist across refreshes without a backend. 
- **Implementation:** Instead of manually writing to `localStorage` inside individual components, I utilized Redux's `store.subscribe()` method. This creates an automatic, invisible sync between the Redux state and local storage, ensuring zero data loss and keeping the React components "pure."
- **Auth Persistence:** The 'Remember Me' functionality routes the session to `localStorage` (persistent) or `sessionStorage` (clears on tab close), mimicking production-grade authentication flows.

### 2. Derived State for Sorting & Filtering
- **Implementation:** Sorting by due date (handling empty dates last), filtering by priority, and searching by title are all handled using React's `useMemo` hook. This ensures the original Redux state is never mutated, and expensive sorting operations are only recalculated when the dependencies (tasks, filters, or sort order) change.

### 3. Activity Log
- **Implementation:** Designed as a slide-over sidebar to preserve vertical screen real estate. The `activitySlice` listens for actions (creation, movement, deletion) and logs them with formatted timestamps, capped at the 50 most recent actions to prevent infinite storage growth.

---

##  Features Implemented

- [x] **Static Login Flow:** Protected routes, error handling, and 'Remember Me' toggle.
- [x] **Task Management:** Create, Edit, and Delete tasks with required fields and tags.
- [x] **Kanban Board:** Fixed Todo, Doing, Done columns with smooth Drag & Drop.
- [x] **Advanced Filtering:** Search by text, filter by Priority, and sort by Due Date (empty dates fall to the bottom).
- [x] **Activity History:** Real-time logging of all board interactions.
- [x] **Data Reliability:** Safe handling of empty storage and a confirmed "Reset Board" feature.

---

##  Local Setup Instructions

Follow these steps to run the application locally:

**1. Clone the repository (or extract the ZIP file):**
```bash
git clone https://github.com/Hekwoeuiw123/task-board.git
cd task-board
