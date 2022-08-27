import {yupResolver} from '@hookform/resolvers/yup';
import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React, {Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import {createRoom} from '@/data/client/room.client';
import {ICreateRoom} from '@/types';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  placeholder: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter room name').max(256, 'Your name must not exceed 256 letters')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

const ModalRoom: React.FC<IProps> = ({open, setOpen, title, placeholder}) => {
  const toast = useToast();
  const router = useRouter();
  const handleOnSubmit = (data: ICreateRoom) => {
    createRoom(data).then(res => {
      if (res.status === 201) router.push(ROUTES.ROOM + res.data.id);
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
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">{title}</Heading>
              <div className="input-button">
                <Input className={errors.name && 'error'} placeholder={placeholder} {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    type="submit"
                    onClick={() =>
                      toast.show({
                        type: 'danger',
                        title: 'Error!',
                        content: 'Please enter room name',
                        lifeTime: 3000
                      })
                    }
                  >
                    Create
                  </Button>
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
