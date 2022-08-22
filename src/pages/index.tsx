import React from 'react';

import Login from '@/components/login';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return (
    <>
      <Login />
    </>
  );
}

PageHome.Layout = LayoutDefault;
