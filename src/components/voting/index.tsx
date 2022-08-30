import {getSession} from 'next-auth/react';
import React, {useEffect, useRef, useState} from 'react';

import ModalStory from '@/components/modal-stories';
import VoteCard from '@/components/voting/cards';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
// import VoteCard from '@/components/cards';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import {updateUSR} from '@/data/client/room.client';
import {IFullUSR, IRoom} from '@/types';

import useVoting from './hooks';
import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataRoom: IRoom;
}
const VoteRoom: React.FC<IProps> = ({dataRoom}) => {
  const {id: roomId} = dataRoom;
  const FIBONACCI: number[] = [0, 1, 2, 3, 5, 8, 13, 21];
  const [selectedPoker, setSelectedPoker] = useState<number>();

  const [USRs, setUSRs] = useState<IFullUSR[]>();
  console.log('🚀 ~ file: index.tsx ~ line 24 ~ USRs', USRs);
  const toast = useToast();
  const [isFinish, setIsFinish] = useState(false);
  const [open, setOpen] = React.useState(false);
  const inputLink = useRef<HTMLInputElement>(null);
  const {updateRoom, checkRoom} = useVoting();

  const handleSelectPoker = async (value: number) => {
    const session = await getSession();
    if (session) {
      updateUSR({userId: session.user.id, roomId, storyId: String(USRs?.[0].storyId), storyPoint: value}).then(res => {
        if (res.status === 200) {
          setSelectedPoker(res.data.storyPoint);
          updateRoom({roomId, setUSRs});
        }
      });
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(inputLink.current!.value);
  };

  useEffect(() => {
    updateRoom({roomId, setUSRs});
    checkRoom({roomId, setOpen});
  }, []);

  const toggleIsFinish = () => {
    // 👇️ passed function to setState
    setIsFinish(current => !current);
  };

  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <Heading className="room-name" as="h4">
            {dataRoom.name}
          </Heading>
          <div className="content">
            <div className="left-content">
              <Heading as="h4">{USRs?.[0] ? USRs[0].story.name : 'Story name'}</Heading>
              {!isFinish && (
                <div className="card-holder">
                  {FIBONACCI.map(num => {
                    return (
                      <VoteCard
                        key={num}
                        className={num === selectedPoker ? 'selected' : ''}
                        value={num}
                        onClick={() => handleSelectPoker(num)}
                      />
                    );
                  })}
                </div>
              )}
              {isFinish && <Chart className="chart-holder" USRs={USRs} />}
            </div>
            <div className="right-content">
              <Heading className="title" as="h5">
                {!isFinish && 'Wait for voting'}
                {isFinish && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h5">
                Players:
              </Heading>
              {USRs?.map(usr => {
                return (
                  <VoteUser
                    className="border-line"
                    key={usr.user.id}
                    name={usr.user.name}
                    host={usr.user.id === usr.room.hostUserId}
                    vote={usr.storyPoint}
                    isFinish={isFinish}
                  />
                );
              })}
              <div className="action border-line">
                {!isFinish && (
                  <Button
                    variant="white"
                    type="button"
                    onClick={() => {
                      toast.show({
                        type: 'success',
                        title: 'Success!',
                        content: 'Show all votes',
                        lifeTime: 3000
                      });
                      toggleIsFinish();
                    }}
                  >
                    Finish
                  </Button>
                )}
                {isFinish && (
                  <Button variant="white" type="button" onClick={toggleIsFinish}>
                    New Story
                  </Button>
                )}
              </div>
              <ModalStory open={open} setOpen={setOpen} dataRoom={dataRoom} setUSRs={setUSRs} />
              <div className="sharing">
                <Heading as="h5">Invite a teammate</Heading>
                <div className="share-link">
                  <Input defaultValue={window.location.href} ref={inputLink} readOnly />
                  <button
                    className="copy-btn"
                    onClick={() => {
                      toast.show({
                        type: 'success',
                        title: 'Success!',
                        content: 'Copy success',
                        lifeTime: 3000
                      });
                      handleCopy();
                    }}
                  >
                    Copy
                    {/* <Icon className="abc-copy text-black/[0.2]" size={16} /> */}
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
