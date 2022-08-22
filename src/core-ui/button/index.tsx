import cn from 'classnames';
import {ReactNode} from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({children, className = '', onClick}) => {
  return (
    <button className={cn('btn', className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
