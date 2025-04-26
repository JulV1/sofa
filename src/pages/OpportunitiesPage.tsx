
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OpportunityList } from '@/components/opportunities/OpportunityList';
import { opportunities } from '@/data/opportunityData';

const OpportunitiesPage = () => {
  return (
    <AppLayout>
      <div className="crm-container">
        <OpportunityList opportunities={opportunities} />
      </div>
    </AppLayout>
  );
};

export default OpportunitiesPage;
