import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { UserNavbar } from '../components/UserNavbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { format, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Users, Check, ChevronLeft } from 'lucide-react';
import { mockRooms } from '../data/mockData';
import { toast } from 'sonner';

export function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = mockRooms.find(r => r.id === roomId);

  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>(undefined);
  const [guests, setGuests] = React.useState(2);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const [guestName, setGuestName] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestPhone, setGuestPhone] = React.useState('');

  if (!room) {
    return (
      <div className="min-h-screen bg-[#F8FAFB]">
        <UserNavbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1A2B3C] mb-4">Room not found</h1>
          <Link to="/rooms">
            <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389]">
              Back to Rooms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const subtotal = nights * room.price;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (!guestName || !guestEmail || !guestPhone) {
      toast.error('Please fill in all guest information');
      return;
    }
    if (guests > room.maxPax) {
      toast.error(`Maximum ${room.maxPax} guests allowed for this room`);
      return;
    }
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    toast.success('Booking confirmed! Check your email for details.');
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  // Mock unavailable dates
  const unavailableDates = [
    new Date(2026, 3, 20),
    new Date(2026, 3, 21),
    new Date(2026, 3, 22),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <UserNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to={`/rooms/${room.id}`}>
          <Button variant="outline" className="mb-6 border-[#D1DEEA]">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Room Details
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-[#1A2B3C] mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Info Card */}
            <Card className="p-6 border-[#D1DEEA]">
              <div className="flex gap-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1A2B3C] mb-1">{room.name}</h3>
                  <p className="text-[#64748B] mb-2">{room.type}</p>
                  <div className="flex items-center gap-4 text-sm text-[#64748B]">
                    <span>Max {room.maxPax} guests</span>
                    <span>•</span>
                    <span>{room.size} sqm</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Dates Selection */}
            <Card className="p-6 border-[#D1DEEA]">
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-6">Select Dates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-[#D1DEEA]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={(date) =>
                          date < new Date() || unavailableDates.some(d => d.getTime() === date.getTime())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-[#D1DEEA]"
                        disabled={!checkInDate}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date) =>
                          !checkInDate ||
                          date <= checkInDate ||
                          unavailableDates.some(d => d.getTime() === date.getTime())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFB] rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded bg-[#22C55E]"></div>
                  <span className="text-[#64748B]">Available</span>
                  <div className="w-4 h-4 rounded bg-[#F59E0B] ml-4"></div>
                  <span className="text-[#64748B]">Few rooms left</span>
                  <div className="w-4 h-4 rounded bg-[#EF4444] ml-4"></div>
                  <span className="text-[#64748B]">Fully booked</span>
                </div>
              </div>
            </Card>

            {/* Guests */}
            <Card className="p-6 border-[#D1DEEA]">
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-6">Number of Guests</h3>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFB] rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#64748B]" />
                  <span className="text-[#1A2B3C]">Guests</span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="border-[#D1DEEA]"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-semibold">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(room.maxPax, guests + 1))}
                    className="border-[#D1DEEA]"
                  >
                    +
                  </Button>
                </div>
              </div>
              <p className="text-sm text-[#64748B] mt-2">Maximum {room.maxPax} guests</p>
            </Card>

            {/* Guest Information */}
            <Card className="p-6 border-[#D1DEEA]">
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-6">Guest Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="border-[#D1DEEA]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="border-[#D1DEEA]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+63 917 123 4567"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="border-[#D1DEEA]"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-[#D1DEEA] sticky top-24">
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-6">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                {checkInDate && checkOutDate && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Check-in</span>
                      <span className="font-medium text-[#1A2B3C]">
                        {format(checkInDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Check-out</span>
                      <span className="font-medium text-[#1A2B3C]">
                        {format(checkOutDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Guests</span>
                      <span className="font-medium text-[#1A2B3C]">{guests}</span>
                    </div>
                  </>
                )}
              </div>

              {nights > 0 && (
                <>
                  <div className="space-y-3 pt-6 border-t border-[#E5EDF2] mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">
                        ₱{room.price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span className="font-medium text-[#1A2B3C]">
                        ₱{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Service fee</span>
                      <span className="font-medium text-[#1A2B3C]">
                        ₱{serviceFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t-2 border-[#E5EDF2] mb-6">
                    <span className="text-lg font-semibold text-[#1A2B3C]">Total</span>
                    <span className="text-2xl font-bold text-[#20B2AA]">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              <Button
                size="lg"
                className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389] shadow-lg mb-4"
                onClick={handleBooking}
                disabled={!checkInDate || !checkOutDate || nights === 0}
              >
                Confirm Booking
              </Button>

              <div className="space-y-2 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Best price guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Confirm Your Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#20B2AA]/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#20B2AA]" />
            </div>
            
            <div className="text-center">
              <p className="text-[#1A2B3C] mb-2">
                You're about to book <strong>{room.name}</strong>
              </p>
              <p className="text-sm text-[#64748B]">
                {checkInDate && checkOutDate && (
                  <>
                    {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')} • {guests} {guests === 1 ? 'guest' : 'guests'}
                  </>
                )}
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFB] rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-[#64748B]">Total Amount</span>
                <span className="text-2xl font-bold text-[#20B2AA]">₱{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#D1DEEA]"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#20B2AA] text-white hover:bg-[#1A9389]"
                onClick={confirmBooking}
              >
                Confirm & Pay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
