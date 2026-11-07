# Local Dev Shop

A lightweight, purely frontend **web-based shopping cart application** designed to run completely offline on a local machine. This project serves as a functional sandbox to test basic HTML, CSS, and vanilla JavaScript interactions while practicing Git and GitHub repository workflows.

## 🚀 Getting Started Locally

Since this application does not rely on a heavy backend framework or databases, you can launch and test it instantly without installing any runtime tools (like Node.js or Python).

### Prerequisites
* A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari)
* Git installed on your machine (to track modifications)

### Step-by-Step Launch
1. Clone or navigate to your local directory:
   ```bash
   cd MySandbox
   ```
2. Locate the core layout file at `src/index.html`.
3. **Open the file in your browser:**
   * **Option A:** Double-click the `index.html` file directly from your computer's File Explorer or Finder.
   * **Option B:** Open your browser, press `Ctrl + O` (Windows) or `Cmd + O` (Mac), and select the `index.html` file.

---

## 🛠️ Project Structure

The project follows a standard, clean repository layout designed to isolate source code from documentation and metadata:

```text
MySandbox/
├── src/
│   ├── index.html    # Webpage architecture and UI layout
│   ├── style.css     # UI aesthetics, grid layout, and responsive design
│   └── app.js        # Core business logic (state tracking, rendering, cart manipulation)
└── README.md         # Project documentation and developer instructions (this file)
```

---

## ✨ Features Implemented

* **Dynamic Product Catalog:** Products are managed inside a JavaScript data array and injected programmatically into a responsive grid system.
* **Live Shopping Cart Tracking:** Adding an item dynamically triggers calculations to update the total item count and currency values inside the DOM.
* **Zero-Dependency Pipeline:** Runs entirely client-side without the need for `npm install`, web servers, or third-party CDNs.

---

## 💻 Version Control Guide

This project is fully initialized with Git. Use these standard workflows to capture your development milestones:

**Check changes:**
```bash
git status
```

**Stage and commit updates:**
```bash
git add .
git commit -m "docs: upgrade README with local installation guidelines and directory maps"
```
