
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContactList } from '@/components/contacts/ContactList';
import { contacts, organizations, tags } from '@/data/mockData';

const ContactsPage = () => {
  return (
    <AppLayout>
      <div className="crm-container">
        <ContactList contacts={contacts} organizations={organizations} tags={tags} />
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
