import React from 'react';

import ModalCreate from '@/components/modal-room';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import styles from './style.module.scss';

const Room: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.room}>
        <div className="container">
          <div>
            <Heading as="h2">PLANNING POKER</Heading>
            <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
            <div className="input-button">
              <Button className="button-left" onClick={handleOpen}>
                Create Room
              </Button>
              <ModalCreate placeholder="Enter room name" title="Create New Room" open={open} onClose={handleClose} />
              <div className="input-right">
                <Input type="text" placeholder="Enter a link or ID" />
                <Button className="button-right">Join</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
