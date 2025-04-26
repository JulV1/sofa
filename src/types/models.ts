
// Base entity interface with common properties
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tag model for categorization
export interface Tag extends BaseEntity {
  name: string;
  color: string;
}

// Organization model
export interface Organization extends BaseEntity {
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  tags: Tag[];
}

// Contact model (a person)
export interface Contact extends BaseEntity {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  position?: string;
  organization?: Organization;
  organizationId?: string;
  tags: Tag[];
  notes?: string;
}

// Base interaction model (abstract)
export interface Interaction extends BaseEntity {
  title: string;
  description: string;
  tags: Tag[];
  relatedContacts: Contact[];
  relatedOrganizations: Organization[];
}

// Meeting interaction
export interface Meeting extends Interaction {
  date: Date;
  duration: number; // in minutes
  location?: string;
  participants: Contact[];
  isCompleted: boolean;
}

// Note interaction
export interface Note extends Interaction {
  content: string;
}

// Phone call interaction
export interface PhoneCall extends Interaction {
  date: Date;
  duration: number; // in minutes
  callType: 'incoming' | 'outgoing';
  contactPerson: Contact;
}

// Mention reference in text content
export interface Mention {
  id: string;
  type: 'contact' | 'organization';
  entityId: string;
  displayText: string;
}
