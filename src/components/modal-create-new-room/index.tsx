import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
}
const ModalCreateNewRoom: React.FC<IProps> = ({open, onClose}) => {
  const router = useRouter();

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className={styles['create-new-room']}>
          <div className="container">
            <div className="content">
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <InputText placeholder="Enter room name"></InputText>
                <div className="button">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={() => router.push('/room-detail')}>Create</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateNewRoom;
