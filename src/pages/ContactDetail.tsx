
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Building, Calendar, MessageSquare, Edit } from 'lucide-react';
import { contacts, notes, meetings } from '@/data/mockData';

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

  const { firstName, lastName, email, phone, position, organization, tags, notes: contactDescription } = contact;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

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
                  
                  {organization && (
                    <div className="flex items-center">
                      <Building size={18} className="mr-2 text-gray-400" />
                      <Link to={`/organizations/${organization.id}`} className="text-crm-primary hover:underline">
                        {organization.name}
                      </Link>
                    </div>
                  )}
                </div>
                
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
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="notes" className="flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  Poznámky
                </TabsTrigger>
                <TabsTrigger value="meetings" className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Schůzky
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="notes">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Poznámky</CardTitle>
                    <Button size="sm">
                      <MessageSquare size={16} className="mr-1" />
                      Nová poznámka
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {contactNotes.length > 0 ? (
                      <div className="space-y-4">
                        {contactNotes.map(note => (
                          <div key={note.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{note.title}</h3>
                              <span className="text-xs text-gray-500">
                                {new Date(note.createdAt).toLocaleDateString('cs-CZ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{note.content}</p>
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {note.tags.map((tag) => (
                                  <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                    {tag.name}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-2 text-lg font-medium">Žádné poznámky</h3>
                        <p className="mt-1 text-sm">K tomuto kontaktu zatím nejsou žádné poznámky.</p>
                        <Button className="mt-4" size="sm">
                          <MessageSquare size={16} className="mr-1" />
                          Přidat poznámku
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="meetings">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Schůzky</CardTitle>
                    <Button size="sm">
                      <Calendar size={16} className="mr-1" />
                      Nová schůzka
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {contactMeetings.length > 0 ? (
                      <div className="space-y-4">
                        {contactMeetings.map(meeting => (
                          <div key={meeting.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{meeting.title}</h3>
                              <div className="text-xs">
                                <span className={`inline-block rounded-full px-2 py-1 ${meeting.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {meeting.isCompleted ? 'Dokončeno' : 'Plánováno'}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(meeting.date).toLocaleString('cs-CZ', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit', 
                                minute: '2-digit'
                              })} ({meeting.duration} min)
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                            {meeting.location && (
                              <p className="text-xs text-gray-500 mt-2">Místo: {meeting.location}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-2 text-lg font-medium">Žádné schůzky</h3>
                        <p className="mt-1 text-sm">K tomuto kontaktu zatím nejsou žádné schůzky.</p>
                        <Button className="mt-4" size="sm">
                          <Calendar size={16} className="mr-1" />
                          Naplánovat schůzku
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactDetail;
