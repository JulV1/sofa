
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Opportunity } from '@/types/models';
import { opportunityStageLabels, opportunityStageColors } from '@/data/opportunityData';
import { OpportunityDialog } from './OpportunityDialog';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';

interface OpportunityListProps {
  opportunities: Opportunity[];
}

export const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreate = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log('New opportunity:', data);
    setIsDialogOpen(false);
  };

  const filteredOpportunities = opportunities.filter((opportunity) => 
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.relatedContacts.some(contact => 
      contact && contact.firstName && contact.lastName &&
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    opportunity.relatedOrganizations.some(org => 
      org && org.name && org.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency }).format(value);
  };

  const handleRowClick = (opportunityId: string) => {
    navigate(`/opportunities/${opportunityId}`);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Příležitosti</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Vyhledat příležitost..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button onClick={handleCreate}>
              <Plus size={16} className="mr-1" /> Nová příležitost
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Název</TableHead>
                <TableHead>Stav</TableHead>
                <TableHead>Organizace</TableHead>
                <TableHead>Kontaktní osoba</TableHead>
                <TableHead className="text-right">Hodnota</TableHead>
                <TableHead>Ukončení</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <TableRow 
                    key={opportunity.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleRowClick(opportunity.id)}
                  >
                    <TableCell className="font-medium">{opportunity.name}</TableCell>
                    <TableCell>
                      <Badge className={opportunityStageColors[opportunity.stage]}>
                        {opportunityStageLabels[opportunity.stage]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {opportunity.relatedOrganizations
                        .filter(org => org)
                        .map(org => org.name)
                        .join(', ')}
                    </TableCell>
                    <TableCell>
                      {opportunity.relatedContacts
                        .filter(contact => contact && contact.firstName && contact.lastName)
                        .map(contact => 
                          `${contact.firstName} ${contact.lastName}`
                        ).join(', ')}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(opportunity.value, opportunity.currency)}
                    </TableCell>
                    <TableCell>
                      {opportunity.closeDate 
                        ? new Date(opportunity.closeDate).toLocaleDateString('cs-CZ') 
                        : '–'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenalezeny žádné příležitosti odpovídající hledání.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <OpportunityDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};
