import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { mockRooms } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export function AdminRooms() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [rooms, setRooms] = React.useState(mockRooms);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RoomModal = ({ room, isEdit = false }: { room?: typeof mockRooms[0]; isEdit?: boolean }) => {
    const [formData, setFormData] = React.useState(
      room || {
        id: '',
        name: '',
        type: '',
        price: 0,
        maxPax: 2,
        rating: 0,
        status: 'available' as const,
        image: '',
        description: '',
        amenities: [],
        size: 0,
      }
    );

    return (
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Room' : 'Add New Room'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Deluxe Ocean View Suite"
                className="border-[#D1DEEA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Input
                id="roomType"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., Deluxe Suite"
                className="border-[#D1DEEA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₱/night)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="border-[#D1DEEA]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPax">Max Pax</Label>
              <Input
                id="maxPax"
                type="number"
                value={formData.maxPax}
                onChange={(e) => setFormData({ ...formData, maxPax: Number(e.target.value) })}
                className="border-[#D1DEEA]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (sqm)</Label>
              <Input
                id="size"
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                className="border-[#D1DEEA]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-[#D1DEEA] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="few-left">Few Rooms Left</SelectItem>
                <SelectItem value="fully-booked">Fully Booked</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              className="border-[#D1DEEA]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="border-[#D1DEEA] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Textarea
              id="amenities"
              value={formData.amenities.join(', ')}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(',').map(a => a.trim()) })}
              rows={2}
              placeholder="Ocean View, King Bed, Private Balcony..."
              className="border-[#D1DEEA] resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              className="flex-1 bg-[#20B2AA] text-white hover:bg-[#1A9389]"
              onClick={() => setIsAddModalOpen(false)}
            >
              {isEdit ? 'Update Room' : 'Add Room'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-[#D1DEEA]"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFB]">
      <AdminSidebar />
      
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          {/* Header */}
          <div className="mb-8 mt-14 md:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Room Management</h1>
            <p className="text-sm sm:text-base text-[#64748B]">Manage your resort's rooms and accommodations</p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-[#64748B]" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#D1DEEA] w-full"
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389] w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </Button>
              </DialogTrigger>
              <RoomModal />
            </Dialog>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden border-[#D1DEEA] hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-48 sm:h-56">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 scale-90 sm:scale-100">
                    <StatusBadge status={room.status} />
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#1A2B3C] mb-1 line-clamp-1">{room.name}</h3>
                    <p className="text-sm text-[#64748B]">{room.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs sm:text-sm mb-5">
                    <div>
                      <p className="text-[#64748B]">Price</p>
                      <p className="font-semibold text-[#1A2B3C]">₱{room.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Max Pax</p>
                      <p className="font-semibold text-[#1A2B3C]">{room.maxPax} guests</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Size</p>
                      <p className="font-semibold text-[#1A2B3C]">{room.size} sqm</p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">Rating</p>
                      <p className="font-semibold text-[#1A2B3C]">{room.rating} ⭐</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 mt-auto border-t border-[#E5EDF2]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 border-[#D1DEEA] text-xs sm:text-sm h-9">
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <RoomModal room={room} isEdit />
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white text-xs sm:text-sm h-9"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}