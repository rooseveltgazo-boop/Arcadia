# Arcadia Crystal Resort - Booking System

A complete, modern, and responsive resort booking system with a premium tropical aesthetic. Built with React, TypeScript, Tailwind CSS v4, and React Router.

## 🎨 Design System

### Color Palette

**Primary Colors (Tropical Aqua/Teal)**
- `--primary: #20B2AA` - Main brand color
- `--primary-light: #5FD8D0` - Light variant
- `--primary-dark: #1A9389` - Dark variant

**Secondary Colors (Dark Navy)**
- `--secondary: #1A2B3C` - For contrast and text

**Accent Colors (Warm Coral/Peach)**
- `--accent: #FF8B6A` - For highlights and CTAs

**Status Colors**
- `--success: #22C55E` - Available/Confirmed (Green)
- `--warning: #F59E0B` - Few Rooms Left/Pending (Yellow/Amber)
- `--destructive: #EF4444` - Fully Booked/Cancelled (Red)
- `--muted: #64748B` - Maintenance (Gray)

**Neutral Colors**
- `--background: #F8FAFB` - Page background
- `--foreground: #1A2B3C` - Main text
- `--card: #ffffff` - Card background
- `--border: #D1DEEA` - Borders and dividers

### Typography

**Font Family**: Poppins (imported from Google Fonts)

**Font Weights**:
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Hierarchy**:
- H1: 3xl-7xl, Medium weight
- H2: 2xl-4xl, Medium weight
- H3: xl-2xl, Semibold weight
- H4: Base-lg, Medium weight
- Body: Base, Regular weight
- Small: sm-xs

### Spacing System

8px grid system for consistent spacing:
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

### Border Radius

- `--radius-sm: 8px` - Small elements
- `--radius-md: 10px` - Default
- `--radius-lg: 12px` - Large cards
- `--radius-xl: 16px` - Extra large

### Components

#### Buttons

**Variants**:
1. **Primary**: `bg-[#20B2AA]` white text, teal background
2. **Secondary**: `bg-[#1A2B3C]` white text, navy background
3. **Outline**: `border-[#D1DEEA]` with transparent background
4. **Destructive**: `bg-[#EF4444]` for delete/cancel actions
5. **Disabled**: Reduced opacity, cursor-not-allowed

**Sizes**: sm, md (default), lg, icon

#### Status Badges

- **Available/Vacant**: Green (`#22C55E`)
- **Few Rooms Left**: Yellow (`#F59E0B`)
- **Fully Booked**: Red (`#EF4444`)
- **Reserved**: Teal (`#20B2AA`)
- **Maintenance**: Gray (`#64748B`)

#### Cards

**Types**:
1. **RoomCard**: Image, title, price, status, amenities, actions
2. **CottageCard**: Simplified room card for day-use cottages
3. **ReviewCard**: User avatar, rating, comment, date
4. **SummaryCard**: Dashboard statistics with gradient icons

**Style**: White background, rounded corners, subtle shadow, hover effect

#### Forms

**Input Fields**:
- Border: `#D1DEEA`
- Background: White
- Focus: Teal ring
- Padding: Consistent with 8px system

**Date Picker**: Calendar component with color-coded availability

**Dropdowns/Select**: Radix UI select with custom styling

#### Modals/Dialogs

- Glassmorphism effect with backdrop blur
- Centered with overlay
- Smooth animations
- Mobile responsive

## 📐 Layout & Responsiveness

### Breakpoints
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Grid System
- 1 column on mobile
- 2 columns on tablet
- 3-4 columns on desktop

### Responsive Navigation
- Full navbar on desktop
- Hamburger menu on mobile
- Sticky header with backdrop blur

## 👨‍💼 Admin Dashboard

### Pages

1. **Dashboard Overview** (`/admin`)
   - Total bookings, revenue, occupancy rate
   - Booking trend charts
   - Most booked rooms
   - Recent bookings table

2. **Resort Branding** (`/admin/branding`)
   - Logo upload
   - Resort information editing
   - Contact details
   - Location map placeholder
   - Gallery manager
   - Features list

3. **Room Management** (`/admin/rooms`)
   - Add/Edit/Delete rooms
   - Search and filter
   - Status management
   - Image, amenities, pricing

4. **Cottage Management** (`/admin/cottages`)
   - Similar to rooms but simplified
   - Day-use pricing
   - Capacity management

5. **Booking Calendar** (`/admin/calendar`)
   - Monthly calendar view
   - Color-coded availability
   - Date blocking functionality
   - Upcoming check-ins list

6. **Ratings & Feedback** (`/admin/ratings`)
   - Average rating display
   - Rating distribution chart
   - Top-rated rooms
   - Recent reviews with details

## 👤 User Interface

### Pages

1. **Landing Page** (`/`)
   - Hero banner with CTA
   - Resort features showcase
   - Featured rooms grid
   - Gallery section
   - Guest reviews
   - Contact information

