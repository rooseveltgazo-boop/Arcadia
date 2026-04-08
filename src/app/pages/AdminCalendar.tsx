import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';

export function AdminCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  // Mock booking data
  const bookedDates = [
    new Date(2026, 3, 10), new Date(2026, 3, 11), new Date(2026, 3, 12),
    new Date(2026, 3, 15), new Date(2026, 3, 16), new Date(2026, 3, 17),
    new Date(2026, 3, 18), new Date(2026, 3, 20), new Date(2026, 3, 21),
    new Date(2026, 3, 22), new Date(2026, 3, 23), new Date(2026, 3, 24),
    new Date(2026, 3, 25),
  ];

  const fewRoomsLeftDates = [
    new Date(2026, 3, 13), new Date(2026, 3, 14), new Date(2026, 3, 19),
  ];

  const fullyBookedDates = [
    new Date(2026, 3, 20), new Date(2026, 3, 21),
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayStatus = (day: Date) => {
    if (fullyBookedDates.some(date => isSameDay(date, day))) return 'fully-booked';
    if (fewRoomsLeftDates.some(date => isSameDay(date, day))) return 'few-left';
    if (bookedDates.some(date => isSameDay(date, day))) return 'booked';
    return 'available';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fully-booked':
        return 'bg-[#EF4444] text-white';
      case 'few-left':
        return 'bg-[#F59E0B] text-white';
      case 'booked':
        return 'bg-[#20B2AA]/20 text-[#1A2B3C] border border-[#20B2AA]';
      default:
        return 'bg-white text-[#1A2B3C] border border-[#E5EDF2] hover:bg-[#E5EDF2]';
    }
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFB]">
      <AdminSidebar />
      
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          {/* Header */}
          <div className="mb-8 mt-14 md:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Booking Calendar</h1>
            <p className="text-sm sm:text-base text-[#64748B]">View and manage booking availability</p>
          </div>

          {/* Legend - Responsive Grid */}
          <Card className="p-4 sm:p-6 mb-6 border-[#D1DEEA]">
            <h3 className="text-md font-semibold text-[#1A2B3C] mb-4">Legend</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Available', class: 'bg-white border-2 border-[#D1DEEA]' },
                { label: 'Has Bookings', class: 'bg-[#20B2AA]/20 border border-[#20B2AA]' },
                { label: 'Few Rooms Left', class: 'bg-[#F59E0B]' },
                { label: 'Fully Booked', class: 'bg-[#EF4444]' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded ${item.class}`}></div>
                  <span className="text-xs sm:text-sm text-[#64748B]">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Calendar Card */}
          <Card className="p-3 sm:p-6 border-[#D1DEEA] w-full">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A2B3C]">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <Button variant="outline" size="icon" onClick={previousMonth} className="border-[#D1DEEA] h-9 w-9">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())} className="border-[#D1DEEA] h-9 flex-1 sm:flex-none">
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className="border-[#D1DEEA] h-9 w-9">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center font-bold text-[#64748B] text-xs sm:text-sm py-2">
                  {day}
                </div>
              ))}

              {dateRange.map((day, idx) => {
                const status = getDayStatus(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <button
                    key={idx}
                    className={`
                      aspect-square sm:aspect-auto sm:h-24 p-1 sm:p-2 rounded-md sm:rounded-lg 
                      flex flex-col items-center sm:items-start justify-center sm:justify-start
                      transition-all text-xs sm:text-sm
                      ${getStatusColor(status)}
                      ${!isCurrentMonth ? 'opacity-20 pointer-events-none' : ''}
                      ${isToday ? 'ring-2 ring-[#20B2AA] ring-offset-1' : ''}
                    `}
                  >
                    <span className="font-semibold">{format(day, 'd')}</span>
                    {/* Visual indicator for mobile status if text is hidden */}
                    <div className="hidden sm:block mt-auto text-[10px] font-medium opacity-80">
                      {status !== 'available' && status.replace('-', ' ')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Block Dates Section */}
            <div className="mt-8 pt-6 border-t border-[#E5EDF2]">
              <h3 className="text-md sm:text-lg font-semibold text-[#1A2B3C] mb-4">Manual Date Blocking</h3>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389] w-full">
                  Block Specific Dates
                </Button>
                <Button variant="outline" className="border-[#D1DEEA] w-full">
                  View Blocked Dates
                </Button>
              </div>
            </div>
          </Card>

          {/* Upcoming Bookings - More mobile friendly list */}
          <Card className="mt-6 p-4 sm:p-6 border-[#D1DEEA] w-full">
            <h3 className="text-lg font-semibold text-[#1A2B3C] mb-4">Upcoming Check-ins</h3>
            <div className="space-y-3">
              {[
                { date: 'Apr 10, 2026', room: 'Honeymoon Suite', guest: 'Alex Johnson', status: 'Confirmed' },
                { date: 'Apr 15, 2026', room: 'Deluxe Ocean View', guest: 'John Smith', status: 'Confirmed' },
                { date: 'Apr 20, 2026', room: 'Premium Garden Villa', guest: 'Maria Santos', status: 'Confirmed' },
              ].map((booking, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F8FAFB] rounded-lg gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-md border border-[#D1DEEA] hidden sm:block">
                      <CalendarIcon className="w-4 h-4 text-[#20B2AA]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A2B3C] text-sm sm:text-base">{booking.guest}</p>
                      <p className="text-[11px] sm:text-sm text-[#64748B]">{booking.room} • {booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                    <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded-full text-[10px] sm:text-xs font-medium">
                      {booking.status}
                    </span>
                    <Button variant="ghost" size="sm" className="sm:hidden text-[#20B2AA] h-7 px-2">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}