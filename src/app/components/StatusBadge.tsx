import React from 'react';
import { Badge } from './ui/badge';

export type StatusType = 'available' | 'few-left' | 'fully-booked' | 'maintenance' | 'reserved' | 'vacant';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
      case 'vacant':
        return {
          label: status === 'vacant' ? 'Vacant' : 'Available',
          className: 'bg-[#22C55E] text-white hover:bg-[#22C55E]/90',
        };
      case 'few-left':
        return {
          label: 'Few Rooms Left',
          className: 'bg-[#F59E0B] text-[#1A2B3C] hover:bg-[#F59E0B]/90',
        };
      case 'fully-booked':
        return {
          label: 'Fully Booked',
          className: 'bg-[#EF4444] text-white hover:bg-[#EF4444]/90',
        };
      case 'reserved':
        return {
          label: 'Reserved',
          className: 'bg-[#20B2AA] text-white hover:bg-[#20B2AA]/90',
        };
      case 'maintenance':
        return {
          label: 'Maintenance',
          className: 'bg-[#64748B] text-white hover:bg-[#64748B]/90',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-200 text-gray-700',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} ${className} font-medium`}>
      {config.label}
    </Badge>
  );
}
