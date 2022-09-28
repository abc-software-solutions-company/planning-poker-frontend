import React from 'react';

import Seo from '@/components/common/seo/seo';
import LetsStart from '@/components/lets-start';
import LayoutDefault from '@/layouts/default';

export default function PageLogin() {
  return (
    <>
      <Seo title="Login" />
      <LetsStart />
    </>
  );
}

PageLogin.Layout = LayoutDefault;
