````md
# 📊 AI Sales Dashboard

Dashboard analitik penjualan berbasis web yang dilengkapi dengan visualisasi data interaktif dan asisten AI untuk menjawab pertanyaan terkait data secara real-time.

---

# 🖥️ Overview

AI Sales Dashboard membantu pengguna memantau performa penjualan melalui berbagai visualisasi data seperti KPI, grafik, dan tabel transaksi. Selain itu, aplikasi ini memiliki fitur AI Chat Assistant yang mampu menjawab pertanyaan berdasarkan data dashboard secara langsung.

---

# ✨ Main Features

## 📌 Dashboard (`/`)
Halaman utama yang menampilkan ringkasan performa penjualan.

### Features:
- 📈 KPI Cards
  - Total Revenue
  - Total Transactions
  - Units Sold
  - Total Profit
- 📉 Revenue Trend Line Chart
- 📊 Revenue by Region Bar Chart
- 🥧 Product Distribution Pie Chart
- 📋 Latest Transaction Table

---

## 📊 Analytics (`/analytics`)
Halaman analitik dengan filter dinamis untuk eksplorasi data lebih detail.

### Available Filters:
- 🏷️ Product Category
  - Furniture
  - Electronics
  - Clothing
  - Grocery
  - Automobile

- 🗺️ Region
  - East
  - West
  - North
  - South

- 📅 Year
  - 2025

### Additional Features:
- 🔄 Reset Filter Button
- 📌 Dynamic Mini Statistics
  - Revenue
  - Profit
  - Units Sold
  - Total Rows

---

## 🤖 AI Chat Assistant (`/chat`)
Asisten AI berbasis data dashboard.

### Capabilities:
- Menjawab pertanyaan terkait:
  - Revenue
  - Sales Trend
  - Regional Performance
  - Product Distribution
- Menggunakan konteks data dashboard secara real-time
- Hanya memberikan jawaban berdasarkan dataset yang tersedia

### AI Configuration:
- Provider: Groq
- Model: `llama-3.1-8b-instant`

---

# 🛠️ Tech Stack

## Frontend

| Technology | Usage |
|---|---|
| React 19 | Main UI Library |
| Vite | Build Tool & Dev Server |
| React Router DOM | Routing |
| Recharts | Data Visualization |
| Tailwind CSS | Styling |
| Lucide React | Icons |

---

## Backend

| Technology | Usage |
|---|---|
| Express.js | API Server |
| OpenAI SDK | Groq API Client |
| CORS | API Access Configuration |
| dotenv | Environment Variables |

---

## Data & AI

### Dataset
Static dataset located in:

```bash
src/data/salesDatabase.js
````

### Dataset Fields

```js
{
  Region: "East",
  Salesperson: "Alice",
  Revenue: 137118,
  Profit: 10067,
  Units_Sold: 219,
  Product_Category: "Furniture",
  Sales_Channel: "Retail",
  Date: "2025-01-15"
}
```

### Product Categories

* Furniture
* Electronics
* Clothing
* Grocery
* Automobile

### Sales Channels

* Retail
* Online
* Wholesale

---

# 📁 Project Structure

```bash
FinalProjectDavis-main/
│
├── src/
│   ├── components/
│   │   ├── AiChatBox.jsx
│   │   ├── BarChartCard.jsx
│   │   ├── CustomDropdown.jsx
│   │   ├── DataTable.jsx
│   │   ├── KpiCard.jsx
│   │   ├── LineChartCard.jsx
│   │   ├── PieChartCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   │
│   ├── data/
│   │   └── salesDatabase.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AnalyticsPage.jsx
│   │   └── ChatPage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── .env
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js v18+
* npm v8+
* Groq API Key

---

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your API Key from:

[Groq Console](https://console.groq.com?utm_source=chatgpt.com)

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

This command runs:

* Express Server → `localhost:5000`
* Vite Frontend → `localhost:5173`

Open:

```bash
http://localhost:5173
```

---

# ⚙️ Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Run frontend + backend    |
| `npm run server`  | Run Express server only   |
| `npm run build`   | Build production frontend |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint                |

---

# 🔌 API Endpoint

## POST `/api/chat`

Send message to AI Assistant.

### Request Body

```json
{
  "messages": [
    {
      "text": "What is the total revenue?",
      "type": "user"
    }
  ],
  "contextData": "Summary Stats: {...}"
}
```

### Response

```json
{
  "reply": "Based on the dashboard data, the total revenue is..."
}
```

---

# 🔒 Security Notes

* `.env` file is excluded using `.gitignore`
* Groq API Key is stored securely on the server side
* Frontend never accesses Groq API directly
* All AI requests pass through Express API

---

# 🐛 Troubleshooting

## `GROQ_API_KEY not found`

Make sure your `.env` file exists and contains:

```env
GROQ_API_KEY=sk-...
```

---

## Port already in use

Change port configuration in:

* `server.js`
* `vite.config.js`

---

## AI Chat not responding

Make sure Express server is running.

Use:

```bash
npm run dev
```

instead of running Vite only.

---

## Charts not showing

Install dependencies first:

```bash
npm install
```

---

# 📄 License

This project was created for academic purposes (Final Project) and is free to use for learning and development.

```
```
