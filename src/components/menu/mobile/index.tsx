import Link from 'next/link';

import LogoFacebook from '@/components/icons/socials/logo-facebook';
import LogoPinterest from '@/components/icons/socials/logo-instagram';
import LogoInstagram from '@/components/icons/socials/logo-pinterest';
import MainNav from '@/components/menu/nav';

import styles from './style.module.scss';

interface IProps {
  visible: boolean;
}

const MenuMobile: React.FC<IProps> = ({visible}) => {
  return (
    <div className={`menu-mobile fade ${visible ? 'show visible' : 'invisible'} ${styles['menu-mobile']}`}>
      <div className="top">
        <div className="line"></div>
        <div className="container">
          <MainNav />
        </div>
      </div>
      <div className="topbar-menu-mobile">
        <div className="container">
          <div className="lienhe-menu-top">
            <p className="text-white">Liên hệ |</p>
            <a className="text-white !no-underline" href="tel:+84 799.980.008" title="Liên Hệ Với Tôi">
              +84 799.980.008
            </a>
          </div>
          <div className="social-logo">
            <div className="facebook-logo">
              <Link href="https://www.facebook.com/IKIdesignvietnam/">
                <a target="_blank">
                  <LogoFacebook width={20} />
                </a>
              </Link>
            </div>
            <div className="instagram-logo">
              <Link href="https://instagram.com/ikidesign.79?r=nametag">
                <a target="_blank">
                  <LogoPinterest width={20} />
                </a>
              </Link>
            </div>
            <div className="pinterest-logo">
              <Link href="https://www.pinterest.com/ikidesignvietnam/pins/">
                <a target="_blank">
                  <LogoInstagram width={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
