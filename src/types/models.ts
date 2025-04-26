
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
  organizations?: Organization[];
  address?: string;
  tags: Tag[];
  notes?: string;
}

// InteractionType enum for different kinds of interactions
export type InteractionType = 'meeting' | 'training' | 'purchase' | 'note' | 'phone_call';

// Base interaction model (abstract)
export interface Interaction extends BaseEntity {
  type: InteractionType;
  title: string;
  description: string;
  tags: Tag[];
  relatedContacts: Contact[];
  relatedOrganizations?: Organization[];
}

// Meeting interaction
export interface Meeting extends Interaction {
  date: Date;
  duration: number;
  location?: string;
  participants: Contact[];
  isCompleted: boolean;
}

// Training interaction
export interface Training extends Interaction {
  date: Date;
  duration: number;
  location?: string;
  trainer?: Contact;
  participants: Contact[];
  materials?: string;
}

// Purchase interaction
export interface Purchase extends Interaction {
  date: Date;
  amount: number;
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  purchasedBy: Contact;
}

// Note interaction
export interface Note extends Interaction {
  content: string;
}

// Phone call interaction
export interface PhoneCall extends Interaction {
  date: Date;
  duration: number;
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

// Opportunity stage enum
export type OpportunityStage = 
  'lead' | 
  'qualified_lead' | 
  'needs_analysis' | 
  'offer_sent' | 
  'negotiations' | 
  'closed_won' | 
  'closed_lost';

// Opportunity model
export interface Opportunity extends BaseEntity {
  name: string;
  description?: string;
  stage: OpportunityStage;
  stageProgress: number; // 0-100%
  value: number;
  currency: string;
  closeDate?: Date;
  probability: number; // 0-100%
  relatedContacts: Contact[];
  relatedOrganizations: Organization[];
  relatedActivities: Interaction[];
  owner?: Contact;
  tags: Tag[];
  source?: string;
  notes?: string;
}
