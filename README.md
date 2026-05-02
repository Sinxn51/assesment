# Multi-Community E-Commerce Platform

A personalized shopping platform where users shop based on their religious and cultural community identity.

## Tech Stack

### Frontend
- React 18 with Vite
- React Router v6 for navigation
- Axios for API calls
- CSS Modules for styling
- Google Fonts (Playfair Display, Inter)

### Backend
- Node.js with Express
- RESTful API architecture
- CORS enabled
- JSON file-based data store

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

## Features Implemented

1. **Community Selection** - 5 communities with localStorage persistence
2. **Personalized Home** - Dynamic content based on selected community
3. **Product Catalog** - 20+ products across communities
4. **Product Details** - Full product page with VTO modal
5. **Shopping Cart** - Add/remove items, quantity management
6. **Responsive Design** - Mobile-first approach

## Design Decisions

- **Separation of Concerns**: Clean frontend/backend split for scalability
- **RESTful API**: Standard HTTP methods for predictable behavior
- **localStorage**: Client-side community preference for quick access
- **Component Architecture**: Reusable React components
- **CSS Modules**: Scoped styling to prevent conflicts

## What I Would Improve

- Add authentication and user profiles
- Implement real payment gateway integration
- Add product search and filtering
- Implement wishlist functionality
- Add product reviews and ratings system
- Use PostgreSQL/MongoDB for production data
- Add Redis for caching
- Implement CDN for product images
- Add comprehensive error handling
- Write unit and integration tests
- Add analytics tracking
- Implement SEO optimization
- Add PWA capabilities for mobile

## API Endpoints

- `GET /api/products` - Get all products (with community filter)
- `GET /api/products/:id` - Get single product
- `GET /api/categories/:community` - Get categories by community
- `GET /api/communities` - Get all communities

## Brand Guidelines

- Primary: #0D1B2A (Deep Navy)
- Accent: #C9A84C (Gold)
- Background: #F9F7F4
- Surface: #FFFFFF
- Headings: Playfair Display
- Body: Inter
