# Senior NexCore

A full-stack community platform that connects people who want to share skills and learn from each other, with service providers who can fulfill their needs.

Built as a PerScholas capstone lab project using the MERN stack.

---

## Features

- **Authentication** — Register and login with JWT. Role assigned at signup (Senior or Provider).
- **Role-Based Access** — Seniors see skills, learning requests, and community board. Providers see a separate dashboard with open learning requests.
- **My Skills** — Full CRUD. Add, edit, and delete skills with proficiency levels (Beginner / Intermediate / Advanced).
- **Learning Requests** — Post what you want to learn. Track status (Open / In Progress / Completed). Open requests are visible to providers.
- **Community Board** — Bulletin board with sticky-note style posts. Categories: General, Event, Announcement, Workshop, Volunteer. RSVP (Will Attend / Might Attend) and Free/Paid badge per post.
- **My Profile** — Edit phone, date of birth, location, and bio. Stored separately from auth data.
- **Provider Dashboard** — Providers see all open learning requests and can send offers.

---

## Tech Stack

### Frontend

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19      | UI library              |
| TypeScript   | 6       | Type safety             |
| Vite         | 8       | Build tool & dev server |
| React Router | v7      | Client-side routing     |
| Tailwind CSS | v4      | Styling                 |
| Axios        | 1.x     | HTTP requests           |
| lucide-react | 1.x     | Icons                   |

### Backend

| Technology         | Version | Purpose               |
| ------------------ | ------- | --------------------- |
| Node.js            | —      | Runtime               |
| Express            | v5      | Web framework         |
| MongoDB + Mongoose | 9.x     | Database & ODM        |
| bcrypt             | 6.x     | Password hashing      |
| jsonwebtoken       | 9.x     | JWT auth              |
| dotenv             | 17.x    | Environment config    |
| cors               | 2.x     | Cross-origin requests |

---

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint                        | Auth           | Description             |
| ------ | ------------------------------- | -------------- | ----------------------- |
| POST   | `/api/auth/register`          | No             | Register with role      |
| POST   | `/api/auth/login`             | No             | Login, returns JWT      |
| GET    | `/api/auth/me`                | Yes            | Get current user        |
| GET    | `/api/skills`                 | Yes            | Get my skills           |
| POST   | `/api/skills`                 | Yes            | Add a skill             |
| PUT    | `/api/skills/:id`             | Yes            | Update a skill          |
| DELETE | `/api/skills/:id`             | Yes            | Delete a skill          |
| GET    | `/api/learning-requests`      | Yes            | Get my requests         |
| GET    | `/api/learning-requests/open` | Yes (Provider) | Get all open requests   |
| POST   | `/api/learning-requests`      | Yes            | Create a request        |
| PUT    | `/api/learning-requests/:id`  | Yes            | Update a request        |
| DELETE | `/api/learning-requests/:id`  | Yes            | Delete a request        |
| GET    | `/api/posts`                  | Yes            | Get all community posts |
| POST   | `/api/posts`                  | Yes            | Create a post           |
| PUT    | `/api/posts/:id`              | Yes            | Update own post         |
| DELETE | `/api/posts/:id`              | Yes            | Delete own post         |
| GET    | `/api/profile`                | Yes            | Get profile             |
| PUT    | `/api/profile`                | Yes            | Save profile            |

---

## Deployment

Deployed on [Render](https://render.com):

- **Backend** — Web Service (Node.js), environment variables set in Render dashboard
- **Frontend** — Static Site (Vite build), `VITE_API_URL` set to backend URL
