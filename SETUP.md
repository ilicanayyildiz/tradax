# TradaX Setup Guide

Follow these steps to set up your TradaX finance portal locally.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git installed

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new account if you don't have one
2. Create a new project
3. Wait for the project to be set up (takes about 2 minutes)

## Step 3: Set Up Database

1. In your Supabase project, go to the **SQL Editor**
2. Create a new query
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click **Run** to execute the schema

This will create:
- All necessary tables (profiles, articles, categories, comments, etc.)
- Row Level Security (RLS) policies
- Triggers and functions
- Default categories

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

2. Get your Supabase credentials:
   - Go to your Supabase project
   - Click on **Settings** → **API**
   - Copy the **Project URL** and **anon/public key**

3. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## Step 6: Create Your First Admin User

1. Go to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Create an account
3. Check your email for verification link
4. After verifying, you need to manually set your role to 'admin':
   - Go to Supabase Dashboard
   - Click on **Table Editor**
   - Select the **profiles** table
   - Find your user
   - Change the `role` field from `reader` to `admin`
   - Save

Now you have full admin access!

## Step 7: Test the Application

- **Homepage**: Browse featured and latest articles
- **Articles**: View all articles
- **Categories**: Browse by category (Forex, Crypto, Commodities, etc.)
- **Authors**: See all authors
- **Tools**: Use trading calculators and economic calendar
- **Dashboard**: Access your admin dashboard (requires login)

## Optional: Add Sample Data

You can manually add some test articles:

1. Login with your admin account
2. Go to Dashboard
3. Click "New Article"
4. Create a few test articles

Or use Supabase Table Editor to insert data directly.

## Troubleshooting

### "Could not resolve @supabase/ssr"
```bash
npm install @supabase/ssr
```

### "Module not found: clsx"
```bash
npm install clsx tailwind-merge
```

### "Authentication not working"
- Make sure your `.env.local` has the correct Supabase credentials
- Check that you've run the schema.sql in Supabase
- Verify email confirmation if required

### "Cannot read properties of undefined"
- Clear your browser cache and cookies
- Restart the development server
- Check browser console for specific errors

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Update `NEXT_PUBLIC_SITE_URL` to your production URL
6. Deploy!

## Next Steps

- Customize the design in `tailwind.config.ts`
- Add your own branding
- Create real content
- Configure email settings in Supabase
- Add custom domain
- Enable analytics

## Support

For issues or questions, check the main README.md or open an issue on GitHub.

---

Happy Trading! 📈

