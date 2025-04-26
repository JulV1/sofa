
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { OpportunityDetail } from '@/components/opportunities/OpportunityDetail';
import { opportunities } from '@/data/opportunityData';

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const opportunity = opportunities.find(opp => opp.id === id);

  if (!opportunity) {
    return <Navigate to="/opportunities" replace />;
  }

  return (
    <AppLayout>
      <div className="crm-container">
        <OpportunityDetail opportunity={opportunity} />
      </div>
    </AppLayout>
  );
};

export default OpportunityDetailPage;
