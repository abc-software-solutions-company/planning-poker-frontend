import {ROUTES} from '@/configs/routes.config';
import {useLoadMore} from '@/data/client/nav.client';

import ActiveLink from './active-link';

interface IProps {
  className?: string;
}
interface INavItem {
  name: string;
  href: string;
  cn?: string;
  categories?: INavItem[];
}
const Nav: React.FC<IProps> = ({className}) => {
  const blogCategories = useLoadMore('blog').categories.map(({attributes: {name, slug}}) => {
    return {name, href: `${ROUTES.BLOG}/category/${slug}`};
  });
  const projectCategories = useLoadMore('project').categories.map(({attributes: {name, slug}}) => {
    return {name, href: `${ROUTES.PROJECT}/category/${slug}`};
  });
  const navItems: INavItem[] = [
    {name: 'Giới Thiệu', href: `${ROUTES.HOME}#sec-introduction`},
    {name: 'Dự án', href: ROUTES.PROJECT, categories: projectCategories},
    {name: 'Quy Trình', href: `${ROUTES.HOME}#sec-our-process`},
    {name: 'Bảng Giá', href: `${ROUTES.HOME}#sec-pricing`},
    {name: 'Blog', href: ROUTES.BLOG, categories: blogCategories, cn: 'menu-sub-right'},
    {name: 'Liên Hệ', href: ROUTES.CONTACT}
  ];

  const renderNavItems = (data: INavItem[]) => {
    return (
      <>
        {data.map(({name, href, cn, categories}, idx) => {
          return (
            <li key={idx} className={cn}>
              <ActiveLink activeClassName="active" href={href}>
                <a>
                  <span>{name}</span>
                  {categories && <i></i>}
                </a>
              </ActiveLink>
              {categories && (
                <ul>
                  <>{renderNavItems(categories)}</>
                </ul>
              )}
            </li>
          );
        })}
      </>
    );
  };
  return (
    <nav className={className}>
      <ul className="lg:flex">{renderNavItems(navItems)}</ul>
    </nav>
  );
};

export default Nav;
