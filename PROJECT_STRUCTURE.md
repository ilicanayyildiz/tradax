# TradaX Project Structure

Complete overview of the project architecture and file organization.

## 📁 Root Directory

```
tradax/
├── app/                          # Next.js 14 App Router
├── components/                   # React Components
├── lib/                         # Utilities & Configurations
├── public/                      # Static Assets
├── supabase/                    # Database Schema
├── .env.local.example          # Environment Variables Template
├── .gitignore                  # Git Ignore Rules
├── next.config.js              # Next.js Configuration
├── tailwind.config.ts          # Tailwind CSS Configuration
├── tsconfig.json               # TypeScript Configuration
├── package.json                # Dependencies
├── README.md                   # Main Documentation
├── SETUP.md                    # Setup Instructions
├── DEPLOYMENT.md               # Deployment Guide
└── vercel.json                # Vercel Configuration
```

## 🗂️ App Directory (`app/`)

### Core Files
- `layout.tsx` - Root layout with metadata, navbar, footer
- `page.tsx` - Homepage with featured articles, ticker, sidebar
- `globals.css` - Global styles and Tailwind utilities
- `providers.tsx` - Theme provider wrapper
- `robots.ts` - SEO robots configuration
- `sitemap.ts` - Dynamic sitemap generation

### Authentication (`app/auth/`)
```
auth/
├── login/
│   └── page.tsx               # Login page
├── signup/
│   └── page.tsx               # Sign up page
└── signout/
    └── route.ts              # Sign out API route
```

### Articles (`app/articles/`)
```
articles/
├── page.tsx                   # All articles list
└── [slug]/
    └── page.tsx              # Individual article page
```

### Authors (`app/authors/`)
```
authors/
├── page.tsx                   # All authors list
└── [id]/
    └── page.tsx              # Author profile with articles
```

### Categories (`app/categories/`)
```
categories/
├── page.tsx                   # All categories
└── [slug]/
    └── page.tsx              # Category articles
```

### Dashboard (`app/dashboard/`)
```
dashboard/
└── page.tsx                   # Admin dashboard
```

### Additional Pages
```
app/
├── about/
│   └── page.tsx              # About us page
├── contact/
│   └── page.tsx              # Contact form
├── disclaimer/
│   └── page.tsx              # Legal disclaimer
├── search/
│   └── page.tsx              # Search functionality
└── tools/
    └── page.tsx              # Trading tools
```

## 🧩 Components (`components/`)

### Layout Components (`components/layout/`)
- `Navbar.tsx` - Main navigation with auth, theme toggle, mobile menu
- `Footer.tsx` - Footer with links, newsletter, social media

### UI Components (`components/ui/`)
- `Button.tsx` - Reusable button with variants
- `Card.tsx` - Card components (Card, CardHeader, CardContent, etc.)
- `Input.tsx` - Form input component
- `Label.tsx` - Form label component
- `Textarea.tsx` - Textarea component

### Article Components (`components/articles/`)
- `ArticleCard.tsx` - Article preview card with image, title, excerpt

### Home Components (`components/home/`)
- `Ticker.tsx` - Real-time market ticker
- `CategorySidebar.tsx` - Categories and newsletter widget

## 🔧 Library (`lib/`)

### Supabase (`lib/supabase/`)
- `client.ts` - Browser Supabase client
- `server.ts` - Server-side Supabase client
- `middleware.ts` - Auth middleware utilities

### Types (`lib/types/`)
- `database.types.ts` - TypeScript types for database models

### Utilities (`lib/`)
- `utils.ts` - Helper functions (cn, slugify, formatDate, etc.)

## 🗄️ Database (`supabase/`)

### Schema (`supabase/schema.sql`)
Complete PostgreSQL schema including:

**Tables:**
- `profiles` - User profiles with roles
- `articles` - Blog articles/content
- `categories` - Content categories
- `comments` - User comments
- `newsletter_subscriptions` - Email subscriptions

**Security:**
- Row Level Security (RLS) policies
- Role-based access control
- Automatic triggers
- Helper functions

