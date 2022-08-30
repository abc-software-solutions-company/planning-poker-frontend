import {yupResolver} from '@hookform/resolvers/yup';
import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import {createUSR} from '@/data/client/room.client';
import {createStory} from '@/data/client/story.client';
import {ICreateStory, IFullUSR, IRoom} from '@/types';

import useVoting from '../voting/hooks';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUSRs: React.Dispatch<React.SetStateAction<IFullUSR[]>>;
  dataRoom: IRoom;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 10 letters')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

const ModalStory: React.FC<IProps> = ({open, setOpen, setUSRs, dataRoom}) => {
  const {hostUserId: userId, id: roomId} = dataRoom;
  const {updateRoom} = useVoting();
  const router = useRouter();
  const handleOnSubmit = async (data: ICreateStory) => {
    createStory(data).then(res => {
      if (res.status === 201) {
        createUSR({userId, storyId: res.data.id, roomId}).then(res1 => {
          if (res1.status === 201) {
            updateRoom({roomId, setUSRs});
            setOpen(false);
          }
        });
      }
    });
  };

  const onCancel = () => {
    setOpen(false);
    router.push(ROUTES.HOME);
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
              <Heading as="h5">Create New Story</Heading>
              <div className="input-button">
                <Input placeholder="Enter story" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button onClick={onCancel}>Cancel</Button>
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

export default ModalStory;
