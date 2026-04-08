export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  maxPax: number;
  rating: number;
  status: 'available' | 'few-left' | 'fully-booked' | 'maintenance' | 'reserved' | 'vacant';
  image: string;
  description: string;
  amenities: string[];
  size?: number;
}

export interface Cottage {
  id: string;
  type: string;
  price: number;
  maxPax: number;
  status: 'available' | 'fully-booked';
  image: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  userName: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  roomName: string;
}

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe Ocean View Suite',
    type: 'Deluxe Suite',
    price: 5500,
    maxPax: 4,
    rating: 4.9,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    description: 'Experience luxury with breathtaking ocean views. This spacious suite features modern amenities and elegant tropical decor.',
    amenities: ['Ocean View', 'King Bed', 'Private Balcony', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Smart TV', 'Free Wi-Fi'],
    size: 45,
  },
  {
    id: '2',
    name: 'Premium Garden Villa',
    type: 'Villa',
    price: 7200,
    maxPax: 6,
    rating: 4.8,
    status: 'few-left',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description: 'A private villa surrounded by lush tropical gardens. Perfect for families or groups seeking privacy and luxury.',
    amenities: ['Garden View', '2 Bedrooms', 'Private Pool', 'Kitchen', 'Living Room', 'Dining Area', 'BBQ Area', 'Free Wi-Fi'],
    size: 80,
  },
  {
    id: '3',
    name: 'Beachfront Paradise Room',
    type: 'Beachfront',
    price: 6800,
    maxPax: 2,
    rating: 5.0,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    description: 'Wake up to the sound of waves in this stunning beachfront room with direct beach access.',
    amenities: ['Beach Access', 'Queen Bed', 'Ocean View', 'Private Terrace', 'Outdoor Shower', 'Mini Bar', 'Free Wi-Fi'],
    size: 35,
  },
  {
    id: '4',
    name: 'Family Suite',
    type: 'Family Room',
    price: 4800,
    maxPax: 5,
    rating: 4.7,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    description: 'Spacious accommodations perfect for families with children. Features connecting rooms and family-friendly amenities.',
    amenities: ['2 Connecting Rooms', 'Garden View', 'Kids Play Area', 'Extra Beds', 'Kitchenette', 'Free Wi-Fi'],
    size: 55,
  },
  {
    id: '5',
    name: 'Honeymoon Suite',
    type: 'Luxury Suite',
    price: 8500,
    maxPax: 2,
    rating: 5.0,
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    description: 'The ultimate romantic escape with luxury amenities and stunning views. Perfect for honeymooners.',
    amenities: ['Ocean View', 'King Bed', 'Jacuzzi', 'Private Infinity Pool', 'Butler Service', 'Champagne', 'Couples Massage', 'Free Wi-Fi'],
    size: 60,
  },
  {
    id: '6',
    name: 'Standard Tropical Room',
    type: 'Standard',
    price: 3500,
    maxPax: 2,
    rating: 4.5,
    status: 'fully-booked',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    description: 'Comfortable and affordable room with tropical touches. Great value for budget-conscious travelers.',
    amenities: ['Garden View', 'Queen Bed', 'Air Conditioning', 'TV', 'Free Wi-Fi'],
    size: 28,
  },
];

export const mockCottages: Cottage[] = [
  {
    id: 'c1',
    type: 'Nipa Cottage',
    price: 1500,
    maxPax: 8,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&q=80',
  },
  {
    id: 'c2',
    type: 'Beach Cabana',
    price: 2000,
    maxPax: 10,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
  },
  {
    id: 'c3',
    type: 'Garden Pavilion',
    price: 1800,
    maxPax: 12,
    status: 'fully-booked',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    roomId: '1',
    roomName: 'Deluxe Ocean View Suite',
    checkIn: '2026-04-15',
    checkOut: '2026-04-18',
    guests: 2,
    totalPrice: 16500,
    status: 'confirmed',
    userName: 'John Smith',
  },
  {
    id: 'b2',
    roomId: '2',
    roomName: 'Premium Garden Villa',
    checkIn: '2026-04-20',
    checkOut: '2026-04-25',
    guests: 4,
    totalPrice: 36000,
    status: 'confirmed',
    userName: 'Maria Santos',
  },
  {
    id: 'b3',
    roomId: '5',
    roomName: 'Honeymoon Suite',
    checkIn: '2026-04-10',
    checkOut: '2026-04-12',
    guests: 2,
    totalPrice: 17000,
    status: 'pending',
    userName: 'Alex Johnson',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    userName: 'Sarah Williams',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5.0,
    date: 'March 28, 2026',
    comment: 'Absolutely amazing experience! The ocean view suite was spectacular and the staff was incredibly friendly. The resort exceeded all our expectations. Can\'t wait to come back!',
    roomName: 'Deluxe Ocean View Suite',
  },
  {
    id: 'r2',
    userName: 'Michael Chen',
    rating: 4.8,
    date: 'March 25, 2026',
    comment: 'Great place for a family vacation. The villa was spacious and well-maintained. Kids loved the pool. Only minor issue was the Wi-Fi speed, but overall a fantastic stay.',
    roomName: 'Premium Garden Villa',
  },
  {
    id: 'r3',
    userName: 'Emma Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5.0,
    date: 'March 20, 2026',
    comment: 'Perfect honeymoon destination! The suite was luxurious and romantic. The private pool and couples massage made it unforgettable. Highly recommend!',
    roomName: 'Honeymoon Suite',
  },
  {
    id: 'r4',
    userName: 'David Park',
    rating: 4.5,
    date: 'March 15, 2026',
    comment: 'Good value for money. The standard room was clean and comfortable. Beach access was convenient. Would definitely return.',
    roomName: 'Standard Tropical Room',
  },
];

export const resortInfo = {
  name: 'Arcadia Crystal Resort',
  phone: '+63 917 123 4567',
  email: 'info@arcadiacrystal.com',
  address: 'Coral Bay, Paradise Island, Philippines',
  description: 'Nestled along pristine white sand beaches and surrounded by crystal-clear turquoise waters, Arcadia Crystal Resort offers an unparalleled tropical paradise experience. Our world-class amenities, luxurious accommodations, and exceptional service create the perfect setting for your dream vacation.',
  features: [
    'Private Beach Access',
    'Infinity Pool',
    'Spa & Wellness Center',
    '24/7 Concierge',
    'Fine Dining Restaurant',
    'Water Sports',
    'Free Wi-Fi',
    'Airport Shuttle',
  ],
};
