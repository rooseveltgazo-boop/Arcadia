import React from 'react';
import { Link } from 'react-router';
import { UserNavbar } from '../components/UserNavbar';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { RoomCard } from '../components/RoomCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { mockRooms, mockCottages } from '../data/mockData';

export function RoomsListing() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 10000]);
  const [maxPax, setMaxPax] = React.useState('all');
  const [roomType, setRoomType] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showCottages, setShowCottages] = React.useState(false);

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
    const matchesPax = maxPax === 'all' || room.maxPax >= parseInt(maxPax);
    const matchesType = roomType === 'all' || room.type.toLowerCase().includes(roomType.toLowerCase());
    
    return matchesSearch && matchesPrice && matchesPax && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A2B3C] mb-2">Rooms & Cottages</h1>
          <p className="text-lg text-[#64748B]">
            Find your perfect accommodation from our selection of luxury rooms and cottages
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={!showCottages ? 'default' : 'outline'}
            onClick={() => setShowCottages(false)}
            className={!showCottages ? 'bg-[#20B2AA] text-white hover:bg-[#1A9389]' : 'border-[#D1DEEA]'}
          >
            Rooms ({mockRooms.length})
          </Button>
          <Button
            variant={showCottages ? 'default' : 'outline'}
            onClick={() => setShowCottages(true)}
            className={showCottages ? 'bg-[#20B2AA] text-white hover:bg-[#1A9389]' : 'border-[#D1DEEA]'}
          >
            Cottages ({mockCottages.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <Card className="p-6 border-[#D1DEEA] sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1A2B3C]">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 10000]);
                    setMaxPax('all');
                    setRoomType('all');
                  }}
                  className="text-[#20B2AA]"
                >
                  Clear All
                </Button>
              </div>

              {!showCottages && (
                <>
                  {/* Search */}
                  <div className="mb-6">
                    <Label htmlFor="search" className="mb-2 block">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                      <Input
                        id="search"
                        placeholder="Search rooms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-[#D1DEEA]"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <Label className="mb-2 block">
                      Price Range (₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()})
                    </Label>
                    <Slider
                      min={0}
                      max={10000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-4"
                    />
                  </div>

                  {/* Max Pax */}
                  <div className="mb-6">
                    <Label htmlFor="pax" className="mb-2 block">Maximum Guests</Label>
                    <Select value={maxPax} onValueChange={setMaxPax}>
                      <SelectTrigger className="border-[#D1DEEA]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="2">2+ guests</SelectItem>
                        <SelectItem value="4">4+ guests</SelectItem>
                        <SelectItem value="6">6+ guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Room Type */}
                  <div className="mb-6">
                    <Label htmlFor="type" className="mb-2 block">Room Type</Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger className="border-[#D1DEEA]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {showCottages && (
                <p className="text-sm text-[#64748B]">
                  Browse our day-use cottages perfect for gatherings and events.
                </p>
              )}
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden w-full mb-4 border-[#D1DEEA]"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>

            {/* Results Header */}
            <div className="mb-6">
              <p className="text-[#64748B]">
                {showCottages 
                  ? `Showing ${mockCottages.length} cottages`
                  : `Showing ${filteredRooms.length} of ${mockRooms.length} rooms`
                }
              </p>
            </div>

            {/* Rooms Grid */}
            {!showCottages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <Link key={room.id} to={`/rooms/${room.id}`}>
                    <RoomCard
                      {...room}
                      showActions={false}
                    />
                  </Link>
                ))}
              </div>
            )}

            {/* Cottages Grid */}
            {showCottages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCottages.map((cottage) => (
                  <Card key={cottage.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#D1DEEA] bg-white group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={cottage.image}
                        alt={cottage.type}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-[#1A2B3C]">{cottage.type}</h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[#64748B]">Capacity</p>
                          <p className="font-semibold text-[#1A2B3C]">Up to {cottage.maxPax} pax</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#20B2AA]">₱{cottage.price.toLocaleString()}</p>
                          <p className="text-xs text-[#64748B]">per day</p>
                        </div>
                      </div>

                      <Button className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                        Reserve Cottage
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!showCottages && filteredRooms.length === 0 && (
              <Card className="p-12 text-center border-[#D1DEEA]">
                <p className="text-lg text-[#64748B] mb-4">No rooms found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 10000]);
                    setMaxPax('all');
                    setRoomType('all');
                  }}
                  className="border-[#D1DEEA]"
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
