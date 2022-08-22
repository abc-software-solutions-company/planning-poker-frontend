import {useRouter} from 'next/router';
import React from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';
import ModalCreateNewRoom from '@/core-ui/modal-create-new-room';

import styles from './style.module.scss';

const PlanningPocker: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={styles['planning-pocker']}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-button">
            <Button className="button-left" onClick={handleOpen}>
              Create Room
            </Button>
            <ModalCreateNewRoom open={open} onClose={handleClose} />
            <div className="input-right">
              <InputText placeholder="Enter a link or ID"></InputText>
              <Button className="button-right" onClick={() => router.push('/room-detail')}>
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPocker;
