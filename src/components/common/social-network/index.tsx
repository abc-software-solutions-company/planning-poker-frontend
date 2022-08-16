import classnames from 'classnames';

import BrandFacebook from '@/components/icons/brand-facebook';
import BrandLinkedIn from '@/components/icons/brand-linkedin';
import {siteSettings} from '@/configs/site.config';

import styles from './styles.module.scss';

interface IProps {
  className?: keyof typeof styles;
}

const SocialNetwork: React.FC<IProps> = ({className}) => {
  return (
    <div className={classnames(styles.socialNetwork, styles[className + ''])}>
      <a href={`${siteSettings.facebookUrl}`} rel="noreferrer" target="_blank">
        <BrandFacebook />
      </a>
      <a href={`${siteSettings.linkedInUrl}`} rel="noreferrer" target="_blank">
        <BrandLinkedIn />
      </a>
    </div>
  );
};

export default SocialNetwork;
