import cls from 'classnames';
import {FC} from 'react';

import ModalRoom from '@/components/lobby/modal-room';
import {useStateAuth} from '@/contexts/auth';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import useLobby from './hook';
import styles from './style.module.scss';

const Lobby: FC = () => {
  const {openModal, setOpenModal, register, handleSubmit, errors, onSubmit, disabled} = useLobby();
  const auth = useStateAuth();
  return (
    <>
      <div className={styles.lobby}>
        <div className="container">
          <div className="topbar">
            <div className="right">
              <Icon name="ico-user" size={24} />
              <p className={cls('text')}>{auth && auth.name}</p>
            </div>
          </div>
          <div className="inner">
            <Heading as="h2" className="heading head">
              PLANNING POKER
            </Heading>
            <Heading as="h4" className="headline head">
              High-functioning teams here also rely on Planning Poker
            </Heading>
            <div className="actions">
              <Button
                variant="contained"
                color="primary"
                text="Create Room"
                onClick={() => setOpenModal(true)}
                disabled={disabled}
              />
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
