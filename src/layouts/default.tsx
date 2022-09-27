import cls from 'classnames';
import React from 'react';

import Footer from '@/components/footer';

import styles from './style.module.scss';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={cls(styles['layout-default'])}>
      <main className="flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
