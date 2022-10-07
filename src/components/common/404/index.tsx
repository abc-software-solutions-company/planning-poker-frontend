import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import * as React from 'react';

// import NotFound from '@/components/icons/page-not-found';
import {ROUTES} from '@/configs/routes.config';

import styles from './404.module.scss';

const ErrorInformation: React.FC = () => {
  const {t} = useTranslation('common');

  return (
    <div className={styles['page-not-found']}>
      <div className="container">
        <p className="heading">{t('404-heading')}</p>
        <h1 className="sub-heading">{t('404-sub-heading')}</h1>
        <div className="image">{/* <NotFound /> */}</div>
        <Link href={ROUTES.LOBBY}>{t('404-back-home')}</Link>
      </div>
    </div>
  );
};

export default ErrorInformation;
