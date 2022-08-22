import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {createRoom} from '@/data/client/room.client';
import {ICreateRoom} from '@/types';

// import InputText from '@/core-ui/input-text';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const ModalCreateNewRoom: React.FC<IProps> = ({open, onClose}) => {
  const router = useRouter();
  const {register, handleSubmit} = useForm();
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <form className={styles['modal-create-room']} onSubmit={handleSubmit(data => createRoom(data as ICreateRoom))}>
          <div className="container">
            <div className="content">
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <input className="form-input" placeholder="Enter room name" {...register('name')} />
                <div className="button">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={() => router.push('/room-detail')}>Create</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalCreateNewRoom;
