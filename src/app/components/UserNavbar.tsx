import React from 'react';
import { Link, useLocation } from 'react-router';
import { Bed, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function UserNavbar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rooms & Cottages', path: '/rooms' },
    { label: 'My Bookings', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D1DEEA] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1A9389] flex items-center justify-center">
              <Bed className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A2B3C]">Arcadia Crystal Resort</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#20B2AA]'
                    : 'text-[#64748B] hover:text-[#1A2B3C]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/profile">
              <Button variant="outline" size="icon" className="border-[#D1DEEA]">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                Admin Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-[#D1DEEA]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-[#D1DEEA]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#20B2AA]/10 text-[#20B2AA]'
                    : 'text-[#64748B] hover:bg-[#E5EDF2]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 px-4 pt-2">
              <Link to="/profile" className="flex-1" onClick={() => setIsMobileOpen(false)}>
                <Button variant="outline" className="w-full border-[#D1DEEA]">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link to="/admin" className="flex-1" onClick={() => setIsMobileOpen(false)}>
                <Button className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
