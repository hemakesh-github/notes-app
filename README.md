
## Student credentials
- **Name:** Muppidi Hemakesh Reddy
- **Student ID:** 2026201013


## Prerequisites

- Node.js (v18+)
- MongoDB Community Server running locally on `localhost:27017` (or via the
  `MONGO_URI` environment variable)

## Setup & Run

### 1. Backend (server/)

```bash
cd server
npm install
npm start        # Runs on http://localhost:5000
```

### 2. Frontend (client/)

```bash
cd client
npm install
npm run dev      # Runs on http://localhost:5173
```

Open `http://localhost:5173` in a browser to use the app.

## API 

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- | 
| POST   | `/api/notes`       | Create a note (title, content)               | 
| GET    | `/api/notes`       | List all notes, newest first                 | 
| DELETE | `/api/notes/:id`   | Delete a note by `_id`                       |

## Configuration

- Server port: `5000` (override with `PORT`).
- MongoDB URI: `mongodb://localhost:27017/notes_db` (override with `MONGO_URI`).
- Vite dev server: `5173`. The React client calls the API cross-origin at
  `http://localhost:5000/api` via Axios.
- CORS is enabled server-side to permit cross-origin requests from
  `http://localhost:5173`.
