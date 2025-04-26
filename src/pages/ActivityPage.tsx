
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { meetings, trainings, purchases, notes } from '@/data/mockData';
import { Interaction } from '@/types/models';
import { InteractionItem } from '@/components/interactions/InteractionItem';
import { ActivityDialog } from '@/components/activities/ActivityDialog';
import { useToast } from "@/hooks/use-toast";

const ActivityPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState<Interaction | undefined>();
  const { toast } = useToast();
  
  const allActivities: Interaction[] = [
    ...meetings,
    ...trainings,
    ...purchases,
    ...notes
  ].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [filteredActivities, setFilteredActivities] = React.useState(allActivities);

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredActivities(allActivities);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = allActivities.filter(activity => {
      return activity.title.toLowerCase().includes(lowerCaseSearch) || 
             activity.description.toLowerCase().includes(lowerCaseSearch);
    });
    
    setFilteredActivities(filtered);
  }, [searchTerm, allActivities]);

  const handleCreateActivity = () => {
    setSelectedActivity(undefined);
    setIsDialogOpen(true);
  };

  const handleEditActivity = (activity: Interaction) => {
    setSelectedActivity(activity);
    setIsDialogOpen(true);
  };

  const handleDeleteActivity = (activity: Interaction) => {
    // In the future, this would make an API call
    console.log('Deleting activity:', activity);
    toast({
      title: "Aktivita smazána",
      description: "Aktivita byla úspěšně smazána",
    });
  };

  const handleSubmitActivity = (data: any) => {
    if (selectedActivity) {
      // Update existing activity
      console.log('Updating activity:', data);
      toast({
        title: "Aktivita upravena",
        description: "Aktivita byla úspěšně upravena",
      });
    } else {
      // Create new activity
      console.log('Creating activity:', data);
      toast({
        title: "Aktivita vytvořena",
        description: "Aktivita byla úspěšně vytvořena",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="crm-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Aktivity</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Hledat aktivity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
              <Button onClick={handleCreateActivity}>
                <Plus size={18} className="mr-1" />
                <span>Nová aktivita</span>
              </Button>
            </div>
          </div>
        </div>
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Žádné aktivity nebyly nalezeny.</p>
            <Button className="mt-4" variant="outline" onClick={() => setSearchTerm('')}>
              Vyčistit filtr
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActivities.map(activity => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <InteractionItem 
                    interaction={activity}
                    onEdit={() => handleEditActivity(activity)}
                    onDelete={() => handleDeleteActivity(activity)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ActivityDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          activity={selectedActivity}
          onSubmit={handleSubmitActivity}
        />
      </div>
    </AppLayout>
  );
};

export default ActivityPage;
