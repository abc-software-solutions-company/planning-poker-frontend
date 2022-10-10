import {FC, useEffect} from 'react';

import RoomModal from '@/components/lobby/room-modal';
import {useStateAuth} from '@/contexts/auth';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import TopBar from '../top-bar';
import useLobby from './hook';
import styles from './style.module.scss';

const Lobby: FC = () => {
  const {openModal, setOpenModal, register, errors, onSubmit, disabled} = useLobby();
  const auth = useStateAuth();
  useEffect(() => {
    // console.log(window);
  }, []);
  return (
    <div className={styles.lobby}>
      <div className="container">
        <TopBar authName={auth?.name} />
        <div className="inner">
          <Heading as="h2" className="heading head">
            PLANNING POKER
          </Heading>
          <Heading as="h4" className="headline head">
            High-functioning teams here also rely on Planning Poker
          </Heading>
          <div className="actions">
            <Button variant="contained" color="primary" text="Create Room" onClick={() => setOpenModal(true)} />
            <form onSubmit={onSubmit}>
              <Input
                error={errors.idOrLink?.message}
                maxLength={257}
                groupEnd={<Button variant="contained" color="primary" type="submit" text="Join" disabled={disabled} />}
                placeholder="Enter a link or ID"
                {...register('idOrLink')}
              />
            </form>
          </div>
        </div>
      </div>
      <RoomModal {...{openModal, setOpenModal}} />
    </div>
  );
};

export default Lobby;
