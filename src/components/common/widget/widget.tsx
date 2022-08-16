import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';

import styles from './styles.module.scss';

export interface IDataWidget {
  name: string;
  slug: string;
}

interface IProps {
  name: string;
  variants?: 'category' | 'recent' | 'trending' | 'tags';
  data?: IDataWidget[];
  loading: boolean;
}

const Widget: React.FC<IProps> = ({name, variants = 'category', data = [], loading = false}) => {
  const router = useRouter();
  return (
    <div className={styles.widget}>
      <h3 className="name">{name}</h3>
      <div className="line"></div>
      {!!data.length && !loading && (
        <ul className="w-list">
          {variants === 'category' &&
            data.map(({name: itemName, slug}, index) => {
              const active = router.asPath.indexOf(slug.toLowerCase()) > -1;
              return (
                <li key={index} className="w-item">
                  <Link href={slug}>
                    <a className={` ${active ? 'active' : ''}`}>{itemName}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Widget;
