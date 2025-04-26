
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { OpportunityForm } from './OpportunityForm';
import { Button } from '@/components/ui/button';

interface OpportunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  opportunity?: any;
}

export const OpportunityDialog: React.FC<OpportunityDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  opportunity
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {opportunity ? 'Upravit příležitost' : 'Nová příležitost'}
          </DialogTitle>
        </DialogHeader>
        <OpportunityForm 
          opportunity={opportunity}
          onCancel={onClose}
          onSubmit={onSubmit}
          submitButtonText={opportunity ? 'Uložit změny' : 'Vytvořit příležitost'}
        />
      </DialogContent>
    </Dialog>
  );
};
