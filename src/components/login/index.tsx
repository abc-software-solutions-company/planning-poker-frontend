import {useRouter} from 'next/router';
import React from 'react';
import {useForm} from 'react-hook-form';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {createUser} from '@/data/client/user.client';
import {ICreateUser} from '@/types';

import styles from './style.module.scss';

const Login: React.FC = () => {
  const {register, handleSubmit} = useForm();
  const router = useRouter();
  const handleOnSubmit = (data: ICreateUser) => {
    createUser(data).then(res => {
      if (res.status === 201) router.push(ROUTES.ROOM);
    });
  };
  return (
    <>
      <form className={`${styles.login}`} onSubmit={handleSubmit(data => handleOnSubmit(data as ICreateUser))}>
        <div className="container">
          <Heading as="h1">PLANNING POKER</Heading>
          <div className="content">
            <Heading as="h4">Let&apos;s start !</Heading>
            <input className="form-input" placeholder="Enter your name" {...register('name')} />
            <Button className="btn">Enter</Button>
          </div>
          <div className="footer">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </form>
    </>
  );
};

export default Login;
