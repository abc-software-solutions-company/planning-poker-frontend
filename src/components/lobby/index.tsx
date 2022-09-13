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
          <div className="inner">
            <Heading as="h2" className="heading head">
              PLANNING POKER
            </Heading>
            <Heading as="h4" className="headline head">
              High-functioning teams here also rely on Planning Poker
            </Heading>
            <div className="actions">
              <Button variant="contained" color="primary" text="Create Room" onClick={() => setOpenModal(true)} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  error={errors.idOrLink?.message}
                  groupEnd={<Button variant="contained" color="primary" type="submit" text="Join" />}
                  placeholder="Enter a link or ID"
                  {...register('idOrLink')}
                />
              </form>
            </div>
          </div>
        </div>

        <ModalRoom open={openModal} setOpen={setOpenModal} />
      </div>
    </>
  );
};

export default Lobby;
