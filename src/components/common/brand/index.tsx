import {FC} from 'react';

import styles from './style.module.scss';

const Brand: FC = () => {
  return (
    <div className={styles['float-brand']}>
      <h2 className="name">ABC Software</h2>
    </div>
  );
};

export default Brand;
