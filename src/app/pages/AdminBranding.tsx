import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Upload, MapPin, Phone, Mail, Image } from 'lucide-react';
import { resortInfo } from '../data/mockData';

export function AdminBranding() {
  const [formData, setFormData] = React.useState(resortInfo);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFB]">
      <AdminSidebar />
      
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
          
          {/* Header - Inadjust para sa mobile top nav space */}
          <div className="mb-8 mt-14 md:mt-0 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2">Resort Branding</h1>
            <p className="text-sm sm:text-base text-[#64748B]">Manage your resort's information and appearance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* Logo Upload - Full width on mobile */}
            <Card className="p-5 sm:p-6 border-[#D1DEEA] h-fit w-full">
              <h3 className="text-lg font-semibold text-[#1A2B3C] mb-4">Resort Logo</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1A9389] flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
                  AC
                </div>
                <Button variant="outline" className="w-full border-[#D1DEEA]">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
                <p className="text-[10px] sm:text-xs text-[#64748B] text-center">
                  Recommended: Square image, min 400x400px
                </p>
              </div>
            </Card>

            {/* Basic Information - Full width mobile, span 2 columns desktop */}
            <Card className="p-5 sm:p-6 border-[#D1DEEA] lg:col-span-2 w-full">
              <h3 className="text-lg font-semibold text-[#1A2B3C] mb-6">Basic Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Resort Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-[#D1DEEA] w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 border-[#D1DEEA] w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 border-[#D1DEEA] w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="pl-10 border-[#D1DEEA] w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Resort Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className="border-[#D1DEEA] resize-none w-full"
                  />
                </div>

                <Button className="w-full bg-[#20B2AA] text-white hover:bg-[#1A9389] py-6 text-base font-semibold">
                  Save Changes
                </Button>
              </div>
            </Card>
          </div>

          {/* Location Map - Fully Stretched */}
          <Card className="mt-6 p-5 sm:p-6 border-[#D1DEEA] w-full">
            <h3 className="text-lg font-semibold text-[#1A2B3C] mb-4">Location Map</h3>
            <div className="bg-[#E5EDF2] rounded-lg h-64 sm:h-80 flex items-center justify-center w-full">
              <div className="text-center p-4">
                <MapPin className="w-10 h-10 text-[#64748B] mx-auto mb-2" />
                <p className="text-sm text-[#64748B]">Map Embed Placeholder</p>
                <Button variant="outline" className="mt-4 border-[#D1DEEA]">
                  <Upload className="w-4 h-4 mr-2" />
                  Configure Map
                </Button>
              </div>
            </div>
          </Card>

          {/* Gallery Manager - Grid responsive 2 columns mobile */}
          <Card className="mt-6 p-5 sm:p-6 border-[#D1DEEA] w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-[#1A2B3C]">Resort Gallery</h3>
              <Button className="w-full sm:w-auto bg-[#20B2AA] text-white hover:bg-[#1A9389]">
                <Upload className="w-4 h-4 mr-2" />
                Add Images
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="relative group aspect-square bg-[#E5EDF2] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image className="w-8 h-8 sm:w-12 sm:h-12 text-[#64748B]" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="h-8 text-xs">Edit</Button>
                    <Button size="sm" variant="destructive" className="h-8 text-xs">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Features - Flex/Grid fully responsive */}
          <Card className="mt-6 p-5 sm:p-6 border-[#D1DEEA] w-full">
            <h3 className="text-lg font-semibold text-[#1A2B3C] mb-4">Resort Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-[#20B2AA]/10 text-[#20B2AA] rounded-lg text-center text-xs sm:text-sm font-medium hover:bg-[#20B2AA]/20 transition-colors cursor-pointer truncate"
                >
                  {feature}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-[#D1DEEA]">
              + Add Feature
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}