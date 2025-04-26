
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Search, Plus, Filter, ArrowRight, Mail, Phone, Globe, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { organizations, tags } from '@/data/mockData';
import { OrganizationDialog } from '@/components/organizations/OrganizationDialog';
import { useToast } from "@/hooks/use-toast";
import { Organization } from '@/types/models';

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredOrganizations, setFilteredOrganizations] = React.useState(organizations);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOrganization, setSelectedOrganization] = React.useState<Organization | undefined>();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  const [organizationToDelete, setOrganizationToDelete] = React.useState<Organization | null>(null);
  const { toast } = useToast();

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

  const handleAddOrganization = async (data: any) => {
    console.log('Adding organization:', data);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Přidání organizace bude implementováno s backendovým řešením",
    });
    setIsDialogOpen(false);
  };

  const handleEditOrganization = async (data: any) => {
    console.log('Editing organization:', data);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Úprava organizace bude implementována s backendovým řešením",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteOrganization = (organization: Organization) => {
    setOrganizationToDelete(organization);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (organizationToDelete) {
      console.log('Deleting organization:', organizationToDelete);
      toast({
        title: "Funkcionalita ve vývoji",
        description: "Smazání organizace bude implementováno s backendovým řešením",
      });
    }
    setIsConfirmDeleteOpen(false);
    setOrganizationToDelete(null);
  };

  const openAddDialog = () => {
    setSelectedOrganization(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDialogOpen(true);
  };

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
              <Button onClick={openAddDialog}>
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
              <Card key={org.id} className="overflow-hidden hover:shadow-md transition-shadow relative group">
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
                  
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        openEditDialog(org);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteOrganization(org);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Organization Add/Edit Dialog */}
      <OrganizationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        organization={selectedOrganization}
        tags={tags}
        onSubmit={selectedOrganization ? handleEditOrganization : handleAddOrganization}
      />

      {/* Delete Confirmation Dialog */}
      {isConfirmDeleteOpen && organizationToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="w-[400px]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Potvrdit smazání</h3>
              <p>Opravdu chcete smazat organizaci "{organizationToDelete.name}"?</p>
              <p className="text-sm text-gray-500 mt-2">Tato akce je nevratná.</p>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
                  Zrušit
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Smazat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
};

export default OrganizationsPage;
