import cls from 'classnames';
import {FC} from 'react';

import {ABCWEBSITE} from '@/utils/constant';

import styles from './style.module.scss';

const Footer: FC = () => {
  return (
    <>
      <div className={cls(styles.footer)}>
        Copyright © 2022 By{' '}
        <a className="footer website" href={ABCWEBSITE}>
          ABC Software Solutions Company
        </a>
      </div>
    </>
  );
};

export default Footer;