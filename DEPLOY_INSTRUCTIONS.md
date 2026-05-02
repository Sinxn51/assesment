# Deploy to Vercel - Separate Services

## Step 1: Deploy Backend First

```bash
cd backend
vercel --prod
```

When prompted:
- Project name: `community-backend`
- Copy the deployment URL (e.g., `https://community-backend.vercel.app`)

## Step 2: Update Frontend API URL

Edit `frontend/vercel.json` and replace the backend URL:
```json
{
    "rewrites": [
        {
            "source": "/api/:path*",
            "destination": "YOUR_BACKEND_URL/api/:path*"
        }
    ]
}
```

## Step 3: Deploy Frontend

```bash
cd frontend
vercel --prod
```

When prompted:
- Project name: `community` or `community-frontend`

## Done!

Your app will be live at the frontend URL.

---

## Alternative: Deploy via Dashboard

### Backend:
1. Go to https://vercel.com
2. New Project → Import `backend` folder
3. Framework: Other
4. Root Directory: `backend`
5. Deploy

### Frontend:
1. New Project → Import `frontend` folder  
2. Framework: Vite
3. Root Directory: `frontend`
4. Environment Variables:
   - `VITE_API_URL` = your backend URL
5. Deploy

Then update `frontend/src/api.js`:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});
```
