
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Organization, Tag } from '@/types/models';
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select';

interface OrganizationFormProps {
  organization?: Organization;
  tags: Tag[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organization,
  tags,
  onSubmit,
  onCancel,
}) => {
  // Format tags for multi-select component
  const tagOptions = useMemo(() => {
    return tags.map(tag => ({
      value: tag.id,
      label: tag.name,
    }));
  }, [tags]);

  const selectedTagOptions = useMemo(() => {
    return organization?.tags?.map(tag => ({
      value: tag.id,
      label: tag.name,
    })) || [];
  }, [organization?.tags]);

  const form = useForm({
    defaultValues: {
      name: organization?.name || '',
      description: organization?.description || '',
      email: organization?.email || '',
      phone: organization?.phone || '',
      website: organization?.website || '',
      address: organization?.address || '',
      tags: organization?.tags || [],
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Název organizace</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Název organizace" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popis</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Popis organizace" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email" />
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
                  <Input {...field} placeholder="Telefon" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webová stránka</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://" />
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
                <Input {...field} placeholder="Adresa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Štítky</FormLabel>
              <FormControl>
                <MultiSelect
                  options={tagOptions}
                  defaultValue={selectedTagOptions}
                  onChange={(selected) => {
                    // Transformace vybraných možností zpět na tagy
                    const selectedTags = selected.map(item => 
                      tags.find(tag => tag.id === item.value)
                    ).filter(Boolean) as Tag[];
                    
                    field.onChange(selectedTags);
                  }}
                  placeholder="Vyberte štítky..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Zrušit
          </Button>
          <Button type="submit">
            {organization ? 'Uložit změny' : 'Vytvořit organizaci'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
