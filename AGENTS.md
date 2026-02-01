# Repository Guidelines

## Project Structure & Module Organization
- `apps/next/`: Next.js 16 frontend (App Router). UI components live in `apps/next/components/`, pages in `apps/next/app/`, utilities in `apps/next/lib/`.
- `apps/laravel/`: Laravel 12 API. Routes in `apps/laravel/routes/`, controllers in `apps/laravel/app/Http/Controllers/`, config in `apps/laravel/config/`, tests in `apps/laravel/tests/`.
- `docker/` + `docker-compose.yml`: Docker images and orchestration for local dev.
- `docs/architecture/next/`: Notes on Next.js architecture and components.

## Build, Test, and Development Commands
- `docker compose build --no-cache`: Rebuild all images from scratch.
- `docker compose up -d`: Start the stack in the background.
- `docker compose ps`: Check container status.
- `docker compose run --rm laravel bash -lc "composer install"`: Install PHP deps inside the Laravel container.
- `docker compose run --rm next sh -lc "npm install"`: Install Node deps inside the Next container.
- `apps/next`: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
- `apps/laravel`: `npm run dev` (Vite assets), `npm run build` (Vite build), `php artisan test`.

## SSO / Keycloak Local Workflow
- Keycloak runs on `http://localhost:8080` via Docker (`keycloak` service).
- Default admin login: `admin` / `admin` (set in `docker-compose.yml`).
- Realm/client setup is manual right now; use `master` or create a realm and a client matching `apps/laravel/config/keycloak.php` defaults (`client_id=laravel-app`, redirect `http://localhost:8000/auth/callback`).
- Laravel uses these env vars when needed: `KEYCLOAK_BASE_URL`, `KEYCLOAK_REALM`, `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_REDIRECT_URI`, `FRONTEND_URL`.

## Coding Style & Naming Conventions
- Follow existing conventions in neighboring files; keep changes minimal and consistent.
- JavaScript/TypeScript: lint with `npm run lint` in `apps/next`.
- PHP/Laravel: format with `apps/laravel/vendor/bin/pint --dirty`.
- Use descriptive names for routes, controllers, and components (e.g., `LoginController`, `TableOfContents`).

## Testing Guidelines
- Laravel uses PHPUnit; tests live in `apps/laravel/tests/Feature/` and `apps/laravel/tests/Unit/`.
- Run all tests: `php artisan test`.
- Run a single file: `php artisan test tests/Feature/ExampleTest.php`.
- No frontend test framework is configured yet; add one only if needed for new features.

## Commit & Pull Request Guidelines
- Commit messages use prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`.
- PRs should include a concise description, link to relevant issues, and screenshots for UI changes.

## Configuration & Security Notes
- Laravel environment config lives in `apps/laravel/.env` (copy from `.env.example` if missing).
- Service config is in `apps/laravel/config/`; container settings are in `docker-compose.yml`.
