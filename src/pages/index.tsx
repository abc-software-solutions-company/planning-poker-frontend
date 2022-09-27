import React from 'react';

import Seo from '@/components/common/seo/seo';
import Lobby from '@/components/lobby';
import {ROUTES} from '@/configs/routes.config';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return (
    <>
      <Seo title={`Lobby`} url={ROUTES.HOME} />
      <Lobby />
    </>
  );
}

PageHome.Layout = LayoutDefault;
