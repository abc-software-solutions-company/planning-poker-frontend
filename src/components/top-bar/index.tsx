import Link from 'next/link';
import * as React from 'react';

import LogoFacebook from '@/components/icons/socials/logo-facebook';
import LogoPinterest from '@/components/icons/socials/logo-instagram';
import LogoInstagram from '@/components/icons/socials/logo-pinterest';

import styles from './style.module.scss';

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className="container">
        <div className="left-content">
          <p className="text-white">Liên hệ |</p>
          <a className="text-white !no-underline" href="tel:+84 799.980.008" title="Liên Hệ Với Tôi">
            +84 799.980.008
          </a>
          <div className="social-logo">
            <div>
              <Link href="https://www.facebook.com/IKIdesignvietnam/">
                <a target="_blank">
                  <LogoFacebook width={20} />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://instagram.com/ikidesign.79?r=nametag">
                <a target="_blank">
                  <LogoPinterest width={20} />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://www.pinterest.com/ikidesignvietnam/pins/">
                <a target="_blank">
                  <LogoInstagram width={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="right-content">11A Văn Tiến Dũng, VCN Phước Hải, TP Nha Trang</div>
      </div>
    </div>
  );
};

export default TopBar;
