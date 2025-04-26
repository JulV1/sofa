
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, MessageSquare, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { name: 'Kontakty', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Organizace', path: '/organizations', icon: <Users size={20} /> },
    { name: 'Schůzky', path: '/meetings', icon: <Calendar size={20} /> },
    { name: 'Poznámky', path: '/notes', icon: <MessageSquare size={20} /> },
    { name: 'Profil', path: '/profile', icon: <User size={20} /> },
    { name: 'Nastavení', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={`bg-white border-r border-crm-border transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } h-full flex flex-col`}
    >
      <div className="p-4 border-b border-crm-border flex items-center justify-center">
        {isOpen ? (
          <h1 className="text-xl font-bold text-crm-primary">CRM Nexus</h1>
        ) : (
          <span className="text-xl font-bold text-crm-primary">CN</span>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-crm-muted text-crm-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-crm-border">
        {isOpen && (
          <Button variant="outline" className="w-full">
            Odhlásit
          </Button>
        )}
      </div>
    </div>
  );
};
