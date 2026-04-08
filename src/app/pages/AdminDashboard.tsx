import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Bed,
  Calendar,
  Star,
  Menu 
} from 'lucide-react';
import { mockBookings, mockRooms, mockReviews } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function AdminDashboard() {
  const totalBookings = mockBookings.length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const occupancyRate = ((mockRooms.filter(r => r.status === 'reserved' || r.status === 'fully-booked').length / mockRooms.length) * 100).toFixed(0);
  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);

  const bookingTrend = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 52 },
    { month: 'Mar', bookings: 68 },
    { month: 'Apr', bookings: 71 },
  ];

  const roomBookingData = mockRooms.slice(0, 5).map(room => ({
    name: room.name.substring(0, 10) + '...',
    bookings: Math.floor(Math.random() * 30) + 10,
  }));

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: Calendar,
      trend: '+12%',
      color: 'from-[#20B2AA] to-[#1A9389]',
    },
    {
      title: 'Total Revenue',
      value: `₱${(totalRevenue / 1000).toFixed(1)}K`,
      icon: DollarSign,
      trend: '+18%',
      color: 'from-[#FF8B6A] to-[#FF6B4A]',
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: Bed,
      trend: '+5%',
      color: 'from-[#22C55E] to-[#16A34A]',
    },
    {
      title: 'Average Rating',
      value: averageRating,
      icon: Star,
      trend: '+0.2',
      color: 'from-[#F59E0B] to-[#D97706]',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFB]">
      <AdminSidebar />
      
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
          
          {/* Header Section */}
          <div className="mb-8 mt-14 md:mt-0 w-full"> 
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Dashboard Overview</h1>
            <p className="text-sm sm:text-base text-[#64748B]">Welcome back! Here's what's happening with your resort today.</p>
          </div>

          {/* Stats Grid - 2 columns sa mobile, 4 sa desktop, fully stretched */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 w-full">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 border-[#D1DEEA] hover:shadow-lg transition-shadow w-full">
                  <div className="flex items-start justify-between mb-4 w-full">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-[#22C55E] text-[10px] sm:text-sm font-medium">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      {stat.trend}
                    </div>
                  </div>
                  <p className="text-[#64748B] text-[10px] sm:text-sm mb-1 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-3xl font-bold text-[#1A2B3C] truncate">{stat.value}</p>
                </Card>
              );
            })}
          </div>

          {/* Charts Section - Full width stacked cards */}
          <div className="flex flex-col gap-6 mb-8 w-full">
            {/* Booking Trend Chart */}
            <Card className="p-4 sm:p-6 border-[#D1DEEA] w-full">
              <h3 className="text-md sm:text-lg font-semibold text-[#1A2B3C] mb-4">Booking Trend</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5EDF2" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #D1DEEA', borderRadius: '8px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="bookings" stroke="#20B2AA" strokeWidth={3} dot={{ fill: '#20B2AA', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Most Booked Rooms */}
            <Card className="p-4 sm:p-6 border-[#D1DEEA] w-full">
              <h3 className="text-md sm:text-lg font-semibold text-[#1A2B3C] mb-4">Most Booked Rooms</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roomBookingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5EDF2" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #D1DEEA', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="bookings" fill="#20B2AA" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recent Bookings Table - Full Width */}
          <Card className="p-4 sm:p-6 border-[#D1DEEA] overflow-hidden w-full">
            <h3 className="text-md sm:text-lg font-semibold text-[#1A2B3C] mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full divide-y divide-[#E5EDF2]">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold text-[#64748B]">Guest</th>
                    <th className="hidden sm:table-cell text-left py-3 px-4 text-xs sm:text-sm font-semibold text-[#64748B]">Room</th>
                    <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold text-[#64748B]">Check-in</th>
                    <th className="hidden md:table-cell text-left py-3 px-4 text-xs sm:text-sm font-semibold text-[#64748B]">Total</th>
                    <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold text-[#64748B]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EDF2]">
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#F8FAFB] transition-colors">
                      <td className="py-3 px-4 text-sm text-[#1A2B3C] font-medium">
                        <div className="truncate max-w-[120px] sm:max-w-none">{booking.userName}</div>
                        <div className="sm:hidden text-[10px] text-[#64748B] truncate">{booking.roomName}</div>
                      </td>
                      <td className="hidden sm:table-cell py-3 px-4 text-sm text-[#64748B]">{booking.roomName}</td>
                      <td className="py-3 px-4 text-sm text-[#64748B] whitespace-nowrap">{booking.checkIn}</td>
                      <td className="hidden md:table-cell py-3 px-4 text-sm text-[#1A2B3C] font-semibold whitespace-nowrap">₱{booking.totalPrice.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                          booking.status === 'confirmed' 
                            ? 'bg-[#22C55E]/10 text-[#22C55E]'
                            : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}