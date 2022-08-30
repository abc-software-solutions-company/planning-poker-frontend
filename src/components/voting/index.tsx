import {getSession} from 'next-auth/react';
import React, {useEffect, useRef, useState} from 'react';

import ModalStory from '@/components/modal-stories';
import VoteCard from '@/components/voting/cards';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {createUSR, FinishStory, updateUSR} from '@/data/client/room.client';
import {IFullUSR, IRoom} from '@/types';
import {FIBONACCI} from '@/utils/constant';

import useVoting from './hooks';
import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataRoom: IRoom;
}
const VoteRoom: React.FC<IProps> = ({dataRoom}) => {
  const {id: roomId} = dataRoom;
  const [selectedPoker, setSelectedPoker] = useState<number>();
  const [USRs, setUSRs] = useState<IFullUSR[]>([]);
  console.log('🚀 ~ file: index.tsx ~ line 24 ~ USRs', USRs);
  const [isFinish, setIsFinish] = useState(false);
  const [open, setOpen] = React.useState(false);
  const inputLink = useRef<HTMLInputElement>(null);
  const {toast, handleCopy, updateRoom, checkRoom} = useVoting();

  const handleNewUser = async () => {
    if (USRs.length > 0) {
      const session = await getSession();
      if (session && !USRs.map(e => e.userId).includes(session.user.id)) {
        createUSR({userId: session.user.id, roomId, storyId: String(USRs?.[USRs.length - 1].storyId)}).then(res => {
          if (res.status === 201) {
            updateRoom({roomId, setUSRs});
          }
        });
      }
    }
  };

  const handleSelectPoker = async (value: number | null) => {
    const session = await getSession();
    if (selectedPoker === value) value = null;
    if (session && USRs !== []) {
      updateUSR({
        userId: session.user.id,
        roomId,
        storyId: String(USRs?.[USRs.length - 1].storyId),
        storyPoint: value
      }).then(res => {
        if (res.status === 200) {
          setSelectedPoker(res.data.storyPoint);
          updateRoom({roomId, setUSRs});
        }
      });
    }
  };

  const handleFinish = () => {
    if (!isFinish)
      FinishStory(String(USRs?.[USRs.length - 1].storyId)).then(res => {
        if (res.status === 200) {
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Show all votes',
            lifeTime: 3000
          });
        }
      });
    setIsFinish(!isFinish);
  };

  useEffect(() => {
    updateRoom({roomId, setUSRs});
    checkRoom({roomId, setOpen});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleNewUser();
  }, [USRs]);
  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <Heading className="room-name" as="h5">
            {dataRoom.name}
          </Heading>
          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <Heading as="h5">{USRs?.[0] ? USRs[0].story.name : 'Story name'}</Heading>
                <Icon className="abc-pen" size={32} />
              </div>
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
              <Heading className="title" as="h6">
                {!isFinish && 'Wait for voting'}
                {isFinish && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                Players:
              </Heading>
              <div className="voter-list border-line">
                {USRs?.sort(a => (a.userId !== a.room.hostUserId ? 1 : -1)).map(usr => {
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
              </div>
              <div className="action border-line">
                {!isFinish && (
                  <Button variant="white" type="button" onClick={handleFinish}>
                    Finish
                  </Button>
                )}
                {isFinish && (
                  <Button variant="white" type="button" onClick={handleFinish}>
                    New Story
                  </Button>
                )}
              </div>
              <ModalStory open={open} setOpen={setOpen} dataRoom={dataRoom} setUSRs={setUSRs} />
              <div className="sharing">
                <Heading as="h6">Invite a teammate</Heading>
                <div className="share-link">
                  <Input defaultValue={window.location.href} ref={inputLink} readOnly />
                  <button className="copy-btn" onClick={() => handleCopy(inputLink.current!.value)}>
                    Copy
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
