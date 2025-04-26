
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Search, Plus, Filter, ArrowRight, Mail, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { organizations } from '@/data/mockData';

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredOrganizations, setFilteredOrganizations] = React.useState(organizations);

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrganizations(organizations);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = organizations.filter(org => {
      return org.name.toLowerCase().includes(lowerCaseSearch) || 
             (org.email && org.email.toLowerCase().includes(lowerCaseSearch));
    });
    
    setFilteredOrganizations(filtered);
  }, [searchTerm]);

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Organizace</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Hledat organizace..."
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
                <span>Nová organizace</span>
              </Button>
            </div>
          </div>
        </div>
        
        {filteredOrganizations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Žádné organizace nebyly nalezeny.</p>
            <Button className="mt-4" variant="outline" onClick={() => setSearchTerm('')}>
              Vyčistit filtr
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrganizations.map(org => (
              <Card key={org.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-crm-muted rounded-md flex items-center justify-center">
                        <Building className="h-6 w-6 text-crm-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{org.name}</h3>
                        {org.description && (
                          <p className="text-gray-500 text-sm line-clamp-1">{org.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {org.email && (
                        <div className="flex items-center text-sm">
                          <Mail size={16} className="mr-2 text-gray-400" />
                          <span className="text-gray-600">{org.email}</span>
                        </div>
                      )}
                      
                      {org.phone && (
                        <div className="flex items-center text-sm">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          <span className="text-gray-600">{org.phone}</span>
                        </div>
                      )}
                      
                      {org.website && (
                        <div className="flex items-center text-sm">
                          <Globe size={16} className="mr-2 text-gray-400" />
                          <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-crm-primary hover:underline">
                            {org.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {org.tags && org.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {org.tags.map((tag) => (
                          <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-3 border-t">
                    <Link 
                      to={`/organizations/${org.id}`}
                      className="text-sm text-crm-primary font-medium flex items-center hover:underline"
                    >
                      Zobrazit detail
                      <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default OrganizationsPage;
