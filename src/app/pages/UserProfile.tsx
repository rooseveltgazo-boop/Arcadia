import React from 'react';
import { UserNavbar } from '../components/UserNavbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import { mockBookings, mockRooms } from '../data/mockData';
import { format, parseISO, isBefore, addDays } from 'date-fns';
import { toast } from 'sonner';

export function UserProfile() {
  const [bookings, setBookings] = React.useState(mockBookings);

  const upcomingBookings = bookings.filter(b => 
    b.status !== 'cancelled' && isBefore(new Date(), parseISO(b.checkOut))
  );

  const pastBookings = bookings.filter(b =>
    b.status !== 'cancelled' && !isBefore(new Date(), parseISO(b.checkOut))
  );

  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const checkInDate = parseISO(booking.checkIn);
    const today = new Date();
    const daysDifference = Math.floor((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      toast.error('Cannot cancel booking less than 24 hours before check-in');
      return;
    }

    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ));
    toast.success('Booking cancelled successfully');
  };

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const room = mockRooms.find(r => r.id === booking.roomId);
    const checkInDate = parseISO(booking.checkIn);
    const canCancel = booking.status !== 'cancelled' && isBefore(new Date(), addDays(checkInDate, -1));

    return (
      <Card className="p-6 border-[#D1DEEA] hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {room && (
            <img
              src={room.image}
              alt={booking.roomName}
              className="w-full md:w-48 h-40 rounded-lg object-cover"
            />
          )}

          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-1">
                  {booking.roomName}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${
                      booking.status === 'confirmed'
                        ? 'bg-[#22C55E] text-white'
                        : booking.status === 'pending'
                        ? 'bg-[#F59E0B] text-white'
                        : 'bg-[#64748B] text-white'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#64748B]">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(parseISO(booking.checkIn), 'MMM dd')} - {format(parseISO(booking.checkOut), 'MMM dd, yyyy')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-[#64748B]">
                <Users className="w-4 h-4" />
                <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
              </div>

              <div className="flex items-center gap-2 text-[#64748B]">
                <MapPin className="w-4 h-4" />
                <span>Booking ID: {booking.id}</span>
              </div>

              <div className="flex items-center gap-2 text-[#1A2B3C] font-semibold">
                <span>Total: ₱{booking.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {booking.status !== 'cancelled' && (
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm" className="border-[#D1DEEA]">
                  View Details
                </Button>
                {canCancel && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                )}
                {!canCancel && booking.status !== 'cancelled' && (
                  <div className="flex items-center gap-1 text-xs text-[#64748B]">
                    <AlertCircle className="w-4 h-4" />
                    <span>Cannot cancel within 24 hours of check-in</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 border-[#D1DEEA]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1A9389] flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1A2B3C] mb-2">John Doe</h1>
              <p className="text-[#64748B]">john.doe@example.com</p>
              <p className="text-[#64748B]">+63 917 123 4567</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-[#D1DEEA]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#20B2AA]/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#20B2AA]" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-[#1A2B3C]">{upcomingBookings.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-[#D1DEEA]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Completed Stays</p>
                <p className="text-2xl font-bold text-[#1A2B3C]">{pastBookings.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-[#D1DEEA]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Bookings</p>
                <p className="text-2xl font-bold text-[#1A2B3C]">{bookings.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-12 text-center border-[#D1DEEA]">
                <Calendar className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">
                  No upcoming bookings
                </h3>
                <p className="text-[#64748B] mb-6">
                  Start planning your next tropical getaway!
                </p>
                <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                  Browse Rooms
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-12 text-center border-[#D1DEEA]">
                <Clock className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">
                  No past bookings
                </h3>
                <p className="text-[#64748B]">
                  Your completed stays will appear here
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-12 text-center border-[#D1DEEA]">
                <AlertCircle className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">
                  No cancelled bookings
                </h3>
                <p className="text-[#64748B]">
                  All your cancelled bookings will appear here
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Example */}
        <Card className="mt-8 p-6 border-l-4 border-l-[#20B2AA] border-[#D1DEEA] bg-[#20B2AA]/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1A2B3C] mb-1">Reminder</h4>
              <p className="text-[#64748B]">
                Your booking is tomorrow at Arcadia Crystal Resort. Check-in time is 2:00 PM. 
                We look forward to welcoming you!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
