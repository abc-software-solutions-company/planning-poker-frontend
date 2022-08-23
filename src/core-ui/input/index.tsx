import cn from 'classnames';
import React from 'react';

type IProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, IProps>(({className, ...rest}, ref) => {
  return <input className={cn('form-input', className)} ref={ref} {...rest} />;
});

Input.displayName = 'Input';
export default Input;
