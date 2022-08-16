import classNames from 'classnames';
import {useRouter} from 'next/router';

import {MODULES} from '@/configs/modules.config';
import {ROUTES} from '@/configs/routes.config';

import styles from './styles.module.scss';

interface IProps {
  className?: keyof typeof styles;
}
interface ILanguage {
  locale: string;
  name: string;
}

const Language: React.FC<IProps> = ({className}) => {
  const router = useRouter();

  const targetLanguage = MODULES.language.items.filter(e => e.locale !== router.locale);

  const redirect = (path: string, locale: string) => {
    let url = ROUTES.HOME;

    if (path.includes(ROUTES.BLOG)) url = ROUTES.BLOG;
    if (path.includes(ROUTES.PROJECT)) url = ROUTES.PROJECT;

    router.push(url, undefined, {locale});
  };

  const renderLanguage = () => {
    return (
      <>
        {targetLanguage.map((language: ILanguage, index) => {
          const {locale} = language;

          return (
            <span className="text" onClick={() => redirect(router.asPath, locale)} key={index}>
              {language.name}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div className={classNames(styles.languages, styles[className + ''])}>
      <div className="inner">{renderLanguage()}</div>
    </div>
  );
};

export default Language;
