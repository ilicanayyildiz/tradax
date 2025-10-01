# TradaX - Professional Finance & Forex Portal

A modern, full-featured finance and forex portal built with Next.js 14, TypeScript, TailwindCSS, and Supabase.

## 🚀 Features

- **Authentication & Authorization**
  - Supabase Auth with email/password
  - Role-based access control (Admin, Editor, Writer, Reader)
  - Protected routes and middleware

- **Articles & Blog System**
  - Rich article management with categories and tags
  - SEO-optimized article pages
  - Featured articles section
  - Related articles recommendations
  - View tracking

- **User Management**
  - User profiles with bio and social links
  - Author pages showing all articles by author
  - Role-based permissions

- **Trading Tools**
  - Economic Calendar (TradingView integration)
  - Currency Converter
  - Pip Calculator
  - Leverage Calculator

- **Additional Features**
  - Real-time market ticker
  - Newsletter subscriptions
  - Comments system
  - Search and filtering
  - Dark mode support
  - Fully responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Styling**: TailwindCSS with custom design system
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tradax
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase/schema.sql` in the Supabase SQL Editor
   - Copy your project URL and anon key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles** - User profiles with roles and metadata
- **categories** - Article categories
- **articles** - Main content with full text, images, and metadata
- **comments** - User comments on articles
- **newsletter_subscriptions** - Email subscriptions

See `supabase/schema.sql` for the complete schema.

## 👥 User Roles

- **Admin**: Full access to all features, user management
- **Editor**: Can manage all articles and approve content
- **Writer**: Can create and manage own articles
- **Reader**: Can view content and leave comments

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## 📁 Project Structure

```
tradax/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── articles/          # Article pages
│   ├── dashboard/         # Admin dashboard
│   ├── tools/             # Trading tools
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── articles/         # Article-specific components
│   ├── home/             # Homepage components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── supabase/        # Supabase client configuration
│   ├── types/           # TypeScript types
│   └── utils.ts         # Helper functions
├── supabase/            # Database schema
└── public/              # Static assets
```

## 🎨 Customization

### Colors

The design system uses a custom color palette defined in `tailwind.config.ts`:
- Primary: Blue tones for CTAs and links
- Navy: Dark blues for text and backgrounds
- Supports light and dark modes

### Fonts

The project uses Inter font from Google Fonts. You can change this in `app/layout.tsx`.

## 📄 License

This project is created for educational purposes.

## ⚠️ Disclaimer

This is a financial information portal. All content should include appropriate risk disclaimers. Trading and investing involve significant risk of loss. The information provided is for educational purposes only and should not be considered financial advice.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email contact@tradax.com or open an issue in the repository.

---

Built with ❤️ using Next.js and Supabase

