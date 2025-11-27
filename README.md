# AI-Assisted Collection Builder

A production-quality feature slice of an AI-powered collection creation flow, built with React and TypeScript. This project demonstrates the implementation of a complex wizard UI, simulated AI integration, and responsive design patterns.

## 🚀 Features

- **AI-Powered Wizard**: Conversational interface to generate collection templates based on user intent.
- **Real-time Preview**: Instant feedback with loading states (Cube -> Skeleton -> Result).
- **Responsive Design**: Pixel-perfect implementation of Figma designs, fully responsive from mobile to desktop.
- **Accessibility**: Keyboard navigation, focus management, and semantic HTML.
- **Mock AI API**: Simulated backend with realistic latency and error handling.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 3
- **State Management**: React Query (Server state), React Context/Hooks (Local state)
- **Testing**: Vitest (Unit), Playwright (E2E)
- **Icons**: Lucide React

## 🏗️ Architecture & Tradeoffs

This project was built to balance speed, maintainability, and the specific constraints of a "Weekend Project".

### 1. Routing Strategy
**Decision**: Used state-based routing (`useState`) for the wizard flow instead of a full router like React Router 7.
**Reasoning**: For a single-feature slice (the wizard), introducing a full client-side router adds unnecessary complexity. State-based routing allows for easier transition management and state persistence within the wizard context without the overhead of URL synchronization for every minor step.

### 2. Rendering Approach
**Decision**: Client-Side Rendering (SPA) with Vite.
**Reasoning**: While SSR (Server-Side Rendering) improves initial load for content-heavy sites, this is a highly interactive, client-heavy application. The complexity of setting up SSR with hydration for this specific scope outweighed the benefits, especially given the "local development only" constraint.

### 3. Library Versions
**Decision**: React 18 and Tailwind 3.
**Reasoning**: React 19 and Tailwind 4 are currently in beta/release candidate stages. To ensure stability and compatibility with the ecosystem (specifically `react-query` and IDE tooling), I opted for the stable, production-ready versions of these libraries.

### 4. AI Integration
**Decision**: Local Mock Server.
**Reasoning**: To ensure deterministic testing and offline development, the AI API is simulated locally. It mimics real-world conditions like network latency (1.5s - 2.5s delay) and error scenarios (e.g., triggering 500 errors with specific keywords).

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ (Tested on Node 22.x)

### Installation

```bash
npm install
```

### Development

Start the development server (Frontend + Mock API):

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

- **E2E (Playwright)**: Covers the critical "Happy Path" (User types prompt -> Loading -> Results -> Selection).
- **Unit (Vitest)**: Focuses on complex logic and isolated component rendering.

## 📝 License

MIT
