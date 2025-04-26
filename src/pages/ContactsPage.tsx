
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContactList } from '@/components/contacts/ContactList';
import { contacts } from '@/data/mockData';

const ContactsPage = () => {
  return (
    <AppLayout>
      <div className="crm-container">
        <ContactList contacts={contacts} />
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
