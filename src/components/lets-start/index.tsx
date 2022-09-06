import React from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import useLetsStart from './hook';
import style from './style.module.scss';

const LetsStart: React.FC = () => {
  const {register, errors, handleSubmit, onSubmit} = useLetsStart();
  return (
    <>
      <div className={`${style['lets-start']}`}>
        <div className="container">
          <div className="inner">
            <div>
              <Heading as="h1">PLANNING POKER</Heading>
              <form className="content" onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h4">Let&apos;s start!</Heading>
                <Input className={errors.name && 'error'} placeholder="Enter your name" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <Button type="submit">Enter</Button>
              </form>
              <div className="footer">Copyright © 2022 By ABC Software Solutions Company.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetsStart;
