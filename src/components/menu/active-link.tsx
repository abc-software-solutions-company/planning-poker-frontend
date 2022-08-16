import Link, {LinkProps} from 'next/link';
import {useRouter} from 'next/router';
import React, {Children, ReactElement, useEffect, useState} from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

const ActiveLink = ({children, activeClassName, ...props}: ActiveLinkProps) => {
  const {asPath, isReady} = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL((props.as || props.href) as string, location.href).href;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).href;

      const newClassName =
        activePathname.indexOf(linkPathname) > -1 ? `${childClassName} ${activeClassName}`.trim() : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [asPath, isReady, props.as, props.href, childClassName, activeClassName, setClassName, className]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  );
};

export default ActiveLink;
