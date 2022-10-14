import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth';
import Icon from '@/core-ui/icon';

import {Tracking} from '../common/third-party/tracking';
import AuthModal from './auth-model';
import styles from './style.module.scss';

interface Iprops {
  roomName?: string;
  authName?: string;
  showBackBtn?: boolean;
}

const TopBar: FC<Iprops> = ({roomName, authName, showBackBtn}) => {
  const auth = useStateAuth();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const onClickUserName = () => {
    Tracking.event({name: 'Click User Name button', properties: {auth}});
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
      <button className="right" onClick={onClickUserName}>
        <Icon name="ico-user" size={24} />
        <p className="text">{authName}</p>
      </button>
      <AuthModal {...{openModal, setOpenModal}} />
    </div>
  );
};

export default TopBar;
