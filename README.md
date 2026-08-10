# TechNest

A full-stack tech blogging platform built with React and Express/MySQL. Users can register, log in, and publish rich-text articles under fixed categories; readers can browse, comment via reports (flag inappropriate posts), and admins get a moderation dashboard to review and clear reported content.

## Features

- **Auth** — register/login/logout with hashed passwords (bcrypt) and JWT stored in an HTTP-only cookie
- **Posts** — create, edit, delete articles with a rich-text editor (React Quill) and image upload
- **Categories** — browse posts by section: CodeCanvas, TechSphere, GadJet, XPlore
- **View tracking** — post view count increments on read
- **Reporting & moderation** — readers can report a post with a reason; admins see reported posts on an `/admin` dashboard and can clear the flag
- **Image uploads** — post cover images uploaded via Multer and served from `client/public/uploads`

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, React Router v6, React Quill, Axios, React Toastify, Sass |
| Backend  | Node.js, Express |
| Database | MySQL |
| Auth     | JWT + bcrypt, HTTP-only cookies |
| Uploads  | Multer |

## Project Structure

```
TechNest/
├── api/                  # Express backend
│   ├── controllers/      # Route handlers (auth, posts, users)
│   ├── routes/           # Express route definitions
│   ├── uploads/          # Server-side upload staging
│   ├── db.js             # MySQL connection
│   ├── myblog.sql        # Database schema
│   └── index.js          # App entry point (listens on :8800)
└── client/               # React frontend (Create React App)
    ├── public/uploads/   # Uploaded post images served to the client
    └── src/
        ├── components/   # Navbar, Menu, Footer, ReportReasons
        ├── context/      # AuthContext, ReportContext
        └── pages/        # Home, Blog, Single, Write, Login, Register, Admin, Welcome
```

## Getting Started

### Prerequisites

- Node.js and npm
- A running MySQL server

### 1. Database

Create a `myblog` database and run the schema in [`api/myblog.sql`](api/myblog.sql):

```bash
mysql -u root -p -e "CREATE DATABASE myblog"
mysql -u root -p myblog < api/myblog.sql
```

Update the connection details in `api/db.js` if your MySQL user/password differ from the defaults (`root` / empty password).

### 2. Backend

```bash
cd api
npm install
npm start
```

The API runs on `http://localhost:8800`.

### 3. Frontend

```bash
cd client
npm install
npm start
```

The React app runs on `http://localhost:3000` and proxies `/api` requests to the backend (see `proxy` in `client/package.json`).

## API Overview

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST   | `/api/auth/register` | Create a new user |
| POST   | `/api/auth/login` | Log in, sets `access_token` cookie |
| POST   | `/api/auth/logout` | Clear auth cookie |
| GET    | `/api/posts` | List posts (optionally `?cat=`) |
| GET    | `/api/posts/:id` | Get a single post, increments view count |
| POST   | `/api/posts` | Create a post (auth required) |
| PUT    | `/api/posts/:id` | Update a post (auth required, owner only) |
| DELETE | `/api/posts/:id` | Delete a post (auth required, owner only) |
| POST   | `/api/posts/:id/report` | Report a post with a reason |
| POST   | `/api/posts/unreportBlog/:id` | Clear a post's reported flag |
| GET    | `/api/posts/admin-info` | Admin summary: total & reported posts (admin only) |
| POST   | `/api/upload` | Upload an image, returns the stored filename |

## Notes

- Deployment is set up via `gh-pages` (see root `package.json`).
- This is a learning/portfolio project; secrets such as the JWT signing key are currently hardcoded in the backend and should be moved to environment variables before any production use.
