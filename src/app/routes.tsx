import { createBrowserRouter } from 'react-router';

// User Pages
import { LandingPage } from './pages/LandingPage';
import { RoomsListing } from './pages/RoomsListing';
import { RoomDetails } from './pages/RoomDetails';
import { BookingPage } from './pages/BookingPage';
import { UserProfile } from './pages/UserProfile';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminBranding } from './pages/AdminBranding';
import { AdminRooms } from './pages/AdminRooms';
import { AdminCottages } from './pages/AdminCottages';
import { AdminCalendar } from './pages/AdminCalendar';
import { AdminRatings } from './pages/AdminRatings';

export const router = createBrowserRouter([
  // User Routes
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/rooms',
    element: <RoomsListing />,
  },
  {
    path: '/rooms/:roomId',
    element: <RoomDetails />,
  },
  {
    path: '/booking/:roomId',
    element: <BookingPage />,
  },
  {
    path: '/profile',
    element: <UserProfile />,
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/branding',
    element: <AdminBranding />,
  },
  {
    path: '/admin/rooms',
    element: <AdminRooms />,
  },
  {
    path: '/admin/cottages',
    element: <AdminCottages />,
  },
  {
    path: '/admin/calendar',
    element: <AdminCalendar />,
  },
  {
    path: '/admin/ratings',
    element: <AdminRatings />,
  },

  // 404 Route
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#20B2AA] mb-4">404</h1>
          <p className="text-xl text-[#64748B] mb-8">Page not found</p>
          <a
            href="/"
            className="px-6 py-3 bg-[#20B2AA] text-white rounded-lg hover:bg-[#1A9389] transition-colors inline-block"
          >
            Go Home
          </a>
        </div>
      </div>
    ),
  },
]);
