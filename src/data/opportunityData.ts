
import { Opportunity, OpportunityStage } from '@/types/models';
import { contacts, organizations } from './mockData';

// Helper function to generate a random date within next 90 days
const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 90) + 30);
  return futureDate;
};

export const opportunityStageLabels: Record<OpportunityStage, string> = {
  'lead': 'Lead (10%)',
  'qualified_lead': 'Kvalifikovaný lead (20%)',
  'needs_analysis': 'Analýza potřeb (30%)',
  'offer_sent': 'Nabídka odeslána (40%)',
  'negotiations': 'Vyjednávání (60%)',
  'closed_won': 'Uzavřeno - úspěch (100%)',
  'closed_lost': 'Uzavřeno - neúspěch (0%)'
};

export const opportunityStageColors: Record<OpportunityStage, string> = {
  'lead': 'bg-gray-100 text-gray-800',
  'qualified_lead': 'bg-blue-100 text-blue-800',
  'needs_analysis': 'bg-cyan-100 text-cyan-800',
  'offer_sent': 'bg-indigo-100 text-indigo-800',
  'negotiations': 'bg-purple-100 text-purple-800',
  'closed_won': 'bg-green-100 text-green-800',
  'closed_lost': 'bg-red-100 text-red-800'
};

export const opportunityStagePercentage: Record<OpportunityStage, number> = {
  'lead': 10,
  'qualified_lead': 20,
  'needs_analysis': 30,
  'offer_sent': 40,
  'negotiations': 60,
  'closed_won': 100,
  'closed_lost': 0
};

export const opportunities: Opportunity[] = [
  {
    id: '1',
    name: 'IT infrastruktura pro ZŠ Komenského',
    description: 'Modernizace IT infrastruktury včetně nových počítačů, sítě a serveru',
    stage: 'negotiations',
    stageProgress: 60,
    value: 450000,
    currency: 'CZK',
    closeDate: getRandomFutureDate(),
    probability: 60,
    relatedContacts: [contacts[0], contacts[1]],
    relatedOrganizations: [organizations[0]],
    relatedActivities: [],
    owner: contacts[2],
    tags: [],
    source: 'Veřejný výběr',
    notes: 'Finalizujeme poslední detaily nabídky, zaměřit se na dodací lhůty.',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Dodávka softwaru pro účetnictví',
    description: 'Implementace účetního softwaru včetně školení zaměstnanců',
    stage: 'offer_sent',
    stageProgress: 40,
    value: 120000,
    currency: 'CZK',
    closeDate: getRandomFutureDate(),
    probability: 40,
    relatedContacts: [contacts[3]],
    relatedOrganizations: [organizations[1]],
    relatedActivities: [],
    owner: contacts[4],
    tags: [],
    source: 'Webový formulář',
    notes: 'Čekáme na zpětnou vazbu k zaslaným referencím.',
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Školení GDPR pro management',
    description: 'Série školení pro vedoucí pracovníky o ochraně osobních údajů',
    stage: 'closed_won',
    stageProgress: 100,
    value: 35000,
    currency: 'CZK',
    closeDate: new Date('2024-04-15'),
    probability: 100,
    relatedContacts: [contacts[2], contacts[5]],
    relatedOrganizations: [organizations[2]],
    relatedActivities: [],
    owner: contacts[0],
    tags: [],
    source: 'Doporučení',
    notes: 'Zakázka podepsána, školení proběhne 15.5.2024.',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Marketingová kampaň pro nový produkt',
    description: 'Kompletní digitální kampaň pro uvedení produktu na trh',
    stage: 'needs_analysis',
    stageProgress: 30,
    value: 280000,
    currency: 'CZK',
    closeDate: getRandomFutureDate(),
    probability: 30,
    relatedContacts: [contacts[4]],
    relatedOrganizations: [organizations[1]],
    relatedActivities: [],
    owner: contacts[3],
    tags: [],
    source: 'LinkedIn',
    notes: 'Proběhla úvodní schůzka, připravujeme analýzu požadavků.',
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Konzultace IT bezpečnosti',
    description: 'Audit IT bezpečnosti a implementace doporučení',
    stage: 'lead',
    stageProgress: 10,
    value: 85000,
    currency: 'CZK',
    closeDate: getRandomFutureDate(),
    probability: 10,
    relatedContacts: [contacts[1]],
    relatedOrganizations: [organizations[3]],
    relatedActivities: [],
    owner: contacts[2],
    tags: [],
    source: 'Konference',
    notes: 'První kontakt z IT konference, zájem o bezpečnostní audit.',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date()
  }
];
