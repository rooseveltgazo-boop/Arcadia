import React from 'react';
import { useParams, Link } from 'react-router';
import { UserNavbar } from '../components/UserNavbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ReviewCard } from '../components/ReviewCard';
import { 
  Star, 
  Users, 
  Maximize, 
  Check,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { mockRooms, mockReviews } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export function RoomDetails() {
  const { roomId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showGallery, setShowGallery] = React.useState(false);

  const room = mockRooms.find(r => r.id === roomId);
  const roomReviews = mockReviews.filter(r => room && r.roomName === room.name);

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

  // Mock multiple images (using same image for demo)
  const images = [room.image, room.image, room.image, room.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/rooms">
          <Button variant="outline" className="mb-6 border-[#D1DEEA]">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Rooms
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden border-[#D1DEEA]">
              <div className="relative h-96 bg-[#E5EDF2] group">
                <img
                  src={images[currentImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowGallery(true)}
                />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1A2B3C]" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 text-[#1A2B3C]" />
                </button>

                <div className="absolute top-4 right-4">
                  <StatusBadge status={room.status} />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2 p-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? 'border-[#20B2AA]' 
                        : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${room.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Room Details */}
            <Card className="p-8 border-[#D1DEEA]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#1A2B3C] mb-2">{room.name}</h1>
                  <p className="text-lg text-[#64748B]">{room.type}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#20B2AA]/10 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-xl font-bold text-[#1A2B3C]">{room.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-[#F8FAFB] rounded-lg">
                <div className="text-center">
                  <Users className="w-6 h-6 text-[#20B2AA] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B] mb-1">Max Guests</p>
                  <p className="font-semibold text-[#1A2B3C]">{room.maxPax} pax</p>
                </div>
                <div className="text-center">
                  <Maximize className="w-6 h-6 text-[#20B2AA] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B] mb-1">Room Size</p>
                  <p className="font-semibold text-[#1A2B3C]">{room.size} sqm</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-[#20B2AA] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B] mb-1">Rating</p>
                  <p className="font-semibold text-[#1A2B3C]">{room.rating}/5.0</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-4">Description</h3>
                <p className="text-[#64748B] leading-relaxed">{room.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#20B2AA]/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#20B2AA]" />
                      </div>
                      <span className="text-[#1A2B3C]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Reviews */}
            {roomReviews.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-[#1A2B3C] mb-6">Guest Reviews</h3>
                <div className="space-y-4">
                  {roomReviews.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-[#D1DEEA] sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-[#64748B] mb-1">Starting from</p>
                <p className="text-4xl font-bold text-[#20B2AA]">₱{room.price.toLocaleString()}</p>
                <p className="text-sm text-[#64748B]">per night</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[#F8FAFB] rounded-lg">
                  <p className="text-sm text-[#64748B] mb-2">Room Status</p>
                  <StatusBadge status={room.status} />
                </div>

                <div className="p-4 bg-[#20B2AA]/5 rounded-lg border border-[#20B2AA]/20">
                  <p className="text-sm font-medium text-[#1A2B3C] mb-2">✓ Free Cancellation</p>
                  <p className="text-xs text-[#64748B]">Cancel up to 24 hours before check-in</p>
                </div>
              </div>

              <Link to={`/booking/${room.id}`}>
                <Button 
                  size="lg" 
                  className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389] shadow-lg mb-3"
                  disabled={room.status === 'fully-booked' || room.status === 'maintenance'}
                >
                  {room.status === 'fully-booked' ? 'Fully Booked' : 'Book Now'}
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="w-full border-[#D1DEEA]">
                Contact Us
              </Button>

              <div className="mt-6 pt-6 border-t border-[#E5EDF2]">
                <p className="text-xs text-[#64748B] text-center">
                  You won't be charged yet. Review your booking before confirming.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={images[currentImageIndex]}
            alt={room.name}
            className="max-w-[90%] max-h-[90%] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
