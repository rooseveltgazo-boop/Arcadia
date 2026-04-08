import React from 'react';
import { Card } from './ui/card';
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  roomName?: string;
}

export function ReviewCard({
  userName,
  userImage,
  rating,
  date,
  comment,
  roomName,
}: ReviewCardProps) {
  return (
    <Card className="p-6 space-y-4 border border-[#D1DEEA] bg-white hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#E5EDF2] flex items-center justify-center">
              <User className="w-6 h-6 text-[#64748B]" />
            </div>
          )}
          <div>
            <h4 className="font-semibold text-[#1A2B3C]">{userName}</h4>
            <p className="text-sm text-[#64748B]">{date}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-[#20B2AA]/10 px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="font-semibold text-[#1A2B3C]">{rating.toFixed(1)}</span>
        </div>
      </div>

      {roomName && (
        <p className="text-sm text-[#20B2AA] font-medium">{roomName}</p>
      )}

      <p className="text-[#1A2B3C] leading-relaxed">{comment}</p>
    </Card>
  );
}
