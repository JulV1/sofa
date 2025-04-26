import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Globe, Building, MapPin, Edit, Trash2 } from 'lucide-react';
import { contacts, organizations, notes, meetings, trainings, purchases } from '@/data/mockData';
import { Contact, Interaction } from '@/types/models';
import { ContactCard } from '@/components/contacts/ContactCard';
import { InteractionItem } from '@/components/interactions/InteractionItem';
import { useToast } from "@/hooks/use-toast";
import { OrganizationDialog } from '@/components/organizations/OrganizationDialog';

const OrganizationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const organization = organizations.find(o => o.id === id);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  
  if (!organization) {
    return (
      <AppLayout>
        <div className="crm-container">
          <div className="text-center py-8">
            <h2 className="text-xl font-medium mb-4">Organizace nebyla nalezena</h2>
            <Button variant="outline" asChild>
              <Link to="/organizations">Zpět na seznam organizací</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const associatedContacts = contacts.filter(contact => 
    contact.organizations?.some(org => org.id === organization.id)
  );
  
  const organizationInteractions: Interaction[] = [
    ...meetings.map(m => m),
    ...trainings.map(t => t),
    ...purchases.map(p => p),
    ...notes.map(n => n)
  ].filter(interaction => 
    interaction.relatedOrganizations?.some(org => org.id === organization.id) ||
    interaction.relatedContacts.some(c => 
      c.organizations?.some(org => org.id === organization.id)
    )
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting organization:', organization);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Smazání organizace bude implementováno s backendovým řešením",
    });
    setIsConfirmDeleteOpen(false);
  };

  const handleUpdate = (data: any) => {
    console.log('Updating organization:', data);
    toast({
      title: "Funkcionalita ve vývoji",
      description: "Úprava organizace bude implementována s backendovým řešením",
    });
    setIsDialogOpen(false);
  };

  const { name, description, email, phone, website, address, tags } = organization;
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to="/organizations" className="flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Zpět na seznam
            </Link>
          </Button>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleDelete}>
              <Trash2 size={16} className="mr-1" />
              Smazat
            </Button>
            <Button size="sm" onClick={handleEdit}>
              <Edit size={16} className="mr-1" />
              Upravit
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informace o organizaci</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 mb-4 bg-crm-primary text-white">
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{name}</h2>
                </div>
                
                <div className="space-y-3 mt-6">
                  {email && (
                    <div className="flex items-center">
                      <Mail size={18} className="mr-2 text-gray-400" />
                      <a href={`mailto:${email}`} className="text-crm-primary hover:underline">
                        {email}
                      </a>
                    </div>
                  )}
                  
                  {phone && (
                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-gray-400" />
                      <a href={`tel:${phone}`} className="text-crm-primary hover:underline">
                        {phone}
                      </a>
                    </div>
                  )}
                  
                  {website && (
                    <div className="flex items-center">
                      <Globe size={18} className="mr-2 text-gray-400" />
                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-crm-primary hover:underline">
                        {website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}

                  {address && (
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-gray-400" />
                      <span className="text-gray-600">{address}</span>
                    </div>
                  )}
                </div>
                
                {description && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Popis</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                )}
                
                {tags && tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Štítky</h3>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kontakty</CardTitle>
                <Button size="sm" asChild>
                  <Link to="/contacts">
                    Přidat kontakt
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {associatedContacts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {associatedContacts.map(contact => (
                      <ContactCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <h3 className="mt-2 text-lg font-medium">Žádné kontakty</h3>
                    <p className="mt-1 text-sm">Tato organizace nemá žádné přiřazené kontakty.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Historie interakcí</CardTitle>
                <Button size="sm">
                  Nová aktivita
                </Button>
              </CardHeader>
              <CardContent>
                {organizationInteractions.length > 0 ? (
                  <div className="space-y-4">
                    {organizationInteractions.map(interaction => (
                      <InteractionItem 
                        key={interaction.id} 
                        interaction={interaction}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <h3 className="mt-2 text-lg font-medium">Žádné interakce</h3>
                    <p className="mt-1 text-sm">S touto organizací zatím nejsou zaznamenány žádné interakce.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <OrganizationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        organization={organization}
        tags={tags}
        onSubmit={handleUpdate}
      />

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Potvrdit smazání</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Opravdu chcete smazat organizaci "{name}"?</p>
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

export default OrganizationDetail;
