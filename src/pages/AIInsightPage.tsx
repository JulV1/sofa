
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building, Users, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { contacts, organizations, meetings, notes, trainings } from '@/data/mockData';
import { Contact, Organization, Interaction } from '@/types/models';

const AIInsightPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [relevantOrganizations, setRelevantOrganizations] = useState<Organization[]>([]);
  const [relevantContacts, setRelevantContacts] = useState<Contact[]>([]);
  const [insightSummary, setInsightSummary] = useState('');
  const [recentActivities, setRecentActivities] = useState<Interaction[]>([]);

  // Simulace načítání dat a AI analýzy
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulujeme, že jsme v regionu Plzeň podle dotazu
      if (query.toLowerCase().includes('plzen') || query.toLowerCase().includes('plzeň')) {
        simulatePlzenRegionInsight();
      } else {
        // Pro jiné dotazy simulujeme obecný přehled
        simulateGenericInsight();
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  const simulatePlzenRegionInsight = () => {
    // Simulované organizace v plzeňském regionu
    const plzenOrgs = [
      {
        id: 'plzen1',
        name: 'ZŠ Plzeň-město',
        description: 'Základní škola v centru Plzně',
        email: 'info@zsplzencentrum.cz',
        phone: '+420377123456',
        website: 'https://www.zsplzencentrum.cz',
        address: 'Školní 123, Plzeň, 301 00',
        tags: organizations[0].tags,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        id: 'plzen2',
        name: 'MŠ Sluníčko Plzeň',
        description: 'Mateřská škola v Plzni-Doubravce',
        email: 'info@msslunickoplzen.cz',
        phone: '+420377654321',
        website: 'https://www.msslunickoplzen.cz',
        address: 'Slunečná 456, Plzeň, 312 00',
        tags: organizations[1].tags,
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-02-15'),
      }
    ];
    
    // Simulované kontakty v plzeňském regionu
    const plzenContacts = [
      {
        id: 'plzen-contact1',
        firstName: 'Karel',
        lastName: 'Novotný',
        email: 'karel.novotny@zsplzencentrum.cz',
        phone: '+420605123456',
        position: 'Ředitel',
        organizations: [plzenOrgs[0]],
        address: 'Školní 123, Plzeň, 301 00',
        tags: contacts[0].tags,
        notes: 'Klíčová kontaktní osoba pro školení pedagogů.',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: 'plzen-contact2',
        firstName: 'Jana',
        lastName: 'Veselá',
        email: 'jana.vesela@msslunickoplzen.cz',
        phone: '+420602987654',
        position: 'Zástupkyně ředitele',
        organizations: [plzenOrgs[1]],
        address: 'Slunečná 456, Plzeň, 312 00',
        tags: contacts[1].tags,
        notes: 'Zaměřuje se na wellbeing a duševní pohodu dětí.',
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      }
    ];

    // Simulované aktivity v plzeňském regionu
    const plzenActivities = [
      {
        id: 'plzen-activity1',
        type: 'meeting',
        title: 'Školení o wellbeingu - ZŠ Plzeň-město',
        description: 'Celodenní školení pro pedagogický sbor ZŠ Plzeň-město zaměřené na duševní pohodu žáků.',
        date: new Date('2024-04-05T09:00:00'),
        duration: 360,
        location: 'ZŠ Plzeň-město',
        participants: [plzenContacts[0]],
        isCompleted: true,
        tags: meetings[0].tags,
        relatedContacts: [plzenContacts[0]],
        relatedOrganizations: [plzenOrgs[0]],
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
      },
      {
        id: 'plzen-activity2',
        type: 'training',
        title: 'Workshop socio-emočního učení - MŠ Sluníčko',
        description: 'Praktický workshop pro učitelky mateřské školy o implementaci socio-emočního učení.',
        date: new Date('2024-04-12T10:00:00'),
        duration: 240,
        location: 'MŠ Sluníčko Plzeň',
        trainer: contacts[0],
        participants: [plzenContacts[1]],
        tags: trainings[0].tags,
        relatedContacts: [contacts[0], plzenContacts[1]],
        relatedOrganizations: [plzenOrgs[1]],
        materials: 'Interaktivní materiály a příručky',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        id: 'plzen-activity3',
        type: 'note',
        title: 'Zájem o PBIS v ZŠ Plzeň-město',
        description: 'Záznam z telefonátu s ředitelem ZŠ Plzeň-město',
        content: 'Pan ředitel Novotný projevil zájem o implementaci PBIS (pozitivní chování ve školách) v jejich instituci. Požaduje detailnější informace a možnost návštěvy školy, kde je již PBIS zaveden.',
        tags: [meetings[1].tags[0]],
        relatedContacts: [plzenContacts[0]],
        relatedOrganizations: [plzenOrgs[0]],
        createdAt: new Date('2024-04-18'),
        updatedAt: new Date('2024-04-18'),
      }
    ];

    setRelevantOrganizations(plzenOrgs);
    setRelevantContacts(plzenContacts);
    setRecentActivities(plzenActivities);
    
    // Simulace AI shrnutí
    setInsightSummary(`
      # Přehled aktivit v plzeňském regionu
      
      ## Klíčové trendy
      
      V plzeňském regionu jsme v posledních 2 měsících zaznamenali zvýšený zájem o témata **wellbeingu** a **pozitivního chování ve školách (PBIS)**. Celkem byly realizovány 2 větší vzdělávací aktivity a několik konzultací.
      
      ## Aktivní instituce
      
      **ZŠ Plzeň-město** se aktivně zapojuje do implementace wellbeingových aktivit a projevila zájem o PBIS. **MŠ Sluníčko** se soustředí na socio-emoční učení u předškolních dětí.
      
      ## Doporučení pro další aktivity
      
      1. Uspořádat návštěvu ZŠ Plzeň-město ve škole s fungujícím PBIS
      2. Nabídnout MŠ Sluníčko navazující workshop k socio-emočnímu učení
      3. Propojit aktivní pedagogy z obou institucí pro sdílení dobré praxe
    `);
  };

  const simulateGenericInsight = () => {
    // Pro obecné dotazy zobrazíme základní data
    setRelevantOrganizations(organizations);
    setRelevantContacts(contacts);
    
    // Spojené aktivity
    const allActivities = [
      ...meetings,
      ...trainings,
      ...notes
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setRecentActivities(allActivities.slice(0, 3));
    
    // Obecné AI shrnutí
    setInsightSummary(`
      # Obecný přehled aktivit
      
      ## Klíčové trendy
      
      Nejčastěji řešená témata za poslední období jsou **wellbeing** a **PBIS**. Většina aktivit se týká vzdělávacích institucí.
      
      ## Aktivní instituce
      
      Mezi nejaktivnější organizace patří **${organizations[0].name}** a **${organizations[1].name}**.
      
      ## Doporučení pro další aktivity
      
      1. Zaměřit se na propojování institucí se stejnými zájmy
      2. Nabídnout navazující aktivity k realizovaným školením
      3. Věnovat pozornost tématům s nejvyšším zájmem
    `);
  };

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link to="/activities">
              <ArrowLeft size={16} className="mr-1" />
              Zpět
            </Link>
          </Button>
          <h2 className="text-2xl font-semibold">AI přehled: {query}</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-t-crm-primary rounded-full animate-spin"></div>
            <p className="text-lg mt-4">Analyzuji data a připravuji přehled...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MessageSquare size={18} className="mr-2" /> 
                    AI shrnutí
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {insightSummary.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return <h2 key={index} className="text-xl font-bold mt-0">{paragraph.replace('# ', '')}</h2>;
                      } else if (paragraph.startsWith('## ')) {
                        return <h3 key={index} className="text-lg font-semibold mt-4">{paragraph.replace('## ', '')}</h3>;
                      } else if (paragraph.startsWith('1. ')) {
                        return (
                          <ol key={index} className="list-decimal pl-5 mt-2">
                            {paragraph.split('\n').map((item, i) => (
                              <li key={i} className="mt-1">{item.replace(/^\d+\. /, '')}</li>
                            ))}
                          </ol>
                        );
                      } else {
                        return <p key={index} className="mt-2" dangerouslySetInnerHTML={{ 
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                        }} />;
                      }
                    })}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Nedávné aktivity v regionu</h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{activity.title}</h4>
                            <Badge variant="outline">
                              {activity.type === 'meeting' && 'Schůzka'}
                              {activity.type === 'training' && 'Školení'}
                              {activity.type === 'note' && 'Poznámka'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          {activity.type !== 'note' && (
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              {new Date(activity.date).toLocaleDateString('cs-CZ')}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {activity.tags.map((tag) => (
                              <Badge 
                                key={tag.id} 
                                style={{ backgroundColor: tag.color }}
                                className="text-xs"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Tabs defaultValue="organizations">
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="organizations" className="flex-1">
                    <Building size={16} className="mr-1" /> Organizace
                  </TabsTrigger>
                  <TabsTrigger value="contacts" className="flex-1">
                    <Users size={16} className="mr-1" /> Kontakty
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="organizations">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-md">
                        Relevantní organizace ({relevantOrganizations.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {relevantOrganizations.map((org) => (
                          <Link key={org.id} to={`/organizations/${org.id}`} className="block">
                            <div className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                              <div className="font-medium">{org.name}</div>
                              <div className="text-sm text-gray-600">{org.description}</div>
                              <div className="mt-1 text-xs text-gray-500">{org.address}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="contacts">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-md">
                        Relevantní kontakty ({relevantContacts.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {relevantContacts.map((contact) => (
                          <Link key={contact.id} to={`/contacts/${contact.id}`} className="block">
                            <div className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="text-xs bg-crm-primary text-white">
                                    {contact.firstName[0]}{contact.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {contact.firstName} {contact.lastName}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {contact.position && `${contact.position}, `}
                                    {contact.organizations && contact.organizations[0]?.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AIInsightPage;
