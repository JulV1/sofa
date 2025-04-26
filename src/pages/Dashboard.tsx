
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MessageSquare } from 'lucide-react';
import { contacts, organizations, meetings, notes } from '@/data/mockData';

const Dashboard = () => {
  const upcomingMeetings = meetings.filter(
    meeting => !meeting.isCompleted && new Date(meeting.date) > new Date()
  );
  
  return (
    <AppLayout>
      <div className="crm-container">
        <h1 className="text-3xl font-bold mb-8 text-crm-foreground">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-crm-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Celkem kontaktů</CardTitle>
              <Users className="h-5 w-5 text-crm-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-primary">{contacts.length}</div>
              <p className="text-sm text-gray-600">
                {organizations.length} organizací
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-crm-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Nadcházející schůzky</CardTitle>
              <Calendar className="h-5 w-5 text-crm-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-accent">{upcomingMeetings.length}</div>
              <p className="text-sm text-gray-600">
                Tento týden
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-crm-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Poznámky</CardTitle>
              <MessageSquare className="h-5 w-5 text-crm-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-secondary">{notes.length}</div>
              <p className="text-sm text-gray-600">
                Celkem vytvořeno
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-crm-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-crm-foreground">
                Nadcházející schůzky
              </CardTitle>
              <CardDescription className="text-gray-600">
                Seznam vašich nadcházejících schůzek
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMeetings.map(meeting => (
                    <div key={meeting.id} className="border-b border-crm-border pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-crm-foreground">{meeting.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(meeting.date).toLocaleString('cs-CZ', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-sm text-crm-primary font-medium">
                          {meeting.duration} min
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{meeting.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nemáte žádné naplánované schůzky
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-crm-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-crm-foreground">
                Poslední poznámky
              </CardTitle>
              <CardDescription className="text-gray-600">
                Naposledy vytvořené poznámky
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map(note => (
                    <div key={note.id} className="border-b border-crm-border pb-4 last:border-0">
                      <div>
                        <h3 className="font-medium text-crm-foreground">{note.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(note.createdAt).toLocaleDateString('cs-CZ')}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Žádné poznámky zatím nebyly vytvořeny
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
