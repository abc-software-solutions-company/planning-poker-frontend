import React from 'react';

import ModalCreate from '@/components/modal-stories';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import styles from './style.module.scss';

const Room: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={styles.room}>
        <div className="container">
          <div>
            <Heading as="h2">PLANNING POKER</Heading>
            <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
            <div className="input-button">
              <Button className="button-left" onClick={() => setOpen(true)}>
                Create Room
              </Button>
              <ModalCreate placeholder="Enter room name" title="Create New Room" open={open} setOpen={setOpen} />
              <div className="input-right">
                <Input placeholder="Enter a link or ID" />
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
