import {useRouter} from 'next/router';
import React from 'react';
import {useForm} from 'react-hook-form';

// import Heading from '@/components/heading';
import Button from '@/core-ui/button';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';
import {createUser} from '@/data/client/user.client';
import {ICreateUser} from '@/types';

import styles from './style.module.scss';

const Login: React.FC = () => {
  const {register, handleSubmit} = useForm();
  const router = useRouter();

  return (
    <>
      <form className={`${styles.login}`} onSubmit={handleSubmit(data => createUser(data as ICreateUser))}>
        <div className="container">
          <Heading as="h1">PLANNING POKER</Heading>
          <div className="content">
            <Heading as="h4">Let&apos;s start !</Heading>
            <input className="form-input" placeholder="Enter your name" {...register('name')} />
            {/* <Button className="btn">Enter</Button>
            <InputText placeholder="Enter your name"></InputText> */}
            <Button className="btn" onClick={() => router.push('/create-room')}>
              Enter
            </Button>
          </div>
          <div className="footer">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </form>
    </>
  );
};

export default Login;
