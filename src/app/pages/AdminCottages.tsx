import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { mockCottages } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export function AdminCottages() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cottages, setCottages] = React.useState(mockCottages);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const filteredCottages = cottages.filter(cottage =>
    cottage.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CottageModal = ({ cottage, isEdit = false }: { cottage?: typeof mockCottages[0]; isEdit?: boolean }) => {
    const [formData, setFormData] = React.useState(
      cottage || {
        id: '',
        type: '',
        price: 0,
        maxPax: 8,
        status: 'available' as const,
        image: '',
      }
    );

    return (
      <DialogContent className="max-w-md w-[95vw] rounded-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Cottage' : 'Add New Cottage'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="cottageType">Cottage Type</Label>
            <Input
              id="cottageType"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g., Nipa Cottage"
              className="border-[#D1DEEA]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₱/day)</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-[#D1DEEA] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="fully-booked">Fully Booked</SelectItem>
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

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              className="flex-1 bg-[#20B2AA] text-white hover:bg-[#1A9389]"
              onClick={() => setIsAddModalOpen(false)}
            >
              {isEdit ? 'Update Cottage' : 'Add Cottage'}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Cottage Management</h1>
            <p className="text-sm sm:text-base text-[#64748B]">Manage day-use cottages and pavilions</p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-[#64748B]" />
              <Input
                placeholder="Search cottages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#D1DEEA] w-full"
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#20B2AA] text-white hover:bg-[#1A9389] w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Cottage
                </Button>
              </DialogTrigger>
              <CottageModal />
            </Dialog>
          </div>

          {/* Cottages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCottages.map((cottage) => (
              <Card key={cottage.id} className="overflow-hidden border-[#D1DEEA] hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-48 sm:h-56">
                  <img src={cottage.image} alt={cottage.type} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 scale-90 sm:scale-100">
                    <StatusBadge status={cottage.status} />
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#1A2B3C] line-clamp-1">{cottage.type}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#64748B]">Price</p>
                      <p className="text-base sm:text-lg font-semibold text-[#20B2AA]">₱{cottage.price.toLocaleString()}</p>
                      <p className="text-[10px] text-[#64748B]">per day</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Capacity</p>
                      <p className="text-base sm:text-lg font-semibold text-[#1A2B3C]">{cottage.maxPax} pax</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 mt-auto border-t border-[#E5EDF2]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 border-[#D1DEEA] h-9 text-sm">
                          <Edit className="w-4 h-4 mr-2 hidden sm:inline" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <CottageModal cottage={cottage} isEdit />
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white h-9 text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2 hidden sm:inline" />
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