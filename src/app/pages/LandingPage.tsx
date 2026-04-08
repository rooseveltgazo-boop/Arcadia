import React from 'react';
import { Link } from 'react-router';
import { UserNavbar } from '../components/UserNavbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { RoomCard } from '../components/RoomCard';
import { ReviewCard } from '../components/ReviewCard';
import { Star, Waves, Palmtree, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { mockRooms, mockReviews, resortInfo } from '../data/mockData';
import subic from "../../assets/uploads/subic.png";

export function LandingPage() {
  const featuredRooms = mockRooms.slice(0, 3);
  const featuredReviews = mockReviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <UserNavbar />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={subic}
            alt="Arcadia Crystal Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2B3C]/60 via-[#1A2B3C]/40 to-[#1A2B3C]/70" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Tropical
              <span className="block text-[#5FD8D0]">Paradise Awaits</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Experience luxury and tranquility at Arcadia Crystal Resort. 
              Where crystal-clear waters meet world-class hospitality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms">
                <Button size="lg" className="bg-[#20B2AA] text-white hover:bg-[#1A9389] shadow-xl">
                  Book Your Stay
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
                Explore Resort
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1A9389] flex items-center justify-center">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">Private Beach</h3>
              <p className="text-[#64748B]">Exclusive access to pristine white sand beaches and crystal-clear waters</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF8B6A] to-[#FF6B4A] flex items-center justify-center">
                <Palmtree className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">Luxury Villas</h3>
              <p className="text-[#64748B]">Spacious accommodations with stunning ocean views and modern amenities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A2B3C] mb-2">World-Class Service</h3>
              <p className="text-[#64748B]">24/7 concierge and personalized attention to make your stay perfect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A2B3C] mb-4">Featured Accommodations</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Discover our handpicked selection of luxury rooms and villas, each designed to provide the ultimate tropical escape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                onViewDetails={() => window.location.href = `/rooms/${room.id}`}
                onBook={() => window.location.href = `/booking/${room.id}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button size="lg" className="bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A2B3C] mb-4">Resort Experience</h2>
            <p className="text-lg text-[#64748B]">Immerse yourself in tropical luxury</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-96 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/flagged/photo-1569880286597-0019858e19d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZpbml0eSUyMHBvb2wlMjBvY2VhbiUyMHZpZXclMjBzdW5zZXR8ZW58MXx8fHwxNzc1NTczNTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Infinity Pool"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">Infinity Pool</h3>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1715242563833-946f4b811399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc3NTU3MzU5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Spa & Wellness"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">Spa & Wellness</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A2B3C] mb-4">Guest Reviews</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="text-2xl font-bold text-[#1A2B3C]">4.8</span>
              <span className="text-[#64748B]">({mockReviews.length} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#1A2B3C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-white/80 mb-8">
                Ready to book your dream vacation? Contact us today and let us help you plan the perfect tropical escape.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-white/80">{resortInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-white/80">{resortInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/80">{resortInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Booking</h3>
                <p className="text-white/80 mb-6">
                  Browse our available rooms and make your reservation today!
                </p>
                <Link to="/rooms">
                  <Button size="lg" className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                    View Available Rooms
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0F1A24] text-white/60 text-center">
        <p>&copy; 2026 Arcadia Crystal Resort. All rights reserved.</p>
      </footer>
    </div>
  );
}
