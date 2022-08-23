import React from 'react';

import PlanningPocker from '@/components/planning-pocker';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return (
    <>
      <PlanningPocker />
    </>
  );
}

PageHome.Layout = LayoutDefault;
