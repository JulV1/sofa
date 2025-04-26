
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContactList } from '@/components/contacts/ContactList';
import { contacts, organizations } from '@/data/mockData';

const ContactsPage = () => {
  return (
    <AppLayout>
      <div className="crm-container">
        <ContactList contacts={contacts} organizations={organizations} />
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
