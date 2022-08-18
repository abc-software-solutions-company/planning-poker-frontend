import cn from 'classnames';
import {ReactNode} from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
}

const Button: React.FC<IProps> = ({children, className = ''}) => {
  return <button className={cn('btn', className)}>{children}</button>;
};

export default Button;
