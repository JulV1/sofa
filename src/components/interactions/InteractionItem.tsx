import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, BookOpen, ShoppingBag, Edit, Trash2 } from 'lucide-react';
import { Interaction, Meeting, Training, Purchase, Note } from '@/types/models';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { getTagColor } from '@/constants/activityTags';

interface InteractionItemProps {
  interaction: Interaction;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const InteractionItem: React.FC<InteractionItemProps> = ({ 
  interaction,
  onEdit,
  onDelete
}) => {
  const renderTypeSpecificDetails = () => {
    switch (interaction.type) {
      case 'meeting':
        const meeting = interaction as Meeting;
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              {format(new Date(meeting.date), 'dd.MM.yyyy HH:mm')}
              <span>•</span>
              {meeting.duration} min
              {meeting.location && (
                <>
                  <span>•</span>
                  {meeting.location}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={14} />
              {meeting.participants.map(p => `${p.firstName} ${p.lastName}`).join(', ')}
            </div>
          </div>
        );
        
      case 'training':
        const training = interaction as Training;
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookOpen size={14} />
              {format(new Date(training.date), 'dd.MM.yyyy HH:mm')}
              <span>•</span>
              {training.duration} min
              {training.location && (
                <>
                  <span>•</span>
                  {training.location}
                </>
              )}
            </div>
            {training.trainer && (
              <div className="text-sm text-gray-500">
                Školitel: {training.trainer.firstName} {training.trainer.lastName}
              </div>
            )}
          </div>
        );
        
      case 'purchase':
        const purchase = interaction as Purchase;
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBag size={14} />
              {format(new Date(purchase.date), 'dd.MM.yyyy')}
              <span>•</span>
              {purchase.amount} {purchase.currency}
            </div>
            {purchase.items && (
              <div className="text-sm text-gray-500">
                {purchase.items.map(item => (
                  `${item.quantity}x ${item.name}`
                )).join(', ')}
              </div>
            )}
          </div>
        );
        
      case 'note':
        const note = interaction as Note;
        return (
          <div className="text-sm text-gray-600 mt-2">
            {note.content}
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
    };
    return types[type as keyof typeof types] || type;
  };

  const getTypeColor = (type: string): string => {
    const colors = {
      meeting: '#6E59A5',
      training: '#9b87f5',
      purchase: '#F97316',
      note: '#D6BCFA',
    };
    return colors[type as keyof typeof colors] || '#6E59A5';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-lg">{interaction.title}</h3>
        <div className="flex items-center gap-2">
          {(onEdit || onDelete) && (
            <div className="flex gap-1">
              {onEdit && (
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <Edit size={16} />
                </Button>
              )}
              {onDelete && (
                <Button variant="ghost" size="icon" onClick={onDelete}>
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          )}
          <Badge 
            variant="secondary"
            style={{ backgroundColor: getTypeColor(interaction.type) }}
            className="text-white"
          >
            {getTypeLabel(interaction.type)}
          </Badge>
        </div>
      </div>
      
      {renderTypeSpecificDetails()}
      
      {interaction.description && (
        <p className="text-sm text-gray-600">{interaction.description}</p>
      )}
      
      {interaction.tags && interaction.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {interaction.tags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant="outline"
              style={{ 
                borderColor: getTagColor(tag.id),
                color: getTagColor(tag.id),
                backgroundColor: `${getTagColor(tag.id)}10`
              }} 
              className="text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
      
      {interaction.relatedContacts && interaction.relatedContacts.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {interaction.relatedContacts.map(contact => (
              <Badge 
                key={contact.id} 
                variant="secondary"
                className="text-xs"
              >
                {contact.firstName} {contact.lastName}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
