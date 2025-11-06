# URL Summarize

A Chrome browser extension built with React, TypeScript, and Vite that displays the current tab URL and provides quick access to summarize pages using ChatGPT.

## Features

- 📍 **Current Tab URL Display**: Automatically shows the URL of the currently active browser tab
- 🤖 **ChatGPT Integration**: One-click button to open ChatGPT with a pre-filled prompt to summarize the current page in Portuguese
- 🎨 **Dark Mode UI**: Beautiful dark-themed interface built with Tailwind CSS
- ⚡ **Fast & Modern**: Built with React 19, TypeScript, and Vite for optimal performance

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **@crxjs/vite-plugin** - Chrome extension development
- **ESLint** - Code linting

## Prerequisites

- Node.js 18+ and npm
- Chrome browser (for testing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-summarizer
```

2. Install dependencies:
```bash
npm install
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder from the project directory

3. The extension popup will be available in your Chrome toolbar

## Building

Build the extension for production:

```bash
npm run build
```

The built extension will be in the `dist` folder, and a zip file will be created in the `release` folder.

## Project Structure

```
url-summarizer/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── main.css         # Global styles
├── manifest.config.ts   # Chrome extension manifest
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Permissions

The extension requires the following permissions:

- `tabs` - To access and query information about browser tabs

## Usage

1. Click the extension icon in your Chrome toolbar
2. The popup will display the current tab's URL
3. Click "Summarize on ChatGPT" to open ChatGPT with a pre-filled prompt containing the current URL and a request to summarize in Portuguese

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Browser Compatibility

- Chrome (Manifest V3)
- Other Chromium-based browsers (Edge, Brave, etc.)

## License

Private project
