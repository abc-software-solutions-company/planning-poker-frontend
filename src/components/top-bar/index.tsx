import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import AuthModal from './auth-model';
import styles from './style.module.scss';

interface Iprops {
  roomName?: string;
  authName?: string;
  showBackBtn?: boolean;
}

const TopBar: FC<Iprops> = ({roomName, authName, showBackBtn}) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const onClick = () => {
    setOpenModal(true);
  };

  return (
    <div className={styles['top-bar']}>
      <div className="left">
        {showBackBtn && (
          <>
            <button onClick={() => router.push(ROUTES.LOBBY)}>
              <Icon name="ico-arrow-left-circle" size={28} />
            </button>
            <p className="room-name">{roomName}</p>
          </>
        )}
      </div>
      <div className="grow"></div>
      <button className="right" onClick={onClick}>
        <Icon name="ico-user" size={24} />
        <p className="text">{authName}</p>
      </button>
      <AuthModal {...{openModal, setOpenModal}} />
    </div>
  );
};

export default TopBar;
