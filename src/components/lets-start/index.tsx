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
            <div className="section-content">
              <Heading className="heading" as="h1">
                PLANNING POKER
              </Heading>
              <div className="form-enter-your-name">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Heading className="head-form" as="h4">
                    Let&apos; start!
                  </Heading>
                  <Input error={errors.name?.message} placeholder="Enter a link or ID" {...register('name')} />
                  <Button className="w-full" variant="contained" color="primary" type="submit">
                    Enter
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetsStart;
