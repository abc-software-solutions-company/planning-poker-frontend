import React from 'react';

import LetsStart from '@/components/lets-start';
import LayoutDefault from '@/layouts/default';

export default function PageLogin() {
  return (
    <>
      <i className="abc-avatar"></i>
      <i className="abc-checkmark"></i>
      <i className="abc-copy"></i>
      <LetsStart />
    </>
  );
}

PageLogin.Layout = LayoutDefault;