## 🎨 Styling

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color palette (primary, navy)
- Dark mode support
- Custom components (btn, card, input, etc.)
- Typography extensions

### Global Styles (`app/globals.css`)
- Base typography
- Utility classes
- Component styles
- Responsive utilities

## 🔐 Authentication Flow

```
User Registration:
1. Sign up form → Supabase Auth
2. Email verification
3. Auto-create profile in profiles table
4. Default role: 'reader'

User Login:
1. Login form → Supabase Auth
2. Session created
3. Middleware validates session
4. Redirect to dashboard

Protected Routes:
1. Middleware checks auth
2. Role-based access control
3. Redirect if unauthorized
```

## 📊 User Roles & Permissions

| Role | Create Articles | Edit Own | Edit All | Delete | Manage Users |
|------|----------------|----------|----------|--------|--------------|
| Reader | ❌ | ❌ | ❌ | ❌ | ❌ |
| Writer | ✅ | ✅ | ❌ | ❌ | ❌ |
| Editor | ✅ | ✅ | ✅ | ✅ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🚀 Key Features

### 1. Authentication System
- Email/password signup and login
- Role-based access control
- Protected routes with middleware
- Session management

### 2. Article Management
- CRUD operations
- Rich content support
- Categories and tags
- Featured articles
- View tracking
- SEO-friendly URLs

### 3. User Profiles
- Author bios
- Social links
- Avatar support
- Article listings

### 4. Trading Tools
- Economic calendar (embedded)
- Currency converter
- Pip calculator
- Leverage calculator

### 5. Search & Discovery
- Full-text search
- Category filtering
- Tag-based navigation
- Related articles

### 6. SEO Optimization
- Dynamic metadata
- Open Graph tags
- Sitemap generation
- Robots.txt
- Semantic HTML

### 7. UI/UX Features
- Dark mode toggle
- Responsive design
- Mobile-friendly navigation
- Loading states
- Error handling
- Toast notifications

## 🔄 Data Flow

### Article Display
```
Database (Supabase) 
  ↓
Server Component (fetch)
  ↓
ArticleCard Component
  ↓
User Browser
```

### User Actions
```
User Interaction
  ↓
Client Component
  ↓
Supabase Client
  ↓
Database (RLS checks)
  ↓
Response to Client
```

## 🎯 API Routes

Currently using Supabase directly from components. Optional API routes can be added:

```
/api/articles/[id]        # Article CRUD
/api/comments             # Comment operations
/api/newsletter           # Newsletter subscription
/api/search              # Search functionality
```

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Small devices */
md:  768px   /* Medium devices */
lg:  1024px  /* Large devices */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

## 🎨 Design System

### Colors
- **Primary**: Blue tones for CTAs and accents
- **Navy**: Dark blues for text and backgrounds
- **Semantic**: Success (green), Error (red), Warning (yellow)

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: text-xs to text-5xl
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- Uses Tailwind's default spacing scale (0.25rem increments)

## 🔒 Security Features

1. **Row Level Security (RLS)**
   - Database-level access control
   - Role-based policies

2. **Environment Variables**
   - Sensitive data in .env.local
   - Never committed to git

3. **Authentication**
   - Secure session management
   - Email verification
   - Password hashing (Supabase)

4. **Validation**
   - Form validation
   - Type checking (TypeScript)
   - XSS protection

## 🧪 Testing Strategy (Recommended)

```bash
# Unit tests (future)
npm run test

# E2E tests (future)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📈 Performance Optimizations

1. **Next.js Image Optimization** - Automatic image optimization
2. **Server Components** - Reduced JavaScript bundle
3. **Code Splitting** - Automatic route-based splitting
4. **Caching** - Static generation where possible
5. **Font Optimization** - Automatic font optimization

## 🔄 Future Enhancements

Potential additions:
- [ ] Rich text editor integration (TipTap)
- [ ] Image upload to Supabase Storage
- [ ] Real-time comments
- [ ] Article drafts system
- [ ] Email notifications
- [ ] Newsletter automation
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA features

---

This structure provides a solid foundation for a professional finance portal that's scalable, maintainable, and production-ready.

