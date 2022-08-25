import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import ModalRoom from '@/components/modal-room';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {createRoom} from '@/data/client/room.client';
// import Input from '@/core-ui/input';
import {useCheckLogin} from '@/hooks/check-login';
import {ICreateRoom} from '@/types';

import styles from './style.module.scss';

const Hall: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  const Schema = yup.object().shape({
    name: yup
      .string()
      .required('Please fill in the room id or link')
      .max(32, 'Room link must not exceed 10 letters')
      .min(1, 'Room link must be atleast 1 letter')
  });

  interface IFormInputs {
    name: string;
  }

  const FORM_DEFAULT_VALUES: IFormInputs = {
    name: ''
  };

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

  const onSubmit: SubmitHandler<ICreateRoom> = data => {
    handleOnSubmit(data);
  };

  useCheckLogin();
  return (
    <>
      <div className={styles.hall}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-button">
            <Button className="button-left" onClick={handleOpen}>
              Create Room
            </Button>
            <ModalRoom placeholder="Enter room name" title="Create New Room" open={open} onClose={handleClose} />
            <form className="input-right" onSubmit={handleSubmit(onSubmit)}>
              <input placeholder="Enter a link or ID" {...register('name')}></input>
              {errors.name && <p className="error-validate">{errors.name.message}</p>}
              <Button className="button-right" type="submit">
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hall;
