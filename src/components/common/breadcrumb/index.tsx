import Link from 'next/link';
import React from 'react';

import {ICategory} from '@/types';

import styles from './styles.module.scss';

interface IProps {
  separator: string | React.ReactNode;
  data: ICategory[];
}

const Breadcrumb: React.FC<IProps> = ({data, separator}) => {
  const renderPath = () => {
    if (!data) return null;

    return data.map((x: ICategory, idx) => {
      return (
        <div key={idx}>
          <span className="sep">{separator}</span>
          {x.slug ? (
            <Link href={x.slug}>
              <a>{x.name}</a>
            </Link>
          ) : (
            <span>{x.name}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`breadcrumb ${styles.breadcrumb}`}>
      <>
        <Link href="/">
          <a>Home</a>
        </Link>
        {renderPath()}
      </>
    </div>
  );
};

export default Breadcrumb;
