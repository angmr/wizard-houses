# Wizard Houses Fullstack App

A fullstack web application built with **Next.js** (React, TypeScript) and a custom **Node.js API server**. This project's purpose is to demonstrate modern frontend development, API integration, and backend proxy/filtering logic. It is designed to showcase clean architecture, interactive UI, and scalable code.

---

## ✨ Features

- **Modern UI:** Built with Next.js and React. Responsive design. Interactive search.
- **Custom API Server:** Custom **Node.js** API proxy server (simplified REST API) for backend data handling. The server proxies and filters data from the Wizard World API.
- **Live Search:** Filter houses by name using a responsive search bar. Filter house traits interactively within each house card.
- **Dynamic Gradients:** Each house card displays a unique CSS gradient based on the house colors included in the fetched data.
- **TypeScript:** Type safety on both frontend and backend.
- **CORS Enabled:** Backend is ready for cross-origin requests.
- **Error Handling:** Handling of loading states (spinner) and API errors.

---

## Tech Stack

- **Frontend:** Next.js (React, TypeScript, CSS Modules)
- **Backend:** Node.js (Custom API server, TypeScript-ready)
- **API Source:** [Wizard World API](https://wizard-world-api.herokuapp.com/houses)

---

## Overview

This project consists of:
- A **Next.js** frontend that displays and filters Hogwarts house data.
- A **Node.js** backend (`api-server/server.js`) that proxies and filters data from the [Wizard World API](https://wizard-world-api.herokuapp.com/houses), supporting query-based filtering.

---


### 🛠️ Implementation Details / Technical Notes
Technical notes for myself and others.

- **API Proxying & Filtering:**  
  The backend uses Node.js core modules (`http`, `https`, `url`) to proxy requests to the Wizard World API and filter results server-side based on query parameters (e.g., `name`).

- **CORS Handling:**  
  The API server sets `Access-Control-Allow-Origin: *` to enable cross-origin requests from the frontend.

- **Frontend Data Fetching:**  
  Data is fetched from the custom API using `useEffect` and stored in React state.  
  _Lesson: Managing loading and error states in React with hooks._

- **Live Search:**  
  Search bars use controlled components and React state for real-time filtering of houses and traits.
  Each house card manages its own state. The traitSearch state is local to each HouseCard component instance, so typing in one card's search bar only affects that card.
  _Lesson: Importance of separating state for each search input to avoid shared state bugs._

- **Dynamic Gradients:**  
  House card gradients are generated dynamically using inline styles, parsing the `houseColours` string from the API data.  
  _Lesson: Mapping data-driven values to CSS properties in React._

- **TypeScript Usage:**  
  Type safety enforced throughout the codebase.  
  _Lesson: Explicitly typing function parameters (e.g., `.map((c: string) => ...)`) to avoid implicit `any` warnings._

- **Componentization:**  
  The `SearchBar` is a reusable component, styled with CSS Modules and accepting props for value, onChange, and placeholder.

- **Error Handling:**  
  The frontend displays a loading spinner while fetching data and handles fetch errors gracefully(?).

- **Git & Deployment:**  
  Initialize repo, add a remote, push to GitHub.
  _Lesson: Importance of .gitignore and not tracking node_modules._