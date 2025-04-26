
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact, Organization } from "@/types/models";
import { ContactForm } from "./ContactForm";
import { useToast } from "@/hooks/use-toast";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: Contact;
  organizations: Organization[];
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export function ContactDialog({
  isOpen,
  onClose,
  contact,
  organizations,
  onSubmit,
  isSubmitting
}: ContactDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      toast({
        title: contact ? "Kontakt byl upraven" : "Kontakt byl vytvořen",
        description: `${data.firstName} ${data.lastName}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Něco se pokazilo",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {contact ? "Upravit kontakt" : "Přidat nový kontakt"}
          </DialogTitle>
        </DialogHeader>
        <ContactForm
          onSubmit={handleSubmit}
          initialData={contact}
          organizations={organizations}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
