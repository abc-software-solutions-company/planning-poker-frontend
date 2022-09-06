import {FC, useEffect, useRef, useState} from 'react';

import VoteCard from '@/components/voting/cards';
import ModalStory from '@/components/voting/modal-story';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {IRoomResponse} from '@/data/client/room.client';
import {FIBONACCI} from '@/utils/constant';

import useVoting from './hook';
import style from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  data: IRoomResponse;
}
const VoteRoom: FC<IProps> = ({data}) => {
  const [room, setRoom] = useState<IRoomResponse>(data);
  const {story, selectedPoker, isFinish, intialRoom, handleCopy, handleFinish, handleNewUser, handleSelectPoker} =
    useVoting({
      room,
      setRoom
    });
  console.log('🚀 ~ file: index.tsx ~ line 25 ~ room', room);
  const [openModal, setOpenModal] = useState<boolean>(!Boolean(story));

  const inputLink = useRef<HTMLInputElement>(null);

  useEffect(() => {
    intialRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setOpenModal(!Boolean(story));
    handleNewUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return (
    <>
      <div className={style['section-vote-room']}>
        <div className="container">
          <Heading className="setRoom-name" as="h5">
            {data.name}
          </Heading>
          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <Heading as="h5">{story?.name || 'Story name'}</Heading>
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
              {isFinish && (
                <Chart
                  className="chart-holder"
                  voted={room.acts.map(
                    atc => atc.user.results.filter(result => result.storyId === story?.id)[0].votePoint || null
                  )}
                />
              )}
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
                {room.acts
                  ?.sort(a => (a.userId !== room.hostUserId ? 1 : -1))
                  .map(act => {
                    return (
                      <VoteUser
                        className="border-line"
                        key={act.userId}
                        name={act.user.name}
                        host={act.userId === room.hostUserId}
                        vote={act.user.results.filter(result => result.storyId === story?.id)[0]?.votePoint}
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
              <ModalStory open={openModal} setOpen={setOpenModal} room={room} setRoom={setRoom} />
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
