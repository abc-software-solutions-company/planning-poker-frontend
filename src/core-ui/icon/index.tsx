import React, {InputHTMLAttributes} from 'react';

interface IProps extends InputHTMLAttributes<HTMLElement> {
  size?: 16 | 24 | 32 | 48;
  host?: boolean;
  color?: string;
}

const Button: React.FC<IProps> = ({className, size = 16, host, color}) => {
  if (host === true) color = 'red';
  return (
    <>
      <i className={['abc-icon', className, `text-abc-${color}`, `abc-${size}`].join(' ')}></i>
    </>
  );
};

export default Button;
