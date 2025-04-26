
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Interaction } from '@/types/models';
import { contacts } from '@/data/mockData';
import { ACTIVITY_TAGS } from '@/constants/activityTags';

const formSchema = z.object({
  type: z.string(),
  title: z.string().min(1, "Název je povinný"),
  description: z.string(),
  tags: z.array(z.object({
    value: z.string(),
    label: z.string()
  })),
  relatedContacts: z.array(z.object({
    value: z.string(),
    label: z.string()
  }))
});

interface ActivityFormProps {
  defaultValues?: Interaction;
  onSubmit: (data: any) => void;
}

export function ActivityForm({ defaultValues, onSubmit }: ActivityFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultValues?.type || "note",
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      tags: defaultValues?.tags?.map(tag => ({
        value: tag.id,
        label: tag.name
      })) || [],
      relatedContacts: defaultValues?.relatedContacts?.map(contact => ({
        value: contact.id,
        label: `${contact.firstName} ${contact.lastName}`
      })) || []
    }
  });

  const contactOptions = React.useMemo(() => {
    return contacts.map(contact => ({
      value: contact.id,
      label: `${contact.firstName} ${contact.lastName}`
    }));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ aktivity</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte typ aktivity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="note">Poznámka</SelectItem>
                  <SelectItem value="meeting">Schůzka</SelectItem>
                  <SelectItem value="training">Školení</SelectItem>
                  <SelectItem value="purchase">Nákup</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Název</FormLabel>
              <FormControl>
                <Input placeholder="Zadejte název aktivity" {...field} />
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
                <Textarea
                  placeholder="Zadejte popis aktivity"
                  {...field}
                />
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
              <FormLabel>Témata</FormLabel>
              <FormControl>
                <MultiSelect
                  options={ACTIVITY_TAGS}
                  placeholder="Vyberte témata"
                  defaultValue={field.value as MultiSelectOption[]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relatedContacts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Související kontakty</FormLabel>
              <FormControl>
                <MultiSelect
                  options={contactOptions}
                  placeholder="Vyberte kontakty"
                  defaultValue={field.value as MultiSelectOption[]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {defaultValues ? "Upravit aktivitu" : "Vytvořit aktivitu"}
        </Button>
      </form>
    </Form>
  );
}
