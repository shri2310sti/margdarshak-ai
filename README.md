# 🧭 Margdarshak AI — Career Roadmap Generator

A full-stack web application that generates personalized career roadmaps powered by AI.

![Tech Stack](https://img.shields.io/badge/Frontend-Next.js_14-black?logo=next.js)
![Tech Stack](https://img.shields.io/badge/Backend-Node.js_+_Express-green?logo=node.js)
![Tech Stack](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Tech Stack](https://img.shields.io/badge/Styling-Tailwind_CSS-blue?logo=tailwindcss)

---

## 📁 Project Structure

```
margdarshak-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── roadmapController.js
│   │   ├── models/
│   │   │   └── Roadmap.js
│   │   ├── routes/
│   │   │   └── roadmapRoutes.js
│   │   ├── services/
│   │   │   └── roadmapService.js
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js              ← Dashboard
│   │   │   ├── layout.js
│   │   │   ├── globals.css
│   │   │   └── history/
│   │   │       └── page.js          ← Roadmap History
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── RoadmapForm.js
│   │   │   ├── RoadmapCard.js
│   │   │   ├── RoadmapModal.js
│   │   │   └── HistoryList.js
│   │   └── lib/
│   │       └── api.js
│   ├── .env.local.example
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **MongoDB** (local or Atlas) → https://www.mongodb.com/atlas
- **VS Code** → https://code.visualstudio.com
- **Git** → https://git-scm.com

---

## 🚀 Setup Instructions

### Step 1 — Clone / Create the project

```bash
mkdir margdarshak-ai
cd margdarshak-ai
git init
```

### Step 2 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/margdarshak
PORT=5000
```

Start the backend:
```bash
npm run dev
```
Backend runs at → **http://localhost:5000**

### Step 3 — Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
cp .env.local.example .env.local
```

`.env.local` should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```
Frontend runs at → **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/roadmap/generate` | Generate + save a new roadmap |
| `GET` | `/roadmaps` | Fetch all saved roadmaps |
| `DELETE` | `/roadmap/:id` | Delete a roadmap by ID |

### POST `/roadmap/generate` — Request Body
```json
{
  "targetRole": "Full Stack Developer",
  "currentSkills": "HTML, CSS, basic JavaScript",
  "experienceLevel": "beginner"
}
```

---

## ✨ Features

- 🎯 Personalized roadmap generation based on role + skills + experience
- 💾 Persistent storage with MongoDB
- 📜 Full roadmap history with timestamps
- 🗑️ Delete roadmaps
- 📱 Responsive design
- ⚡ Fast Next.js 14 App Router

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18 |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| HTTP Client | Axios |

---

## 📸 Screenshots



---

## 👤 Author

Built for Margdarshak AI — Full Stack Developer Intern Assignment
