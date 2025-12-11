

# Collection Builder

Collection Builder is a modern, production-quality web application for building and managing group gifting collections. Built with React and TypeScript, it features a robust wizard UI, responsive design, accessibility, and a maintainable, scalable codebase.



## 🚀 Features

- **Wizard Flow**: Step-by-step interface to create and customize collection templates.
- **Real-time Preview**: Instant feedback with loading states (Cube → Skeleton → Result).
- **Responsive Design**: Fully responsive from mobile to desktop.
- **Accessibility**: Keyboard navigation, focus management, semantic HTML, and ARIA best practices.
- **Mock API**: Simulated backend for local development and testing.
- **Centralized State & Constants**: All static data and templates are managed in `src/constants/templates.ts` for maintainability.



## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 3
- **State Management**: React Query (server state), React Context/Hooks (local state)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Icons**: Lucide React



## 🏗️ Architecture & Best Practices

- **Routing**: Uses React Router for scalable, URL-synced navigation.
- **Rendering**: Client-side rendering (SPA) with Vite for fast development and production builds.
- **Component Design**: Modular, reusable, and accessible components with clear separation of concerns.
- **API Layer**: Mock API for local development and testing, simulating real-world latency and error scenarios.
- **Constants & Data**: All static templates and defaults are managed in `src/constants/templates.ts`.
- **Accessibility**: All interactive elements use semantic HTML and ARIA attributes for screen reader support.
## 📁 Project Structure

```
src/
	components/         # Reusable UI components
	constants/          # Centralized static data and templates
	api/                # Mock API and data fetching logic
	hooks/              # Custom React hooks
	lib/                # Utilities and storage logic
	types/              # TypeScript types and interfaces
	...
```

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features. All code should follow the existing style and best practices.



## 🚦 Getting Started


### Prerequisites
- Node.js 18+ (Tested on Node 22.x)


### Installation

```bash
npm install
```


### Development

Start the development server:

```bash
npm run dev
```


### Testing


Run unit tests:
```bash
npm run test:unit
```

Run E2E tests:
```bash
npm run test
```


### Production Build

```bash
npm run build
npm run preview
```



## 🧪 Testing Strategy

- **E2E (Playwright)**: Covers the critical "Happy Path" (user flow from start to finish).
- **Unit (Vitest)**: Focuses on complex logic and isolated component rendering.

## 🛡️ Maintainability

- All static data and templates are managed in `src/constants/templates.ts`.
- Components are written to be reusable, accessible, and easy to test.
- State management uses idiomatic React patterns and React Query for async data.
- Codebase is linted and follows modern TypeScript and React best practices.



## 📝 License

MIT
