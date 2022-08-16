import cn from 'classnames';
import {ReactNode} from 'react';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  children: ReactNode;
}

const TextEffect: React.FC<IProps> = ({className, children}) => {
  return <p className={cn(styles['text-effect'], className)}>{children}</p>;
};

export default TextEffect;
