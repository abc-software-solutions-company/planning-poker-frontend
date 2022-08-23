import React, {useRef} from 'react';

import VoteCard from '@/components/cards';
import LogoCopy from '@/components/icons/copy';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';
import ModalCreate from '@/core-ui/modal';
import {IVoteUser} from '@/types';

import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataUsers: IVoteUser[];
}
const VoteRoom: React.FC<IProps> = ({dataUsers}) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const inputLink = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(inputLink.current!.value);
  };
  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <Heading className="room-name" as="h4">
            Room name
          </Heading>
          <div className="content">
            <div className="left-content">
              <Heading as="h4">Story name</Heading>
              <div className="card-holder">
                <VoteCard>0</VoteCard>
                <VoteCard>1</VoteCard>
                <VoteCard>2</VoteCard>
                <VoteCard>3</VoteCard>
                <VoteCard>5</VoteCard>
                <VoteCard>8</VoteCard>
                <VoteCard>13</VoteCard>
                <VoteCard>21</VoteCard>
              </div>
            </div>
            <div className="right-content">
              <h5 className="title">Waiting for Admin vote</h5>
              <h5 className="sub-title border-line">Players:</h5>
              {dataUsers.map(({name, host, vote}, index) => {
                return <VoteUser className="border-line" key={index} name={name} host={host} vote={vote} />;
              })}
              <div className="action border-line">
                <Button>Finish</Button>
              </div>
              <ModalCreate placeholder="Enter story " title="Create New Story" open={open} onClose={handleClose} />

              <div className="sharing">
                <h5>Invite a teammate</h5>
                <div className="share-link">
                  <InputText value="https://www.google.com.vn/"></InputText>
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
