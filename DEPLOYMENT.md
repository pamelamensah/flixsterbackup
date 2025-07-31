# Flixster Deployment Guide

This guide will help you deploy your Flixster application to various hosting platforms.

## Prerequisites

1. **TMDB API Key**: You need a TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Environment Variables

Create a `.env` file in your project root with your TMDB API key:

```env
VITE_API_KEY=your_tmdb_api_key_here
```

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Connect to Git**:
   - Go to [Netlify](https://netlify.com)
   - Sign up/Login with your Git provider
   - Click "New site from Git"

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Set Environment Variables**:
   - Go to Site settings > Environment variables
   - Add `VITE_API_KEY` with your TMDB API key

4. **Deploy**:
   - Netlify will automatically build and deploy your site
   - Your site will be available at `https://your-site-name.netlify.app`

### Option 2: Vercel

1. **Connect to Git**:
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with your Git provider
   - Click "New Project"

2. **Configure Project**:
   - Import your repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Set Environment Variables**:
   - Go to Project settings > Environment Variables
   - Add `VITE_API_KEY` with your TMDB API key

4. **Deploy**:
   - Vercel will automatically build and deploy your site
   - Your site will be available at `https://your-project-name.vercel.app`

### Option 3: Render

1. **Connect to Git**:
   - Go to [Render](https://render.com)
   - Sign up/Login with your Git provider
   - Click "New +" > "Static Site"

2. **Configure Build Settings**:
   - Name: `flixster`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**:
   - Go to Environment > Environment Variables
   - Add `VITE_API_KEY` with your TMDB API key

4. **Deploy**:
   - Render will automatically build and deploy your site
   - Your site will be available at `https://your-site-name.onrender.com`

### Option 4: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to Pages section
   - Select source as "Deploy from a branch"
   - Select `gh-pages` branch

## Testing Your Deployment

After deployment, test these features:

1. ✅ Movie grid loads correctly
2. ✅ Search functionality works
3. ✅ Movie details modal opens
4. ✅ Sorting options work
5. ✅ Favorite/Watched buttons function
6. ✅ Responsive design on mobile

## Troubleshooting

### Common Issues

1. **API Key Not Working**:
   - Ensure `VITE_API_KEY` is set correctly in your hosting platform
   - Check that the API key has proper permissions

2. **Build Failures**:
   - Check the build logs in your hosting platform
   - Ensure all dependencies are in `package.json`

3. **Routing Issues**:
   - Ensure your hosting platform supports SPA routing
   - Check that redirect rules are configured correctly

### Performance Optimization

1. **Enable Compression**: Most hosting platforms enable gzip compression automatically
2. **CDN**: Use a CDN for faster global delivery
3. **Caching**: Configure proper cache headers for static assets

## Security Considerations

1. **API Key**: Never commit your API key to version control
2. **Environment Variables**: Use environment variables for sensitive data
3. **HTTPS**: Ensure your deployment uses HTTPS

## Monitoring

1. **Error Tracking**: Consider adding error tracking (Sentry, LogRocket)
2. **Analytics**: Add analytics to track user behavior
3. **Performance**: Monitor Core Web Vitals

## Support

If you encounter issues:

1. Check the hosting platform's documentation
2. Review build logs for error messages
3. Test locally with `npm run build` and `npm run preview`
4. Ensure all environment variables are set correctly 