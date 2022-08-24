import React from 'react';

import Lobby from '@/components/lobby';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return <Lobby />;
}

PageHome.Layout = LayoutDefault;
