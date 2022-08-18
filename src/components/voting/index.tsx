import {useRef} from 'react';

import Button from '@/core-ui/button';
import {IVoteUser} from '@/types';

import LogoCopy from '../icons/copy';
import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataUsers: IVoteUser[];
  btn: string;
}
const VoteRoom: React.FC<IProps> = ({dataUsers, btn}) => {
  const inputLink = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(inputLink.current!.value);
  };
  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <h1 className="room-name">Room name</h1>
          <div className="content">
            <div className="left-content">
              <h2 className="story-name">Story name</h2>
              <div className="card-holder"></div>
            </div>
            <div className="right-content">
              <h5 className="title">Waiting for Admin vote</h5>
              <h5 className="sub-title border-line">Players:</h5>
              {dataUsers.map(({name, host, vote}, index) => {
                return <VoteUser className="border-line" key={index} name={name} host={host} vote={vote} />;
              })}
              <div className="action border-line">
                <Button>{btn}</Button>
              </div>
              <div className="sharing">
                <h5>Invite a teammate</h5>
                <div className="share-link">
                  <input type="text" ref={inputLink} value="https://www.google.com.vn/" />
                  <button className="copy-btn" onClick={handleCopy}>
                    <LogoCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteRoom;
