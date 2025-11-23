# Todo List Fullstack – Vite + React + Django + MySQL  
**Production-ready full-stack Todo Dashboard with Docker & Nginx + uWSGI**

A clean, modern, full-stack Todo application that demonstrates best practices for both development and production deployment.

Live demo ready in **one command**.

### Features
- React 18 + Vite + JavasScript + Material UI
- Django 5 backend (pure Django, no DRF) with MySQL
- Real CRUD operations with status color coding
- Production deployment: Nginx + uWSGI + multi-stage Docker builds
- Extremely small images (< 150 MB total)
- Single-command start: `docker-compose up --build`
- CORS fully configured

### Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | Vite + React + MUI + React Hook Form + Axios |
| Backend     | Django 5 + uWSGI + Python 3.11               |
| Database    | MySQL 8 (container name: `todomysql`)        |
| Web Server  | Nginx (static files + reverse proxy)         |
| Deployment  | Docker + Docker Compose (multi-stage)        |

### Project Structure

```
todo-fullstack-prod/
├── react-frontend/          React + Vite frontend
├── django-backend/            Django + uWSGI backend
├── nginx/                   Nginx config & Dockerfile
├── docker-compose.yml       One-command full stack
└── .dockerignore
```

### Quick Start (Production)

```bash
# 1. Clone the repo
git clone https://github.com/Lexiealwayswins/TodoList.git
cd ToDoList

# 2. Build and run everything (frontend + backend + db + nginx)
docker-compose up --build
```

Open http://localhost → Your full-stack Todo List app is live!

### Development (with hot reload)

```bash
# Frontend (Vite HMR)
cd react-frontend
npm run dev

# Backend (Django runserver)
cd django-backend
python manage.py runserver
```

### API Endpoints

| Method | URL                    | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/todos/`          | List all todos           |
| POST   | `/api/todos/`          | Create new todo          |
| PUT    | `/api/todos/<id>/`     | Update todo              |
| DELETE | `/api/todos/<id>/`     | Delete todo              |

Example POST body:
```json
{ "title": "Learn Docker" }
```

### Docker Images (multi-stage, tiny!)

| Service   | Base Image        | Final Size | Notes                     |
|-----------|-------------------|------------|---------------------------|
| Frontend  | nginx:alpine      | ~16 MB     | Serves Vite `dist`        |
| Backend   | python:3.11-slim  | ~78 MB     | uWSGI + compiled packages |
| MySQL     | mysql:8.0         | ~400 MB    | Official image            |
| Nginx     | nginx:alpine      | ~20 MB     | Reverse proxy             |

### Production Architecture

```
Browser
   ↓
Nginx (port 80) → /          → serves React static files
                → /api/      → proxy_pass → uWSGI (Django)
                → /admin/    → proxy_pass → uWSGI
                     ↓
                 MySQL (todomysql)
```

### Environment Variables (optional)

You can override MySQL credentials in `docker-compose.yml`:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: your_strong_password
  MYSQL_DATABASE: todo_db
  MYSQL_USER: todo_user
  MYSQL_PASSWORD: todo123
```

### Contributing

Feel free to fork, star, or open issues/PRs!

### License

MIT License – free to use in portfolios, interviews, and commercial projects.

Made with love for clean code and tiny Docker images. Happy coding!