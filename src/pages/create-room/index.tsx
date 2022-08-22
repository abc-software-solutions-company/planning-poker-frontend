import React from 'react';

import Room from '@/components/room';
import LayoutDefault from '@/layouts/default';

export default function PageAction() {
  return (
    <>
      <Room />
    </>
  );
}

PageAction.Layout = LayoutDefault;
