import {FC} from 'react';

import ModalRoom from '@/components/lobby/modal-room';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import useLobby from './hook';
import styles from './style.module.scss';

const Lobby: FC = () => {
  const {openModal, setOpenModal, register, handleSubmit, errors, onSubmit} = useLobby();

  return (
    <>
      <div className={styles.lobby}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-group">
            <Button className="button-left" onClick={() => setOpenModal(true)}>
              Create Room
            </Button>
            <ModalRoom open={openModal} setOpen={setOpenModal} />
            <form className="input-right" onSubmit={handleSubmit(onSubmit)}>
              <Input className={errors.name && 'error'} placeholder="Enter a link or ID" {...register('name')} />
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

export default Lobby;
