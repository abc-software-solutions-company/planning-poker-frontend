import {yupResolver} from '@hookform/resolvers/yup';
import {signIn} from 'next-auth/react';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import {ICreateUser} from '@/types';

import styles from './style.module.scss';

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

const LetsStart: React.FC = () => {
  const toast = useToast();
  const handleOnSubmit = (data: ICreateUser) => {
    signIn('credentials', {
      callbackUrl: ROUTES.HOME,
      name: data.name
    });
  };

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  return (
    <>
      <div className={`${styles['lets-start']}`}>
        <div className="container">
          <div className="inner">
            <div>
              <Heading as="h1">PLANNING POKER</Heading>
              <form className="content" onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h4">Let&apos;s start!</Heading>
                <Input className={errors.name && 'error'} placeholder="Enter your name" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <Button
                  type="submit"
                  onClick={() =>
                    toast.show({
                      type: 'danger',
                      title: 'Error!',
                      content: 'Please enter your name',
                      lifeTime: 3000
                    })
                  }
                >
                  Enter
                </Button>
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
