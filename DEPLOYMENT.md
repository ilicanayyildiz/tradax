# Deployment Guide for TradaX

This guide will help you deploy your TradaX application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Supabase project already set up (see SETUP.md)

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/your-username/tradax.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will automatically detect Next.js

## Step 3: Configure Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

**Important**: Get these from your Supabase project (Settings → API)

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-app.vercel.app`

## Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Step 6: Configure Supabase for Production

1. Go to your Supabase project
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel domain to **Site URL**
4. Add to **Redirect URLs**:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/**`

## Step 7: Test Production Site

Visit your deployed site and test:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] User signup/login works
- [ ] Dashboard accessible after login
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Dark mode works

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push
```

Your site will automatically rebuild and deploy!

## Performance Optimization

After deployment, check:

1. **Lighthouse Score** (in Chrome DevTools)
   - Aim for 90+ in all categories

2. **Vercel Analytics** (enable in project settings)
   - Monitor real user metrics

3. **Edge Functions** (if needed)
   - Consider for API routes

## Troubleshooting

### Build Fails

**Check build logs in Vercel:**
- Look for TypeScript errors
- Check for missing dependencies
- Verify environment variables

**Common fixes:**
```bash
# Locally test the build
npm run build

# Fix TypeScript errors
npm run lint
```

### Authentication Not Working

1. Verify environment variables in Vercel
2. Check Supabase redirect URLs
3. Clear cookies and try again

### Images Not Loading

1. Check `next.config.js` for image domains
2. Verify image URLs are HTTPS
3. Add domains to Vercel image optimization

### Slow Performance

1. Enable Vercel Analytics
2. Optimize images (use Next.js Image component)
3. Consider ISR for article pages
4. Enable caching headers

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (keep secret!) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL |

## Security Checklist

- [ ] Environment variables properly set
- [ ] Service role key is secret (not exposed)
- [ ] RLS policies enabled in Supabase
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Email verification enabled
- [ ] Rate limiting configured

## Monitoring

1. **Vercel Logs**: Monitor errors and performance
2. **Supabase Dashboard**: Check database queries
3. **Analytics**: Track user behavior
4. **Uptime Monitoring**: Use UptimeRobot or similar

## Backup Strategy

1. **Database Backups**: 
   - Supabase Pro has automatic backups
   - Free tier: Manual exports via SQL

2. **Code Backups**:
   - GitHub serves as backup
   - Consider automated backups

## Scaling Considerations

As your site grows:

1. **Supabase**: Upgrade plan if needed
2. **Vercel**: Pro plan for better performance
3. **CDN**: Images via CDN
4. **Caching**: Implement Redis if needed

## Update Process

1. Make changes locally
2. Test thoroughly
3. Push to GitHub
4. Vercel auto-deploys
5. Verify production

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Select **Deployments**
3. Find previous working deployment
4. Click **"Promote to Production"**

---

Need help? Check the main README.md or open an issue!

