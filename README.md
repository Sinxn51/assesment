# Multi-Community E-Commerce Platform

A personalized shopping platform where users shop based on their religious and cultural community identity.

## Primary Tech Stack / Tools Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with custom CSS
- **Google Fonts** - Playfair Display (headings) & Inter (body)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **ES6 Modules** - Modern JavaScript syntax

### Deployment & Tools
- **Vercel** - Hosting platform (frontend + backend)
- **Git & GitHub** - Version control
- **npm** - Package manager

### Data Storage
- **JSON files** - Product and community data (backend/data/)

## Tech Stack

### Frontend
- React 18 with Vite
- React Router v6 for navigation
- Axios for API calls
- CSS Modules for styling
- Google Fonts (Playfair Display, Inter)

### Backend (Detailed)
- Node.js with Express
- RESTful API architecture
- CORS enabled
- JSON file-based data store
- ES6 module syntax

## Deployment

### Deploy to Vercel (Recommended)

**Quick Deploy:**
```bash
npm install -g vercel
vercel login
vercel
```

**Or via GitHub:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"

The app will be live at `https://your-app.vercel.app`

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## Project Structure

```
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── backend/           # Express API
│   ├── data/
│   ├── routes/
│   └── server.js
└── README.md
```

## How to Run

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
App runs on http://localhost:5173

Open http://localhost:5173 in your browser

##