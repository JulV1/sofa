
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ActivityForm } from './ActivityForm';
import { Interaction } from '@/types/models';

interface ActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: Interaction;
  onSubmit: (data: any) => void;
}

export function ActivityDialog({ 
  isOpen, 
  onClose, 
  activity, 
  onSubmit 
}: ActivityDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {activity ? "Upravit aktivitu" : "Nová aktivita"}
          </DialogTitle>
        </DialogHeader>
        <ActivityForm 
          defaultValues={activity}
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Zrušit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
