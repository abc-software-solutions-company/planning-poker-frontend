import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ImagesFooter from '@/assets/images/footer-map-image.png';
import IconMapPoint from '@/components/icons/icon-map-point';
import IconPhone from '@/components/icons/icon-phone';
import Logo from '@/components/icons/logo';
import LogoBe from '@/components/icons/socials/logo-be';
import LogoFacebook from '@/components/icons/socials/logo-facebook';
import LogoPinterest from '@/components/icons/socials/logo-instagram';
import LogoInstagram from '@/components/icons/socials/logo-pinterest';
import LogoTikTok from '@/components/icons/socials/logo-tiktok';

import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className="container">
        <div className="content">
          <div className="map">
            <div className="logo-title flex gap-4">
              <div className="logo h-16 w-16"> </div>
              <h2>SƠ ĐỒ IKI THIẾT KẾ VÀ XÂY DỰNG TRÊN TOÀN QUỐC</h2>
            </div>
            <div className="vnmap">
              <Image src={ImagesFooter} layout="fill" alt="Logo Map" objectFit="contain" objectPosition="center" />
            </div>
          </div>
          <div className="showroom">
            <div className="showroom-title">HỆ THỐNG SHOWROOM</div>
            <div className="showroom-area">
              <div className="showroom-group">
                <div className="title">
                  <h3>KHU VỰC MIỀN TRUNG</h3>
                </div>
                {/* Đà nẵng 1 address*/}
                <div className="province-contact-list">
                  <h4 className="province-name">Đà Nẵng</h4>
                  <div className="contact-item">
                    <div className="contact-address">
                      <div className="map-point-icon">
                        <IconMapPoint />
                      </div>
                      <p>244A Đường Bình Kỳ, Hòa Quý, Ngũ Hành Sơn, Đà Nẵng</p>
                    </div>
                    <div className="contact-phone">
                      <div className="phone-icon">
                        <IconPhone />
                      </div>
                      <a className="text-white" href="tel:0799980008" title="Liên Hệ Với Tôi">
                        <span>07999 80008</span>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Nha Trang 2 address*/}
                <div className="province-contact-list">
                  <h4 className="province-name">Nha Trang</h4>
                  <div className="contact-item">
                    {/* Phước Hải */}
                    <div className="contact-address">
                      <div className="map-point-icon">
                        <IconMapPoint />
                      </div>
                      <p>11A Văn Tiến Dũng, VCN Phước Hải, TP Nha Trang</p>
                    </div>
                    {/* Phước Đồng */}
                    <div className="contact-address">
                      <div className="map-point-icon">
                        <IconMapPoint />
                      </div>
                      <p>Xưởng sản xuất Đường Trần Sâm - xã Phước Đồng - TP Nha Trang</p>
                    </div>
                    <div className="contact-phone">
                      <div className="phone-icon">
                        <IconPhone />
                      </div>
                      <a className="text-white" href="tel:0799980008" title="Liên Hệ Với Tôi">
                        <span>07999 80008</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="copyright-title">WEBSITE ĐƯỢC VẬN HÀNH BỞI</div>
            <div className="logo mx-auto lg:mx-0">
              <Logo width={200} />
            </div>
            <div className="copyright-content">
              <p>© Copyright by ABC Softeware Solutions</p>
              <p>07 999 80008</p>
              <a className="text-white" href="mailto:ikiarch.ltd@gmail.com" title="Liên Hệ Với Tôi">
                <p>Email: ikiarch.ltd@gmail.com</p>
              </a>
              <p>11A Văn Tiến Dũng, VCN Phước Hải, TP Nha Trang</p>
              <p>244A Đường Bình Kỳ, Hòa Quý, Ngũ Hành Sơn, Đà Nẵng</p>
              <p>Xưởng sản xuất Đường Trần Sâm - xã Phước Đồng - TP Nha Trang</p>
            </div>
            <div className="social-logo">
              <div className="instagram-logo">
                <Link href="https://www.pinterest.com/ikidesignvietnam/pins/">
                  <a target="_blank">
                    <LogoInstagram />
                  </a>
                </Link>
              </div>
              <div className="facebook-logo">
                <Link href="https://www.facebook.com/IKIdesignvietnam/">
                  <a target="_blank">
                    <LogoFacebook />
                  </a>
                </Link>
              </div>
              <div className="pinterest-logo">
                <Link href="https://instagram.com/ikidesign.79?r=nametag">
                  <a target="_blank">
                    <LogoPinterest />
                  </a>
                </Link>
              </div>
              <div className="be-logo">
                <Link href="https://www.behance.net/ikidesignvietnam">
                  <a target="_blank">
                    <LogoBe />
                  </a>
                </Link>
              </div>
              <div className="tiktok-logo">
                <Link href="https://www.tiktok.com/@nhadep79?lang=vi-VN">
                  <a target="_blank">
                    <LogoTikTok />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
