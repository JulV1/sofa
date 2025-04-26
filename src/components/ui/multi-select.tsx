
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  defaultValue?: MultiSelectOption[];
  placeholder?: string;
  onChange: (selectedItems: MultiSelectOption[]) => void;
}

export function MultiSelect({
  options,
  defaultValue = [],
  placeholder = 'Vyberte...',
  onChange,
}: MultiSelectProps) {
  const [selectedItems, setSelectedItems] = useState<MultiSelectOption[]>([]);
  const [open, setOpen] = useState(false);

  // Zajistíme, že defaultValue je vždy pole a inicializujeme vybrané položky
  useEffect(() => {
    const initialItems = Array.isArray(defaultValue) ? defaultValue : [];
    setSelectedItems(initialItems);
  }, [defaultValue]);

  const handleSelect = (item: MultiSelectOption) => {
    const isSelected = selectedItems.findIndex((selectedItem) => selectedItem.value === item.value) !== -1;

    let newSelectedItems: MultiSelectOption[];

    if (isSelected) {
      // Remove item
      newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.value !== item.value
      );
    } else {
      // Add item
      newSelectedItems = [...selectedItems, item];
    }

    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const handleRemove = (item: MultiSelectOption, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.value !== item.value
    );
    
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !selectedItems.length && "text-muted-foreground"
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <Badge
                  key={item.value}
                  variant="secondary"
                  className="mr-1 mb-1 flex items-center gap-1"
                >
                  {item.label}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={(e) => handleRemove(item, e)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {item.label}</span>
                  </button>
                </Badge>
              ))
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Vyhledat ${placeholder.toLowerCase()}`} />
          <CommandEmpty>Žádné položky nenalezeny</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selectedItems.some(
                (item) => item.value === option.value
              );

              return (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option)}
                >
                  <div className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                  )}>
                    {isSelected ? <span className="h-2 w-2 rounded-sm bg-white" /> : null}
                  </div>
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
