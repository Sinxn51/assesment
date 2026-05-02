# Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from root directory**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? (press enter for default)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Easier)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: **.**
   - Build Command: Leave empty (handled by vercel.json)
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Click Deploy**

## Important Notes

### Environment Variables
No environment variables needed for this project since we're using relative API paths.

### How It Works
- Frontend builds to static files
- Backend runs as serverless function
- All `/api/*` routes go to backend
- All other routes serve frontend

### Vercel Configuration
The `vercel.json` file handles:
- Building both frontend and backend
- Routing API calls to backend
- Serving frontend static files

### API URL Handling
The frontend automatically detects environment:
- **Development**: Uses `http://localhost:5000/api`
- **Production**: Uses `/api` (same domain)

## Testing Deployment

After deployment, test these URLs:
- `https://your-app.vercel.app/` - Onboarding page
- `https://your-app.vercel.app/api/communities` - API endpoint
- `https://your-app.vercel.app/api/products` - Products API

## Troubleshooting

### Build Fails
- Check that both `frontend/package.json` and `backend/package.json` exist
- Ensure all dependencies are in package.json (not devDependencies for backend)

### API Not Working
- Check Vercel logs: Dashboard → Your Project → Deployments → Click deployment → Functions tab
- Verify `/api/*` routes are hitting the backend

### Frontend Not Loading
- Check build output in deployment logs
- Verify `frontend/dist` folder is created during build

## Alternative: Deploy Separately

If you prefer to deploy frontend and backend separately:

### Frontend Only (Vercel)
```bash
cd frontend
vercel
```
Update `frontend/src/api.js` with your backend URL.

### Backend Only (Vercel)
```bash
cd backend
vercel
```

### Backend on Other Platforms
- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Free tier available, easy setup
- **Heroku**: Classic choice for Node.js apps

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys to production
- Pull requests get preview deployments
- Rollback available in dashboard

---

**Your app is now live! 🚀**
