# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


## Firebase Dynamic Content Configuration

The app now fetches dynamic content from Firebase Firestore. To set up the required data:

### Database Scripts

For comprehensive database management (events, projects, board members), see the dedicated guides:
- **[DATABASE_SCRIPTS_GUIDE.md](./docs/DATABASE_SCRIPTS_GUIDE.md)** - Complete reference for all database operations
- **[SEED_PROJECTS.md](./docs/SEED_PROJECTS.md)** - Projects management guide
- **[SEED_EVENTS.md](./docs/SEED_EVENTS.md)** - Events management guide

#### Quick Commands

```bash
# Seed all data (events, projects, board members)
npm run seed

# Or seed individual collections
npm run seed:events           # Load all events from events.json
npm run seed:projects         # Load all projects from projects.json

# Add individual items (without replacing all data)
npm run add:event             # Add one event
npm run add:project           # Add one project
```

### 1. **Upcoming Event** (Mobile Rotaract Section)
Create a document in Firestore at `settings/upcomingEvent` with the following structure:
```json
{
  "title": "Event Title",
  "description": "Event description text that appears in the mobile view"
}
```

**Example:**
```json
{
  "title": "Spider-Man: Brand New Day",
  "description": "Join the Rotaract Club of Kitengela for an unforgettable movie night! Enjoy Spider-Man: Brand New Day while supporting meaningful community projects. A portion of every ticket purchased helps fund our service initiatives, youth programs, and outreach activities."
}
```

### 2. **Footer Slogan**
Create a document in Firestore at `settings/slogan` with the following structure:
```json
{
  "text": "Your slogan text here"
}
```

**Example:**
```json
{
  "text": "Service Above Self"
}
```

### How to Create These Documents in Firebase Console

1. Navigate to your Firebase project console
2. Go to **Firestore Database**
3. Create a new collection called `settings` (if it doesn't exist)
4. Create two documents:
   - Document ID: `upcomingEvent` with fields `title` (string) and `description` (string)
   - Document ID: `slogan` with field `text` (string)

### Fallback Values

If Firebase documents are not found or there's an error fetching them, the app will use these default values:
- **Upcoming Event**: "Spider-Man: Brand New Day" with the original movie description
- **Slogan**: "Rotaract - Service Above Self"

This ensures the app remains functional even if Firebase data is unavailable.
