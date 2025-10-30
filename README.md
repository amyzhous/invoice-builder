# Invoice Builder App

A simple, professional invoice builder built with React, TypeScript, and Tailwind CSS.

## Features

- Create professional invoices with customizable fields
- Add multiple line items with automatic calculations
- Adjustable tax rates
- Print-friendly design
- Clean, modern interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the app in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building

Build the app for production:

```bash
npm run build
```

## Deploying to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to Settings > Pages
4. Set Source to "GitHub Actions"
5. The app will automatically deploy on every push to main

### Option 2: Manual Deployment

1. Update `vite.config.ts` to set the correct `base` URL (your repo name):
   ```ts
   base: '/your-repo-name/',
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

3. Go to your repository Settings > Pages and set the source to the `gh-pages` branch.

## Usage

1. Fill in the invoice date, billing information, and your information
2. Add line items with account, description, time, and rate
3. Adjust the tax rate if needed
4. Click "Print Invoice" to print or save as PDF

## License

MIT
