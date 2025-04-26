
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Plus, Filter, Calendar } from 'lucide-react';
import { notes } from '@/data/mockData';
import { format } from 'date-fns';

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredNotes, setFilteredNotes] = React.useState(notes);

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(notes);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = notes.filter(note => {
      return note.title.toLowerCase().includes(lowerCaseSearch) || 
             note.content.toLowerCase().includes(lowerCaseSearch) ||
             note.description.toLowerCase().includes(lowerCaseSearch);
    });
    
    setFilteredNotes(filtered);
  }, [searchTerm]);

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Poznámky</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Hledat poznámky..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
              <Button>
                <Plus size={18} className="mr-1" />
                <span>Nová poznámka</span>
              </Button>
            </div>
          </div>
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Žádné poznámky nebyly nalezeny.</p>
            <Button className="mt-4" variant="outline" onClick={() => setSearchTerm('')}>
              Vyčistit filtr
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map(note => (
              <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {format(new Date(note.createdAt), 'dd.MM.yyyy')}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-4 mb-3">{note.content}</p>
                  
                  <div className="flex flex-wrap items-center mt-auto">
                    {note.tags && note.tags.length > 0 && (
                      <div className="mr-auto flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <MessageSquare size={16} className="mr-1" /> Detail
                    </Button>
                  </div>
                  
                  {note.relatedContacts && note.relatedContacts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Související kontakty:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {note.relatedContacts.map(contact => (
                          <span key={contact.id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            {contact.firstName} {contact.lastName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default NotesPage;
