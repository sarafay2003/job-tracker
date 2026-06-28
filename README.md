# 🗂️ Job Application Tracker

A full-stack web application to track job applications with an AI-powered job description analyzer.

---

## 🚀 Features

- **Authentication** — Secure login and signup powered by Supabase
- **Application Management** — Add, edit, and delete job applications
- **Kanban Board** — Visualize applications across stages: Applied → Interview → Offer → Rejected
- **AI Analyzer** — Paste a job description and get instant AI-powered insights using Groq (LLaMA 3.3)
- **Clean UI** — Responsive design built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database & Auth | Supabase (PostgreSQL) |
| AI | Groq API (LLaMA 3.3 70B) |

---

## 📁 Project Structure

```
job-tracker/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   ├── supabaseClient.js
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── index.js
│   └── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A [Supabase](https://supabase.com) account
- A [Groq](https://console.groq.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/sarafay2003/job-tracker.git
cd job-tracker
```

### 2. Setup Frontend

```bash
npm install
```

Create a `.env` file in the root folder:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
GROQ_API_KEY=your_groq_api_key
```

### 4. Setup Supabase Database

Create a table called `applications` with these columns:

| Column | Type |
|--------|------|
| id | uuid (primary key) |
| created_at | timestamptz |
| company | text |
| role | text |
| status | text |
| date_applied | date |
| link | text |
| notes | text |

### 5. Run the App

Start the backend:
```bash
cd backend
node index.js
```

Start the frontend (in a new terminal):
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Screenshots

### Login Page
> Clean and minimal login/signup screen

### Dashboard & Kanban Board
> Track all applications across stages in a visual Kanban layout

### AI Job Analyzer
> Paste any job description to get skill requirements, experience level, and resume tips

---

## 👤 Author

**Syed Abdul Rafay**  
Software Engineering Graduate — Bahria University Karachi  
[GitHub](https://github.com/sarafay2003)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
