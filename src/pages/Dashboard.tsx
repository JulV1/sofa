
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
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Celkem kontaktů</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-xs text-muted-foreground">
                {organizations.length} organizací
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Nadcházející schůzky</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
              <p className="text-xs text-muted-foreground">
                Tento týden
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Poznámky</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notes.length}</div>
              <p className="text-xs text-muted-foreground">
                Celkem vytvořeno
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nadcházející schůzky</CardTitle>
              <CardDescription>
                Seznam vašich nadcházejících schůzek
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMeetings.map(meeting => (
                    <div key={meeting.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(meeting.date).toLocaleString('cs-CZ', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-sm">
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
                <div className="text-center py-4 text-muted-foreground">
                  Nemáte žádné naplánované schůzky
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Poslední poznámky</CardTitle>
              <CardDescription>
                Naposledy vytvořené poznámky
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map(note => (
                    <div key={note.id} className="border-b pb-3 last:border-0">
                      <div>
                        <h3 className="font-medium">{note.title}</h3>
                        <p className="text-sm text-gray-500">
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
                <div className="text-center py-4 text-muted-foreground">
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
