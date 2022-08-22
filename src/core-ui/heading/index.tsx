import React, {ElementType, FC, ReactNode} from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
  as: ElementType;
}

const Heading: FC<IProps> = ({className, as, children}) => {
  const Element = as;

  return <Element className={className}>{children}</Element>;
};

export default Heading;
