import React, { useState } from 'react';
import { Contact, Organization } from '@/types/models';
import { ContactCard } from './ContactCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, Trash2, Edit } from 'lucide-react';
import { ContactDialog } from './ContactDialog';
import { useToast } from "@/hooks/use-toast";

interface ContactListProps {
  contacts: Contact[];
  organizations: Organization[];
}

export const ContactList: React.FC<ContactListProps> = ({ contacts: initialContacts, organizations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(initialContacts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const { toast } = useToast();

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(initialContacts);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = initialContacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const orgName = contact.organization?.name.toLowerCase() || '';
      return fullName.includes(lowerCaseSearch) || 
             (contact.email && contact.email.toLowerCase().includes(lowerCaseSearch)) ||
             orgName.includes(lowerCaseSearch);
    });
    
    setFilteredContacts(filtered);
  }, [searchTerm, initialContacts]);

  const handleAddContact = async (data: any) => {
    console.log('Adding contact:', data);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Přidání kontaktu bude implementováno s backendovým řešením",
    });
  };

  const handleEditContact = async (data: any) => {
    console.log('Editing contact:', data);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Úprava kontaktu bude implementována s backendovým řešením",
    });
  };

  const handleDeleteContact = async (contact: Contact) => {
    console.log('Deleting contact:', contact);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Smazání kontaktu bude implementováno s backendovým řešením",
    });
  };

  const openAddDialog = () => {
    setSelectedContact(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Kontakty</h2>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Hledat kontakty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button onClick={openAddDialog}>
              <Plus size={18} className="mr-1" />
              <span>Nový kontakt</span>
            </Button>
          </div>
        </div>
      </div>
      
      {filteredContacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Žádné kontakty nebyly nalezeny.</p>
          <Button className="mt-4" variant="outline" onClick={() => setSearchTerm('')}>
            Vyčistit filtr
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="relative group">
              <ContactCard contact={contact} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => openEditDialog(contact)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ContactDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        contact={selectedContact}
        organizations={organizations}
        onSubmit={selectedContact ? handleEditContact : handleAddContact}
      />
    </div>
  );
};
