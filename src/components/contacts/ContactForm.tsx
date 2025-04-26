
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Contact, Organization, Tag } from "@/types/models";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon, X } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "Jméno je povinné"),
  lastName: z.string().min(1, "Příjmení je povinné"),
  email: z.string().email("Neplatný email").optional().or(z.literal("")),
  phone: z.string().optional(),
  position: z.string().optional(),
  organizationIds: z.array(z.string()).optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => void;
  initialData?: Partial<Contact>;
  organizations: Organization[];
  tags: Tag[];
  isSubmitting?: boolean;
}

export function ContactForm({ onSubmit, initialData, organizations, tags, isSubmitting }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      position: initialData?.position || "",
      organizationIds: initialData?.organizations?.map(org => org.id) || [],
      address: initialData?.address || "",
      notes: initialData?.notes || "",
      tagIds: initialData?.tags?.map(tag => tag.id) || [],
    },
  });

  const selectedTags = form.watch("tagIds") || [];
  const selectedOrgs = form.watch("organizationIds") || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Příjmení</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pozice</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresa</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ulice, Město, PSČ" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizace</FormLabel>
              <Select
                onValueChange={(value) => {
                  const currentValues = field.value || [];
                  if (!currentValues.includes(value)) {
                    field.onChange([...currentValues, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte organizaci" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedOrgs.map((orgId) => {
                  const org = organizations.find((o) => o.id === orgId);
                  if (!org) return null;
                  return (
                    <Badge
                      key={org.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {org.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          field.onChange(selectedOrgs.filter((id) => id !== org.id));
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagy</FormLabel>
              <Select
                onValueChange={(value) => {
                  const currentValues = field.value || [];
                  if (!currentValues.includes(value)) {
                    field.onChange([...currentValues, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      <div className="flex items-center gap-2">
                        <TagIcon className="h-4 w-4" style={{ color: tag.color }} />
                        {tag.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <Badge
                      key={tag.id}
                      style={{ backgroundColor: tag.color }}
                      className="text-white flex items-center gap-1"
                    >
                      {tag.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          field.onChange(selectedTags.filter((id) => id !== tag.id));
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poznámky</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {initialData ? "Uložit změny" : "Přidat kontakt"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
