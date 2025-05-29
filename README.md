# Dental Lab Digital Survival Landing Page

A high-converting Next.js 14 landing page designed to help dental labs survive offshore competition and DSO consolidation through strategic digital marketing.

## 🚀 Features Implemented (Phases 1-6)

### Phase 1: Project Setup
- ✅ Next.js 14 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Supabase integration
- ✅ GSAP animations
- ✅ Framer Motion
- ✅ Lucide React icons

### Phase 2: Base Layout Structure
- ✅ Responsive grid system
- ✅ Navigation component
- ✅ Theme provider setup
- ✅ Global CSS configuration

### Phase 3: Hero Section with 3 Floating CTAs
- ✅ Compelling headline: "While You're Reading This, Another Lab Just Lost a 20-Year Client to Offshore Pricing"
- ✅ Industry statistics with NADL citation
- ✅ 3 Floating CTAs:
  - 📞 Calendly booking integration
  - 🔍 AI SEO Audit (with pulse animation)
  - 📝 AI Blog Generator (slides up after 3 seconds)

### Phase 4: Market Reality Dashboard
- ✅ Animated industry statistics with GSAP
- ✅ Live counters showing:
  - 22% lab closure rate since 2004
  - Average technician age: 51.5 years
  - 38% offshore + 23% DSO market control
- ✅ Digital marketing adoption gap comparison

### Phase 5: Interactive Goal Selector → Bundle Recommender
- ✅ 5 challenge options with emoji icons
- ✅ Dynamic bundle recommendations:
  - "Price shopping" → The Survivor Bundle
  - "No technicians" → The Competitor Bundle
  - "DSO squeeze" → The Dominator Bundle
- ✅ Real-time pricing calculations
- ✅ Transparent discount breakdowns

### Phase 6: Global Subscription Slider
- ✅ Interactive 3-24 month slider
- ✅ Real-time discount updates (0% to 10%)
- ✅ Global pricing context affecting all bundles
- ✅ Sticky positioning for constant visibility
- ✅ Smooth animations and visual feedback

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Animations**: GSAP + Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Deployment**: Vercel-ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/BuzzwordStrategies/2.0_dental_landing_page.git

# Navigate to project directory
cd 2.0_dental_landing_page

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Pricing System

The landing page features a sophisticated pricing system with:

### Bundle Types
1. **The Survivor** (3 services): $1,875 base → $1,664-$1,737/mo
2. **The Competitor** (4 services): $2,820 base → $2,500-$2,700/mo  
3. **The Dominator** (8 services): $9,000 base → $5,500-$7,500/mo

### Discount Structure
- **Bundle Discounts**: 2.5% (3 services) to 10% (8+ services)
- **Subscription Discounts**: 0% (3mo) to 10% (24mo)
- **Combined Savings**: Up to 20% off base pricing

## 🎨 Design System

### Colors
- **Primary**: Amber (#F59E0B)
- **Secondary**: Gray scale
- **Accent**: Green (savings), Red (urgency)

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure with responsive sizing

### Animations
- **GSAP**: Scroll-triggered counters and entrance animations
- **Framer Motion**: Interactive elements and state changes
- **CSS**: Custom keyframes for floating elements

## 📱 Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Large tap targets and smooth interactions

## 🔗 Integrations

### Calendly
- Popup widget integration
- Custom styling to match brand
- Replace `YOUR_CALENDLY_LINK` with actual URL

### Supabase
- Lead capture forms
- Analytics tracking
- User session management

## 📈 Conversion Optimization

### Psychological Triggers
- **Urgency**: "Another lab just lost..." headline
- **Social Proof**: Industry statistics and citations
- **Loss Aversion**: Market reality dashboard
- **Personalization**: Goal-based bundle recommendations

### User Journey
1. **Problem Awareness**: Hero + Market Reality
2. **Solution Discovery**: Goal Selector
3. **Value Demonstration**: Bundle Recommender + Pricing
4. **Commitment Incentive**: Subscription Slider
5. **Action**: CTA buttons

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
- Compatible with Netlify, Railway, and other Next.js hosts
- Ensure environment variables are configured

## 📋 TODO (Future Phases)

- [ ] Phase 7: Bundle comparison tables
- [ ] Phase 8: Social proof testimonials
- [ ] Phase 9: AI SEO audit tool
- [ ] Phase 10: AI blog generator
- [ ] Phase 11: Lead capture forms
- [ ] Phase 12: Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Buzzword Strategies.

## 📞 Support

For questions or support, contact:
- **Email**: support@buzzwordstrategies.com
- **Website**: https://buzzwordstrategies.com

---

Built with ❤️ by [Buzzword Strategies](https://buzzwordstrategies.com)
