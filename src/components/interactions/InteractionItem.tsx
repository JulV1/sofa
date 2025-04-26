
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';
import { Interaction, Meeting, Training, Purchase } from '@/types/models';

interface InteractionItemProps {
  interaction: Interaction;
}

export const InteractionItem: React.FC<InteractionItemProps> = ({ interaction }) => {
  const renderTypeSpecificDetails = () => {
    switch (interaction.type) {
      case 'meeting':
        const meeting = interaction as Meeting;
        return (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              {new Date(meeting.date).toLocaleString('cs-CZ')} ({meeting.duration} min)
              {meeting.location && <span>• {meeting.location}</span>}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={14} />
              {meeting.participants.length} účastníků
            </div>
          </>
        );
      case 'training':
        const training = interaction as Training;
        return (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              {new Date(training.date).toLocaleString('cs-CZ')} ({training.duration} min)
              {training.location && <span>• {training.location}</span>}
            </div>
            {training.trainer && (
              <div className="text-sm text-gray-500">
                Školitel: {training.trainer.firstName} {training.trainer.lastName}
              </div>
            )}
          </>
        );
      case 'purchase':
        const purchase = interaction as Purchase;
        return (
          <div className="text-sm text-gray-500">
            Částka: {purchase.amount} {purchase.currency} • 
            {new Date(purchase.date).toLocaleDateString('cs-CZ')}
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      meeting: 'Schůzka',
      training: 'Školení',
      purchase: 'Nákup',
      note: 'Poznámka',
      phone_call: 'Telefonát'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="border-b pb-4 last:border-0">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{interaction.title}</h3>
        <Badge variant="secondary">
          {getTypeLabel(interaction.type)}
        </Badge>
      </div>
      
      {renderTypeSpecificDetails()}
      
      <p className="text-sm text-gray-600 mt-2">{interaction.description}</p>
      
      {interaction.tags && interaction.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {interaction.tags.map((tag) => (
            <Badge 
              key={tag.id} 
              style={{ backgroundColor: tag.color }} 
              className="text-white text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
