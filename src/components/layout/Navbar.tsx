
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, Plus } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-crm-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            <Menu size={20} />
          </Button>
          <div className="relative max-w-md w-full mr-4 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Hledejte kontakty, schůzky..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Plus size={16} className="mr-1" /> Nová poznámka
          </Button>
          <Button size="sm" className="hidden sm:flex">
            <Plus size={16} className="mr-1" /> Nový kontakt
          </Button>
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Plus size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
