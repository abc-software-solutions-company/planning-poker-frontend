import {FC, useRef, useState} from 'react';

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

  const {
    auth,
    story,
    dataVoted,
    openModal,
    isHost,
    handleCopy,
    setOpenModal,
    handleComplete,
    handleNewStory,
    handleSelectPoker
  } = useVoting({room, setRoom});

  const inputLink = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={style['section-vote-room']}>
        <div className="container">
          <div className="topbar">
            <Icon className="abc-user" size={24} />
            <p className="user-name">{auth && auth.name}</p>
          </div>
          <Heading className="setRoom-name" as="h5">
            {data.name}
          </Heading>
          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <Heading as="h5">{story?.name || 'Story name'}</Heading>
                <button onClick={() => handleNewStory()}>
                  <Icon className="abc-edit" size={28} />
                </button>
              </div>
              {auth && (story === null || story.avgPoint === null) && (
                <div className="card-holder">
                  {FIBONACCI.map(num => {
                    return (
                      <VoteCard
                        key={num}
                        className={
                          num === story?.results.filter(r => r.userId === auth.id)[0]?.votePoint ? 'selected' : ''
                        }
                        value={num}
                        onClick={() => handleSelectPoker(num)}
                      />
                    );
                  })}
                </div>
              )}
              {auth && story && story.avgPoint !== null && dataVoted && (
                <Chart className="chart-holder" voted={dataVoted} />
              )}
            </div>
            <div className="right-content">
              <Heading className="title" as="h6">
                {auth && (story === null || story.avgPoint === null) && 'Wait for voting'}
                {auth && story && story.avgPoint !== null && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                Players:
              </Heading>
              <div className="voter-list border-line">
                {auth &&
                  room.acts
                    ?.sort(a => (a.userId !== room.hostUserId ? 1 : -1))
                    .map(act => {
                      return (
                        <VoteUser
                          className="border-line"
                          key={act.userId}
                          name={act.user.name}
                          host={act.userId === room.hostUserId}
                          vote={act.user.results.filter(result => result.storyId === story?.id)[0]?.votePoint}
                          isCompleted={Boolean(auth && story && story.avgPoint !== null)}
                        />
                      );
                    })}
              </div>
              {isHost() && (
                <div className="action border-line">
                  {auth && (story === null || story.avgPoint === null) && (
                    <Button variant="white" type="button" onClick={handleComplete}>
                      Finish
                    </Button>
                  )}
                  {auth && story && story.avgPoint !== null && (
                    <Button variant="white" type="button" onClick={handleNewStory}>
                      New Story
                    </Button>
                  )}
                </div>
              )}
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
