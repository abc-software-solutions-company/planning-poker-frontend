import cls from 'classnames';
import {FC} from 'react';

import {ABCWEBSITE} from '@/utils/constant';

import styles from './style.module.scss';

const Footer: FC = () => {
  return (
    <>
      <div className={cls(styles.footer)}>
        Created by{' '}
        <a className="footer website" href={ABCWEBSITE} target="_blank" rel="noreferrer">
          ABC Software Solutions Company
        </a>
      </div>
    </>
  );
};

export default Footer;
