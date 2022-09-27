import React from 'react';

import Seo from '@/components/common/seo/seo';
import LetsStart from '@/components/lets-start';
import {ROUTES} from '@/configs/routes.config';
import LayoutDefault from '@/layouts/default';

export default function PageLogin() {
  return (
    <>
      <Seo title={`Login`} url={ROUTES.LOGIN} />
      <LetsStart />
    </>
  );
}

PageLogin.Layout = LayoutDefault;
