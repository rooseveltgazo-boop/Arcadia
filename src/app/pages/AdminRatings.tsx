import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { Star, TrendingUp } from 'lucide-react';
import { mockReviews, mockRooms } from '../data/mockData';
import { ReviewCard } from '../components/ReviewCard';

export function AdminRatings() {
  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);
  const totalReviews = mockReviews.length;

  // Calculate room ratings
  const roomRatings = mockRooms.map(room => {
    const roomReviews = mockReviews.filter(r => r.roomName === room.name);
    const avgRating = roomReviews.length > 0
      ? (roomReviews.reduce((sum, r) => sum + r.rating, 0) / roomReviews.length).toFixed(1)
      : room.rating.toFixed(1);
    return {
      name: room.name,
      rating: avgRating,
      reviewCount: roomReviews.length,
    };
  }).sort((a, b) => Number(b.rating) - Number(a.rating));

  const ratingDistribution = [
    { stars: 5, count: mockReviews.filter(r => r.rating === 5).length },
    { stars: 4, count: mockReviews.filter(r => r.rating >= 4 && r.rating < 5).length },
    { stars: 3, count: mockReviews.filter(r => r.rating >= 3 && r.rating < 4).length },
    { stars: 2, count: mockReviews.filter(r => r.rating >= 2 && r.rating < 3).length },
    { stars: 1, count: mockReviews.filter(r => r.rating >= 1 && r.rating < 2).length },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFB]">
      <AdminSidebar />
      
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          {/* Header */}
          <div className="mb-8 mt-14 md:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Ratings & Feedback</h1>
            <p className="text-sm sm:text-base text-[#64748B]">Monitor customer reviews and satisfaction</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card className="p-5 sm:p-6 border-[#D1DEEA]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs sm:text-sm mb-1">Average Rating</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl sm:text-4xl font-bold text-[#1A2B3C]">{averageRating}</p>
                    <p className="text-xs sm:text-sm text-[#64748B]">/ 5.0</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 border-[#D1DEEA]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1A9389] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs sm:text-sm mb-1">Total Reviews</p>
                  <p className="text-2xl sm:text-4xl font-bold text-[#1A2B3C]">{totalReviews}</p>
                  <p className="text-xs text-[#22C55E] font-medium">+3 this week</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 border-[#D1DEEA] sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                  {((mockReviews.filter(r => r.rating >= 4).length / totalReviews) * 100).toFixed(0)}%
                </div>
                <div>
                  <p className="text-[#64748B] text-xs sm:text-sm mb-1">Satisfaction Rate</p>
                  <p className="text-2xl sm:text-4xl font-bold text-[#1A2B3C]">
                    {mockReviews.filter(r => r.rating >= 4).length}/{totalReviews}
                  </p>
                  <p className="text-xs sm:text-sm text-[#64748B]">Rated 4+ stars</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Rating Distribution */}
            <Card className="p-5 sm:p-6 border-[#D1DEEA]">
              <h3 className="text-lg font-semibold text-[#1A2B3C] mb-6">Rating Distribution</h3>
              <div className="space-y-4">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12 sm:w-14 shrink-0">
                      <span className="text-sm font-medium text-[#1A2B3C]">{item.stars}</span>
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    </div>
                    <div className="flex-1 h-2.5 bg-[#E5EDF2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full transition-all duration-500"
                        style={{ width: `${(item.count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#64748B] w-6 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Rated Rooms */}
            <Card className="p-5 sm:p-6 border-[#D1DEEA] lg:col-span-2 overflow-hidden">
              <h3 className="text-lg font-semibold text-[#1A2B3C] mb-6">Room Ratings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roomRatings.slice(0, 6).map((room, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-[#F8FAFB] rounded-xl border border-transparent hover:border-[#D1DEEA] transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold ${
                        idx === 0 ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]' : 
                        idx === 1 ? 'bg-gradient-to-br from-[#64748B] to-[#475569]' :
                        idx === 2 ? 'bg-gradient-to-br from-[#FF8B6A] to-[#FF6B4A]' :
                        'bg-[#E5EDF2] text-[#64748B]'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#1A2B3C] truncate text-sm sm:text-base">{room.name}</p>
                        <p className="text-xs text-[#64748B]">{room.reviewCount} reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#20B2AA]/10 px-2 sm:px-3 py-1 rounded-full shrink-0">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-semibold text-[#1A2B3C] text-xs sm:text-sm">{room.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Reviews */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1A2B3C] mb-6">Recent Reviews</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {mockReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}