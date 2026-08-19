# Portfolio - Sergio Penagos

> A full-stack portfolio website showcasing projects, skills, and freelance services.

## Live Demo

[Portfolio](https://gioudi.github.io/portfolio/)

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.2.13 | UI Framework |
| TypeScript | 4.5.5 | Type Safety |
| Pinia | 2.1.7 | State Management |
| Vue Router | 4.0.3 | Client-side Routing |
| Bulma | 0.9.4 | CSS Framework |
| Sass | 1.32.7 | CSS Preprocessor |
| VeeValidate | 4.14.4 | Form Validation |
| Yup | 1.4.0 | Schema Validation |
| Axios | 1.7.7 | HTTP Client |
| Vue I18n | 9.14.3 | Internationalization |
| AOS | 2.3.4 | Scroll Animations |
| FilePond | 4.31.4 | File Uploads |
| Jest | 27 | Unit Testing |
| Cypress | 9.7.0 | E2E Testing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Runtime |
| Flask | 3.0.0 | Web Framework |
| SQLAlchemy | 2.0.23 | ORM |
| PostgreSQL | 14+ | Database |
| pg8000 | 1.30.3 | Database Driver |
| PyJWT | 2.8.0 | Authentication |
| bcrypt | 4.1.2 | Password Hashing |
| Cloudinary | 1.36.0 | Media Storage |
| Flask-CORS | 4.0.0 | Cross-origin Requests |

### DevOps & Tools
| Tool | Purpose |
|------|---------|
| Git | Version Control |
| GitHub | Repository Hosting |
| ESLint | Code Linting |
| Prettier | Code Formatting |
| Husky | Git Hooks |
| lint-staged | Pre-commit Checks |

---

## Project Structure

```
portfolio/
├── backend/                    # Python Flask API
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── models/             # SQLAlchemy models
│   │   ├── repositories/       # Data access layer
│   │   ├── services/           # Business logic
│   │   └── utils/              # Helpers (JWT, Cloudinary)
│   ├── config.py               # Environment config
│   ├── main.py                 # Entry point
│   └── requirements.txt        # Python dependencies
├── client/                     # Vue.js Frontend
│   ├── src/
│   │   ├── assets/             # Images, PDFs
│   │   ├── components/         # Reusable components
│   │   ├── router/             # Vue Router config
│   │   ├── store/              # Pinia stores
│   │   ├── styles/             # SCSS stylesheets
│   │   └── views/              # Page components
│   ├── public/                 # Static files
│   ├── package.json            # Node dependencies
│   └── vue.config.js           # Vue CLI config
└── docs/                       # Documentation
    └── specs/                  # Feature specifications
```

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **npm** (v8+) or **yarn** (v1.22+)
- **Python** (3.11+) - [Download](https://python.org/)
- **pip** (21+)
- **PostgreSQL** (14+) - [Download](https://postgresql.org/)
- **Git** - [Download](https://git-scm.com/)

Optional:
- **VS Code** - Recommended IDE
- **Docker** - For containerized setup

---

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:gioudi/portfolio.git
cd portfolio
```

### 2. Frontend Setup

```bash
cd client
npm install
```

### 3. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Environment Variables

Create `.env` file in `backend/` directory:

```env
# Database
POSTGRES_DB=portfolio
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Authentication
SECRET_API_KEY=your_jwt_secret_key
DEFAULT_USER=sergiopenagos
DEFAULT_PASSWORD=your_password
DEFAULT_EMAIL=sergiopenagos881@gmail.com

# Cloudinary (for media uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Project Types
DEFAULT_PROJECT_TYPE_1=Web Application
DEFAULT_PROJECT_TYPE_2=Mobile App
DEFAULT_PROJECT_TYPE_3=API
```

---

## Running the Project

### Start Backend

```bash
cd backend/src
python main.py
```

Backend runs at: `http://localhost:5000`

### Start Frontend

```bash
cd client
npm run serve
```

Frontend runs at: `http://localhost:8080`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/login` | Login and get JWT token | No |

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | No |
| POST | `/api/projects` | Create a new project | Yes |

### Project Types
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/project-types` | Get all project types | Yes |

---

## Testing

### Unit Tests (Frontend)

```bash
cd client
npm run test:unit
```

### E2E Tests (Frontend)

```bash
cd client
npm run test:e2e
```

### Linting

```bash
cd client
npm run lint
```

---

## Architecture

### Backend Pattern: Repository Pattern

```
Controller → Service → Repository → Database
```

- **Controller:** Handles HTTP requests/responses
- **Service:** Contains business logic
- **Repository:** Data access and queries
- **Model:** Database schema definition

### Frontend Pattern: Component-Based Architecture

```
View → Component → Store → API
```

- **View:** Page-level components
- **Component:** Reusable UI elements
- **Store (Pinia):** State management
- **API (Axios):** Backend communication

---

## Available Scripts

### Frontend (`client/`)

| Script | Description |
|--------|-------------|
| `npm run serve` | Start dev server |
| `npm run build` | Build for production |
| `npm run test:unit` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint code |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `python main.py` | Start Flask server |
| `pip install -r requirements.txt` | Install dependencies |

---

## Deployment

### Frontend (GitHub Pages)

```bash
cd client
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Backend (Free Tier Options)

| Platform | Free Tier |
|----------|-----------|
| Render | 750 hours/month |
| Railway | $5 credit |
| Fly.io | 3 shared VMs |

---

## Known Issues

See [PORTFOLIO_REVIEW.txt](./PORTFOLIO_REVIEW.txt) for detailed analysis.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Authors

- **Sergio Penagos** - [@gioudi](https://github.com/gioudi)
- **SergioVass** - [@SergioVass](https://github.com/SergioVass)
- **LinkedIn** - [Sergio Penagos](https://www.linkedin.com/in/analyst-sergio-penagos/)

---

## License

This project is [MIT](./LICENSE) licensed.

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>
