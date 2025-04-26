
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Organization, Tag } from '@/types/models';
import { OrganizationForm } from './OrganizationForm';

interface OrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization?: Organization;
  tags: Tag[];
  onSubmit: (data: any) => void;
}

export const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  isOpen,
  onClose,
  organization,
  tags,
  onSubmit,
}) => {
  const isEditing = Boolean(organization);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Upravit organizaci' : 'Přidat novou organizaci'}</DialogTitle>
        </DialogHeader>
        <OrganizationForm 
          organization={organization} 
          tags={tags} 
          onSubmit={onSubmit} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};
