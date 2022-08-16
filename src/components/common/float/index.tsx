import cn from 'classnames';
import React, {ReactNode, useEffect, useRef} from 'react';

import useScroll from '@/hooks/useScroll';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  children?: ReactNode;
  offset?: number;
  placement?: 'left' | 'right';
}

const Float: React.FC<IProps> = ({className, children, placement = 'right', offset = 50}) => {
  const scroll = useScroll(undefined, 0, 500);
  const brandEl = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (brandEl.current !== null) {
      brandEl.current.style.top = scroll.y + offset + 'px';
    }
  }, [scroll.y, offset]);

  return (
    <div className={cn(styles['float-element'], className)}>
      <div className={cn('float-wrap', placement)} ref={brandEl}>
        {children}
      </div>
    </div>
  );
};

export default Float;
