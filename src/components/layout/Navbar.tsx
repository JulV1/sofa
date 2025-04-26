
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActivityDialog } from '@/components/activities/ActivityDialog';
import { ContactDialog } from '@/components/contacts/ContactDialog';
import { organizations, tags } from '@/data/mockData';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ai-insight?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCreateActivity = () => {
    setIsActivityDialogOpen(true);
  };

  const handleCreateContact = () => {
    setIsContactDialogOpen(true);
  };

  const handleActivitySubmit = (data: any) => {
    console.log('New activity:', data);
    setIsActivityDialogOpen(false);
  };

  const handleContactSubmit = (data: any) => {
    console.log('New contact:', data);
    setIsContactDialogOpen(false);
  };

  return (
    <header className="bg-white border-b border-crm-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            <Menu size={20} />
          </Button>
          <div className="relative max-w-md w-full mr-4 hidden md:block">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Hledejte region, aktivitu, téma..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={handleCreateActivity}>
            <Plus size={16} className="mr-1" /> Nová aktivita
          </Button>
          <Button size="sm" className="hidden sm:flex" onClick={handleCreateContact}>
            <Plus size={16} className="mr-1" /> Nový kontakt
          </Button>
          <Button variant="ghost" size="sm" className="sm:hidden" onClick={handleCreateActivity}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      <ActivityDialog
        isOpen={isActivityDialogOpen}
        onClose={() => setIsActivityDialogOpen(false)}
        onSubmit={handleActivitySubmit}
      />

      <ContactDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        onSubmit={handleContactSubmit}
        organizations={organizations}
        tags={tags}
      />
    </header>
  );
};
