import Image from 'next/image';
import React from 'react';

import Logo from '@/assets/images/logo-planning-pocker.png';
import Heading from '@/components/heading';

import styles from './style.module.scss';

const Login: React.FC = () => {
  return (
    <>
      <div className={`${styles.login}`}>
        <div className="container">
          <div className="logo-planning-pocker">
            <Image src={Logo} alt="Logo Planning Pocker" objectFit="contain" objectPosition="center" />
          </div>
          <div className="content">
            <Heading as="h3">Let&apos;s start !</Heading>
            <input className="form-input" type="text" placeholder="Enter your name" />
            <button className="btn">Enter</button>
          </div>
          <div className="footer">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </div>
    </>
  );
};

export default Login;
