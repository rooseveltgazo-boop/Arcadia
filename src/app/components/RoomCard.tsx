import React from 'react';
import { Card } from './ui/card';
import { Star, Users, Maximize } from 'lucide-react';
import { StatusBadge, StatusType } from './StatusBadge';
import { Button } from './ui/button';

export interface RoomCardProps {
  id: string;
  image: string;
  name: string;
  type: string;
  price: number;
  maxPax: number;
  rating?: number;
  status: StatusType;
  onViewDetails?: () => void;
  onBook?: () => void;
  showActions?: boolean;
}

export function RoomCard({
  image,
  name,
  type,
  price,
  maxPax,
  rating,
  status,
  onViewDetails,
  onBook,
  showActions = true,
}: RoomCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#D1DEEA] bg-white group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <StatusBadge status={status} />
        </div>
        {rating && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-semibold text-[#1A2B3C]">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold text-[#1A2B3C]">{name}</h3>
          </div>
          <p className="text-sm text-[#64748B]">{type}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Max {maxPax} pax</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E5EDF2]">
          <div>
            <p className="text-sm text-[#64748B]">Starting from</p>
            <p className="text-2xl font-bold text-[#20B2AA]">₱{price.toLocaleString()}</p>
            <p className="text-xs text-[#64748B]">per night</p>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA]/10"
              onClick={onViewDetails}
            >
              View Details
            </Button>
            <Button
              className="flex-1 bg-[#20B2AA] text-white hover:bg-[#1A9389]"
              onClick={onBook}
              disabled={status === 'fully-booked' || status === 'maintenance'}
            >
              Book Now
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
