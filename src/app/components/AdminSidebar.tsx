import React from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Building2, 
  Bed, 
  Home, 
  Calendar, 
  Star,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';

export function AdminSidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Building2, label: 'Resort Branding', path: '/admin/branding' },
    { icon: Bed, label: 'Room Management', path: '/admin/rooms' },
    { icon: Home, label: 'Cottage Management', path: '/admin/cottages' },
    { icon: Calendar, label: 'Booking Calendar', path: '/admin/calendar' },
    { icon: Star, label: 'Ratings & Feedback', path: '/admin/ratings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-[#D1DEEA]">
        <h1 className="text-2xl font-bold text-[#20B2AA]">Arcadia Crystal</h1>
        <p className="text-sm text-[#64748B]">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path} onClick={() => setIsMobileOpen(false)}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-[#20B2AA] text-white shadow-md'
                    : 'text-[#64748B] hover:bg-[#E5EDF2] hover:text-[#1A2B3C]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#D1DEEA]">
        <Link to="/" onClick={() => setIsMobileOpen(false)}>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-[#D1DEEA] text-[#64748B] hover:bg-[#E5EDF2]"
          >
            <LogOut className="w-5 h-5" />
            Back to Site
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg border-[#D1DEEA]"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#D1DEEA] flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
