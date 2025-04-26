import { Contact, Organization, Meeting, Note, Tag, Training, Purchase } from '../types/models';

export const tags: Tag[] = [
  {
    id: '1',
    name: 'Klient',
    color: '#6E59A5',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Partner',
    color: '#9b87f5',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Dodavatel',
    color: '#D6BCFA',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'VIP',
    color: '#F97316',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Důležité',
    color: '#EF4444',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const organizations: Organization[] = [
  {
    id: '1',
    name: 'Technosoft s.r.o.',
    description: 'Softwarová společnost zaměřená na vývoj podnikových aplikací',
    email: 'info@technosoft.cz',
    phone: '+420123456789',
    website: 'https://www.technosoft.cz',
    address: 'Technická 1, Praha 6, 160 00',
    tags: [tags[0], tags[4]],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Marketing Pro s.r.o.',
    description: 'Marketingová agentura specializovaná na digitální marketing',
    email: 'info@marketingpro.cz',
    phone: '+420987654321',
    website: 'https://www.marketingpro.cz',
    address: 'Marketingová 2, Praha 5, 150 00',
    tags: [tags[1]],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Logistika Plus a.s.',
    description: 'Společnost zabývající se logistickými službami',
    email: 'info@logistikaplus.cz',
    phone: '+420456789123',
    website: 'https://www.logistikaplus.cz',
    address: 'Logistická 3, Brno, 602 00',
    tags: [tags[2]],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const contacts: Contact[] = [
  {
    id: '1',
    firstName: 'Jan',
    lastName: 'Novák',
    email: 'jan.novak@technosoft.cz',
    phone: '+420111222333',
    position: 'CEO',
    organizations: [organizations[0]],
    address: 'Technická 1, Praha 6, 160 00',
    tags: [tags[0], tags[3]],
    notes: 'Klíčový rozhodovatel, preferuje komunikaci po telefonu.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Svobodová',
    email: 'marie.svobodova@marketingpro.cz',
    phone: '+420444555666',
    position: 'Marketing Director',
    organizations: [organizations[1]],
    address: 'Marketingová 2, Praha 5, 150 00',
    tags: [tags[1]],
    notes: 'Komunikuje primárně přes email, rychle reaguje.',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '3',
    firstName: 'Petr',
    lastName: 'Černý',
    email: 'petr.cerny@logistikaplus.cz',
    phone: '+420777888999',
    position: 'Logistics Manager',
    organizations: [organizations[2]],
    address: 'Logistická 3, Brno, 602 00',
    tags: [tags[2]],
    notes: 'Nejlépe dosažitelný v dopoledních hodinách.',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    firstName: 'Alena',
    lastName: 'Dvořáková',
    email: 'alena.dvorakova@technosoft.cz',
    phone: '+420333222111',
    position: 'CFO',
    organizations: [organizations[0]],
    address: 'Technická 1, Praha 6, 160 00',
    tags: [tags[0]],
    notes: 'Zodpovědná za finanční rozhodnutí.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const meetings: Meeting[] = [
  {
    id: '1',
    type: 'meeting',
    title: 'Úvodní schůzka k projektu CRM',
    description: 'Diskuze o požadavcích na nový CRM systém',
    date: new Date('2024-04-20T10:00:00'),
    duration: 60,
    location: 'Kancelář Technosoft',
    tags: [
      {
        id: 'wellbeing',
        name: '🟩 Wellbeing (duševní pohoda)',
        color: '#F2FCE2',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'rozvoj-pedagoga',
        name: '🩷 Rozvoj dovedností pedagoga',
        color: '#D946EF',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    participants: [contacts[0], contacts[3]],
    isCompleted: true,
    relatedContacts: [contacts[0], contacts[3]],
    relatedOrganizations: [organizations[0]],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Prezentace marketingové strategie',
    description: 'Představení nové marketingové strategie pro Q2 2024',
    date: new Date('2024-04-25T14:00:00'),
    duration: 90,
    location: 'Online - Microsoft Teams',
    tags: [
      {
        id: 'pbis',
        name: '🟨 PBIS (pozitivní chování ve školách)',
        color: '#FEF7CD',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    participants: [contacts[1]],
    isCompleted: false,
    relatedContacts: [contacts[1]],
    relatedOrganizations: [organizations[1]],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const trainings: Training[] = [
  {
    id: '1',
    type: 'training',
    title: 'Školení nového CRM systému',
    description: 'Úvodní školení pro používání nového CRM systému.',
    date: new Date('2024-04-15T09:00:00'),
    duration: 180,
    location: 'Školící místnost',
    trainer: contacts[0],
    participants: [contacts[1], contacts[2]],
    tags: [
      {
        id: 'socio-emocni-uceni',
        name: '🟪 Socio-emoční učení',
        color: '#9b87f5',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'rodicovske-kompetence',
        name: '🟧 Rodičovské kompetence',
        color: '#F97316',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    relatedContacts: [contacts[0], contacts[1], contacts[2]],
    relatedOrganizations: [organizations[0]],
    materials: 'Prezentace a manuál',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const purchases: Purchase[] = [
  {
    id: '1',
    type: 'purchase',
    title: 'Nákup licencí software',
    description: 'Zakoupení ročních licencí pro tým',
    date: new Date('2024-04-01'),
    amount: 25000,
    currency: 'CZK',
    items: [
      { name: 'Software licence - standard', quantity: 5, price: 5000 }
    ],
    purchasedBy: contacts[1],
    tags: [
      {
        id: 'trauma-pristup',
        name: '⬜ Trauma respektující přístup',
        color: '#ffffff',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    relatedContacts: [contacts[1]],
    relatedOrganizations: [organizations[0]],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export const notes: Note[] = [
  {
    id: '1',
    type: 'note',
    title: 'Poznámka z telefonátu s Janem Novákem',
    description: 'Shrnutí telefonického rozhovoru',
    content: 'Jan projevil zájem o rozšíření stávajícího softwarového řešení. Požaduje cenovou nabídku do konce týdne. Zmínil také potřebu integrace s jejich současným účetním systémem.',
    tags: [
      {
        id: 'ohrozene-deti',
        name: '🟦 Ohrožené děti',
        color: '#1EAEDB',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'prevence-nasili',
        name: '🟥 Prevence násilí v blízkých vztazích',
        color: '#ea384c',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    relatedContacts: [contacts[0]],
    relatedOrganizations: [organizations[0]],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '2',
    type: 'note',
    title: 'Příprava smlouvy pro Logistika Plus',
    description: 'Podklady pro vytvoření smlouvy',
    content: 'Připravit návrh smlouvy pro Logistika Plus a.s. zahrnující následující služby: 1) Implementace sledovacího systému, 2) Pravidelná údržba, 3) Školení zaměstnanců. Kontaktní osoba: Petr Černý.',
    tags: [
      {
        id: 'psychicka-odolnost',
        name: '🟩‍⬛ Posilování psychické odolnosti dětí',
        color: '#166534',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ],
    relatedContacts: [contacts[2]],
    relatedOrganizations: [organizations[2]],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
];
