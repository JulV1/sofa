
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Building, ArrowRight } from 'lucide-react';
import { Contact } from '@/types/models';
import { Link } from 'react-router-dom';

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { firstName, lastName, email, phone, position, organizations, tags } = contact;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const primaryOrganization = organizations && organizations.length > 0 ? organizations[0] : undefined;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-crm-primary text-white">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{firstName} {lastName}</h3>
              {position && primaryOrganization && (
                <p className="text-gray-500 text-sm flex items-center">
                  <span>{position}</span>
                  <span className="mx-1">•</span>
                  <span>{primaryOrganization.name}</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {email && (
              <div className="flex items-center text-sm">
                <Mail size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-600">{email}</span>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center text-sm">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-600">{phone}</span>
              </div>
            )}
            
            {primaryOrganization && (
              <div className="flex items-center text-sm">
                <Building size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-600">{primaryOrganization.name}</span>
              </div>
            )}
          </div>
          
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-3 border-t">
          <Link 
            to={`/contacts/${contact.id}`}
            className="text-sm text-crm-primary font-medium flex items-center hover:underline"
          >
            Zobrazit detail
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
