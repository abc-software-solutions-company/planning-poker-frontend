import React from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';
import ModalCreate from '@/core-ui/modal';

import styles from './style.module.scss';

const Room: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={styles.room}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-button">
            <Button className="button-left" onClick={handleOpen}>
              Create Room
            </Button>
            <ModalCreate placeholder="Enter room name" title="Create New Room" open={open} onClose={handleClose} />
            <div className="input-right">
              <InputText placeholder="Enter a link or ID"></InputText>
              <Button className="button-right">Join</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
