import React from 'react';

import Heading from '@/components/heading';
import InputText from '@/components/input-text';
import Button from '@/core-ui/button';

import styles from './style.module.scss';

const Login: React.FC = () => {
  return (
    <>
      <div className={`${styles.login}`}>
        <div className="container">
          <Heading as="h1">PLANNING POKER</Heading>
          <div className="content">
            <Heading as="h4">Let&apos;s start !</Heading>
            <InputText className="form-input" placeholder="Enter your name"></InputText>
            <Button className="btn">Enter</Button>
          </div>
          <div className="footer">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </div>
    </>
  );
};

export default Login;
