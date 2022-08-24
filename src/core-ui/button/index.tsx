import cn from 'classnames';
import {ButtonHTMLAttributes} from 'react';

import styles from './style.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'white';
}

const Button: React.FC<IProps> = ({className, type = 'button', variant, ...rest}) => {
  const arrayClass = ['btn', className];

  if (variant === 'white') arrayClass.push(styles['variant-white']);
  return <button className={cn(arrayClass)} type={type} {...rest}></button>;
};

export default Button;
