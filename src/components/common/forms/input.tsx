import cn from 'classnames';
import React, {InputHTMLAttributes} from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
  dimension?: 'small' | 'medium' | 'big';
  error?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  shadow?: boolean;
  type?: string;
  variant?: 'normal' | 'solid' | 'outline' | 'line';
}

const variantClasses = {
  normal: 'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
  outline: 'border border-border-base rounded focus:border-accent',
  line: 'ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent'
};

const sizeClasses = {
  small: 'text-sm h-9',
  medium: 'h-12',
  big: 'h-14'
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      variant = 'normal',
      dimension = 'medium',
      shadow = false,
      disabled = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className="text-body-dark mb-3 block text-sm font-semibold leading-none">
            {label}
          </label>
        )}

        <input
          id="name"
          name={name}
          type={type}
          ref={ref}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          className={cn(
            'text-heading flex w-full appearance-none items-center px-4 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-0',
            shadow && 'focus:shadow',
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && 'cursor-not-allowed bg-gray-100',
            inputClassName
          )}
          {...rest}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
