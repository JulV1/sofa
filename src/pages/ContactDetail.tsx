import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Building, Edit } from 'lucide-react';
import { contacts, notes, meetings, trainings, purchases } from '@/data/mockData';
import { InteractionItem } from '@/components/interactions/InteractionItem';
import { Interaction } from '@/types/models';

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const contact = contacts.find(c => c.id === id);
  
  if (!contact) {
    return (
      <AppLayout>
        <div className="crm-container">
          <div className="text-center py-8">
            <h2 className="text-xl font-medium mb-4">Kontakt nebyl nalezen</h2>
            <Button variant="outline" asChild>
              <Link to="/contacts">Zpět na seznam kontaktů</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const contactMeetings = meetings.filter(meeting => 
    meeting.participants.some(p => p.id === contact.id)
  );
  
  const contactNotes = notes.filter(note => 
    note.relatedContacts.some(c => c.id === contact.id)
  );

  const { firstName, lastName, email, phone, position, organizations, tags, notes: contactDescription } = contact;
  const primaryOrganization = organizations && organizations.length > 0 ? organizations[0] : undefined;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const contactInteractions: Interaction[] = [
    ...meetings.map(m => m),
    ...trainings.map(t => t),
    ...purchases.map(p => p),
    ...notes.map(n => n)
  ].filter(interaction => 
    interaction.relatedContacts.some(c => c.id === contact.id)
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to="/contacts" className="flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Zpět na seznam
            </Link>
          </Button>
          
          <Button size="sm">
            <Edit size={16} className="mr-1" />
            Upravit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informace o kontaktu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 mb-4 bg-crm-primary text-white">
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                  {position && <p className="text-gray-500">{position}</p>}
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
                  
                  {primaryOrganization && (
                    <div className="flex items-center">
                      <Building size={18} className="mr-2 text-gray-400" />
                      <Link to={`/organizations/${primaryOrganization.id}`} className="text-crm-primary hover:underline">
                        {primaryOrganization.name}
                      </Link>
                    </div>
                  )}
                </div>
                
                {organizations && organizations.length > 1 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Další organizace</h3>
                    <div className="space-y-2">
                      {organizations.slice(1).map(org => (
                        <div key={org.id} className="flex items-center">
                          <Building size={16} className="mr-2 text-gray-400" />
                          <Link to={`/organizations/${org.id}`} className="text-crm-primary hover:underline text-sm">
                            {org.name}
                          </Link>
                        </div>
                      ))}
                    </div>
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
                
                {contactDescription && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Poznámky</h3>
                    <p className="text-sm text-gray-600">{contactDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Historie interakcí</CardTitle>
                <Button size="sm">
                  Nová aktivita
                </Button>
              </CardHeader>
              <CardContent>
                {contactInteractions.length > 0 ? (
                  <div className="space-y-4">
                    {contactInteractions.map(interaction => (
                      <InteractionItem 
                        key={interaction.id} 
                        interaction={interaction}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <h3 className="mt-2 text-lg font-medium">Žádné interakce</h3>
                    <p className="mt-1 text-sm">S tímto kontaktem zatím nejsou zaznamenány žádné interakce.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactDetail;
