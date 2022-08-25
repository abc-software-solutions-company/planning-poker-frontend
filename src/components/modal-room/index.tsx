import {yupResolver} from '@hookform/resolvers/yup';
import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {createRoom} from '@/data/client/room.client';
import {ICreateRoom} from '@/types';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  title: string;
  onClose: () => void;
  placeholder: string;
}

const Schema = yup.object().shape({
  name: yup
    .string()
    .required('Please fill in your name')
    .max(32, 'Your name must not exceed 10 letters')
    .min(1, 'Your name must be atleast 1 letter')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

const ModalRoom: React.FC<IProps> = ({open, onClose, title, placeholder}) => {
  const router = useRouter();
  const handleOnSubmit = (data: ICreateRoom) => {
    createRoom(data).then(res => {
      if (res.status === 201) router.push(ROUTES.ROOM + '/' + res.data.id);
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
      <Modal open={open} onClose={onClose}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">{title}</Heading>
              <div className="input-button">
                <input className="form-input" placeholder={placeholder} {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit">Create</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalRoom;