2. **Rooms & Cottages Listing** (`/rooms`)
   - Grid/list view toggle
   - Advanced filters (price, pax, type)
   - Search functionality
   - Room cards with quick booking
   - Cottage section

3. **Room Details** (`/rooms/:id`)
   - Image gallery with lightbox
   - Full room description
   - Amenities list with icons
   - Reviews section
   - Sticky booking card
   - Related rooms

4. **Booking Page** (`/booking/:id`)
   - Interactive calendar
   - Date selection with availability
   - Guest count selector
   - Guest information form
   - Booking summary
   - Price breakdown
   - Confirmation dialog

5. **User Profile** (`/profile`)
   - Profile information
   - Booking statistics
   - Tabbed bookings (upcoming, past, cancelled)
   - Cancel booking functionality
   - Reminder notifications

## 🔁 User Flows

### Customer Booking Flow
1. Landing Page → Browse featured rooms
2. View all rooms → Apply filters
3. Select room → View details
4. Click "Book Now" → Booking page
5. Select dates & guests → Fill information
6. Confirm booking → Success notification
7. View in profile → Manage booking

### Admin Management Flow
1. Dashboard → Overview of metrics
2. Manage rooms → Add/Edit/Delete
3. Calendar → View availability
4. Monitor ratings → Respond to feedback

## 🛠 Developer Handoff

### File Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/            # Reusable UI components (Radix-based)
│   │   ├── AdminSidebar.tsx
│   │   ├── UserNavbar.tsx
│   │   ├── RoomCard.tsx
│   │   ├── ReviewCard.tsx
│   │   └── StatusBadge.tsx
│   ├── data/
│   │   └── mockData.ts    # Mock data for rooms, bookings, reviews
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── RoomsListing.tsx
│   │   ├── RoomDetails.tsx
│   │   ├── BookingPage.tsx
│   │   ├── UserProfile.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminBranding.tsx
│   │   ├── AdminRooms.tsx
│   │   ├── AdminCottages.tsx
│   │   ├── AdminCalendar.tsx
│   │   └── AdminRatings.tsx
│   ├── App.tsx
│   └── routes.tsx
├── styles/
│   ├── fonts.css          # Poppins font import
│   ├── theme.css          # Design system tokens
│   ├── tailwind.css
│   └── index.css
```

### Key Technologies

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible components
- **Recharts** - Data visualization
- **date-fns** - Date manipulation
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Component Naming Conventions

- **Pages**: PascalCase with "Page" suffix (e.g., `LandingPage`, `RoomDetails`)
- **Components**: PascalCase (e.g., `RoomCard`, `StatusBadge`)
- **Utility components**: kebab-case in `/ui` folder (e.g., `button.tsx`, `card.tsx`)

### Reusable Components

All components are fully typed with TypeScript and accept props for customization:

```tsx
// Example: RoomCard
<RoomCard
  id="1"
  name="Deluxe Ocean View Suite"
  type="Deluxe Suite"
  price={5500}
  maxPax={4}
  rating={4.9}
  status="available"
  image="..."
  onViewDetails={() => {}}
  onBook={() => {}}
  showActions={true}
/>
```

### State Management

- Local React state with `useState`
- URL parameters for routing data
- Mock data structure ready for backend integration

### Backend Integration Points

1. **Authentication**: User login/signup (currently mock)
2. **Bookings API**: Create, read, update, delete bookings
3. **Rooms API**: CRUD operations for rooms and cottages
4. **Reviews API**: Fetch and post reviews
5. **Availability Calendar**: Real-time availability checking
6. **Payment Gateway**: Integration point in booking confirmation
7. **Image Upload**: Resort branding and room images

### Suggested Backend Schema

```typescript
// User
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
}

// Room
interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  maxPax: number;
  rating: number;
  status: 'available' | 'few-left' | 'fully-booked' | 'maintenance';
  images: string[];
  description: string;
  amenities: string[];
  size: number;
}

// Booking
interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

// Review
interface Review {
  id: string;
  userId: string;
  roomId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file for backend configuration:

```env
VITE_API_URL=https://api.yourresort.com
VITE_STRIPE_PUBLIC_KEY=pk_xxx
```

## ✨ Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern UI with glassmorphism and smooth animations
- ✅ Interactive booking calendar
- ✅ Real-time availability indicators
- ✅ Advanced filtering and search
- ✅ Admin dashboard with analytics
- ✅ User profile with booking management
- ✅ Toast notifications
- ✅ Accessible components (Radix UI)
- ✅ Type-safe with TypeScript
- ✅ SEO-friendly routing
- ✅ Performance optimized

## 🎯 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- SMS reminders
- Multi-language support
- Dark mode
- Real-time chat support
- Loyalty program
- Special offers/promotions
- Social media integration
- Google Maps integration
- Weather API integration

## 📝 License

© 2026 Arcadia Crystal Resort. All rights reserved.
