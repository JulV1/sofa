
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
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-crm-primary via-crm-secondary to-crm-accent bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card border-crm-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Celkem kontaktů</CardTitle>
              <Users className="h-5 w-5 text-crm-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-secondary">{contacts.length}</div>
              <p className="text-sm text-crm-primary/80">
                {organizations.length} organizací
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-crm-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Nadcházející schůzky</CardTitle>
              <Calendar className="h-5 w-5 text-crm-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-secondary">{upcomingMeetings.length}</div>
              <p className="text-sm text-crm-primary/80">
                Tento týden
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-crm-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">Poznámky</CardTitle>
              <MessageSquare className="h-5 w-5 text-crm-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-crm-secondary">{notes.length}</div>
              <p className="text-sm text-crm-primary/80">
                Celkem vytvořeno
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="gradient-card border-crm-border">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-crm-primary to-crm-secondary bg-clip-text text-transparent">
                Nadcházející schůzky
              </CardTitle>
              <CardDescription className="text-crm-primary/70">
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
                          <p className="text-sm text-crm-primary/70">
                            {new Date(meeting.date).toLocaleString('cs-CZ', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-sm text-crm-secondary font-medium">
                          {meeting.duration} min
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-crm-foreground/70">{meeting.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-crm-primary/60">
                  Nemáte žádné naplánované schůzky
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-crm-border">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-crm-accent to-crm-secondary bg-clip-text text-transparent">
                Poslední poznámky
              </CardTitle>
              <CardDescription className="text-crm-primary/70">
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
                        <p className="text-sm text-crm-primary/70">
                          {new Date(note.createdAt).toLocaleDateString('cs-CZ')}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-crm-foreground/70 line-clamp-2">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-crm-primary/60">
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
