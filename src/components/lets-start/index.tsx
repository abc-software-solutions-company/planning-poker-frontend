import React from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import {ABCWEBSITE} from '@/utils/constant';

import useLetsStart from './hook';
import style from './style.module.scss';

const LetsStart: React.FC = () => {
  const {register, errors, handleSubmit, onSubmit} = useLetsStart();
  return (
    <>
      <div className={`${style['lets-start']}`}>
        <div className="container">
          <div>
            <Heading as="h1">PLANNING POKER</Heading>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
              <Heading as="h4">Let&apos;s start!</Heading>
              <div className="input">
                <Input className={errors.name && 'error'} placeholder="Enter your name" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
              </div>
              <Button type="submit">Enter</Button>
            </form>
            <div className="footer">
              <span className="copy-right">Copyright © 2022 By</span>{' '}
              <a className="website" href={ABCWEBSITE}>
                ABC Software Solutions Company
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetsStart;
