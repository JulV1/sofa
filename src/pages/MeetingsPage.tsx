
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Plus, Filter, Clock, MapPin } from 'lucide-react';
import { meetings } from '@/data/mockData';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

const MeetingsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredMeetings, setFilteredMeetings] = React.useState(meetings);

  const upcomingMeetings = filteredMeetings.filter(m => !m.isCompleted && new Date(m.date) > new Date());
  const pastMeetings = filteredMeetings.filter(m => m.isCompleted || new Date(m.date) < new Date());

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMeetings(meetings);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = meetings.filter(meeting => {
      return meeting.title.toLowerCase().includes(lowerCaseSearch) || 
             meeting.description.toLowerCase().includes(lowerCaseSearch) ||
             (meeting.location && meeting.location.toLowerCase().includes(lowerCaseSearch));
    });
    
    setFilteredMeetings(filtered);
  }, [searchTerm]);

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Schůzky</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Hledat schůzky..."
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
                <span>Nová schůzka</span>
              </Button>
            </div>
          </div>
        </div>
        
        {filteredMeetings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Žádné schůzky nebyly nalezeny.</p>
            <Button className="mt-4" variant="outline" onClick={() => setSearchTerm('')}>
              Vyčistit filtr
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingMeetings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Nadcházející schůzky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.map(meeting => (
                      <div key={meeting.id} className="flex border-b pb-4 last:border-0">
                        <div className="mr-4 flex flex-col items-center justify-start">
                          <div className="w-16 text-center bg-crm-primary text-white rounded-t-md py-1">
                            {format(new Date(meeting.date), 'MMM', { locale: cs })}
                          </div>
                          <div className="w-16 text-center text-2xl font-bold bg-white border border-crm-primary rounded-b-md py-1">
                            {format(new Date(meeting.date), 'd')}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{meeting.title}</h3>
                          <div className="flex flex-wrap text-sm text-gray-500 mt-1">
                            <div className="flex items-center mr-3">
                              <Clock size={14} className="mr-1" />
                              {format(new Date(meeting.date), 'HH:mm')}
                              <span className="mx-1">•</span>
                              {meeting.duration} min
                            </div>
                            {meeting.location && (
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {meeting.location}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
                          
                          {meeting.tags && meeting.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {meeting.tags.map((tag) => (
                                <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {meeting.participants && meeting.participants.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">Účastníci:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {meeting.participants.map((participant) => (
                                  <span key={participant.id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                    {participant.firstName} {participant.lastName}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {pastMeetings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Proběhlé schůzky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastMeetings.map(meeting => (
                      <div key={meeting.id} className="flex border-b pb-4 last:border-0">
                        <div className="mr-4 flex flex-col items-center justify-start">
                          <div className="w-16 text-center bg-gray-300 text-gray-700 rounded-t-md py-1">
                            {format(new Date(meeting.date), 'MMM', { locale: cs })}
                          </div>
                          <div className="w-16 text-center text-2xl font-bold bg-white border border-gray-300 rounded-b-md py-1">
                            {format(new Date(meeting.date), 'd')}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium mr-2">{meeting.title}</h3>
                            {meeting.isCompleted && (
                              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                Dokončeno
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap text-sm text-gray-500 mt-1">
                            <div className="flex items-center mr-3">
                              <Clock size={14} className="mr-1" />
                              {format(new Date(meeting.date), 'HH:mm')}
                              <span className="mx-1">•</span>
                              {meeting.duration} min
                            </div>
                            {meeting.location && (
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {meeting.location}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
                          
                          {meeting.tags && meeting.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {meeting.tags.map((tag) => (
                                <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MeetingsPage;
