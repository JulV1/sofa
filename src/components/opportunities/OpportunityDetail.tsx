
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Opportunity } from '@/types/models';
import { opportunityStageColors, opportunityStageLabels } from '@/data/opportunityData';
import { Edit, ArrowLeft } from 'lucide-react';
import { OpportunityDialog } from './OpportunityDialog';

interface OpportunityDetailProps {
  opportunity: Opportunity;
}

export const OpportunityDetail: React.FC<OpportunityDetailProps> = ({ opportunity }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/opportunities');
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log('Updated opportunity:', data);
    setIsEditDialogOpen(false);
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency }).format(value);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBackClick}
              className="h-8 w-8"
            >
              <ArrowLeft size={16} />
            </Button>
            <h2 className="text-2xl font-bold">{opportunity.name}</h2>
            <Badge className={opportunityStageColors[opportunity.stage]}>
              {opportunityStageLabels[opportunity.stage]}
            </Badge>
          </div>
          <Button onClick={handleEditClick}>
            <Edit size={16} className="mr-2" /> Upravit příležitost
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Detaily příležitosti</CardTitle>
            <CardDescription>Základní informace o příležitosti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Hodnota</h4>
                <p className="mt-1 font-semibold text-lg">
                  {formatCurrency(opportunity.value, opportunity.currency)}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Pravděpodobnost</h4>
                <p className="mt-1">{opportunity.probability}%</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Očekávané uzavření</h4>
                <p className="mt-1">
                  {opportunity.closeDate 
                    ? new Date(opportunity.closeDate).toLocaleDateString('cs-CZ')
                    : '–'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Zdroj</h4>
                <p className="mt-1">{opportunity.source || '–'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Vlastník</h4>
                <p className="mt-1">
                  {opportunity.owner 
                    ? `${opportunity.owner.firstName} ${opportunity.owner.lastName}`
                    : '–'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Vytvořeno</h4>
                <p className="mt-1">{new Date(opportunity.createdAt).toLocaleDateString('cs-CZ')}</p>
              </div>
            </div>
            
            {opportunity.description && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500">Popis</h4>
                <p className="mt-1 whitespace-pre-line">{opportunity.description}</p>
              </div>
            )}
            
            {opportunity.notes && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500">Poznámky</h4>
                <p className="mt-1 whitespace-pre-line">{opportunity.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList>
            <TabsTrigger value="contacts">Související kontakty</TabsTrigger>
            <TabsTrigger value="organizations">Související organizace</TabsTrigger>
            <TabsTrigger value="activities">Související aktivity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="border rounded-md p-4 mt-2">
            {opportunity.relatedContacts.length > 0 ? (
              <ul className="divide-y">
                {opportunity.relatedContacts.map(contact => (
                  <li key={contact.id} className="py-3 flex flex-col">
                    <span className="font-medium">{contact.firstName} {contact.lastName}</span>
                    <span className="text-sm text-gray-500">{contact.position || ''}</span>
                    <span className="text-sm">{contact.email || ''}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-4 text-gray-500">Žádné související kontakty</p>
            )}
          </TabsContent>
          
          <TabsContent value="organizations" className="border rounded-md p-4 mt-2">
            {opportunity.relatedOrganizations.length > 0 ? (
              <ul className="divide-y">
                {opportunity.relatedOrganizations.map(org => (
                  <li key={org.id} className="py-3">
                    <span className="font-medium">{org.name}</span>
                    {org.description && (
                      <p className="text-sm text-gray-500">{org.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-4 text-gray-500">Žádné související organizace</p>
            )}
          </TabsContent>
          
          <TabsContent value="activities" className="border rounded-md p-4 mt-2">
            {opportunity.relatedActivities.length > 0 ? (
              <ul className="divide-y">
                {opportunity.relatedActivities.map(activity => (
                  <li key={activity.id} className="py-3">
                    <span className="font-medium">{activity.title}</span>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-4 text-gray-500">Žádné související aktivity</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <OpportunityDialog
        isOpen={isEditDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        opportunity={opportunity}
      />
    </>
  );
};
