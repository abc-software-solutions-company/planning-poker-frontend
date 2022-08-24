import cn from 'classnames';
import {ButtonHTMLAttributes} from 'react';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({className, type = 'button', ...rest}) => {
  return <button className={cn('btn', className)} type={type} {...rest}></button>;
};

export default Button;
