import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC, useRef, useState} from 'react';

import VoteCard from '@/components/voting/cards';
import ModalStory from '@/components/voting/modal-story';
import {ROUTES} from '@/configs/routes.config';
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
  const router = useRouter();
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
            <button className="left" onClick={() => router.push(ROUTES.HOME)}>
              {' '}
              <Icon className="abc-arrow-left-circle" size={28} />
              <p className="text">Back</p>
            </button>
            <div className="right">
              <Icon className="abc-user" size={28} />
              <p className={cls('text', auth.name.length >= 12 ? 'user-name' : '')}>{auth && auth.name}</p>
            </div>
          </div>
          <Heading className="setRoom-name" as="h5">
            {data.name}
          </Heading>
          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <Heading as="h5" className={story?.name.length >= 25 ? 'break' : ''}>
                  {story?.name || 'Story name'}
                </Heading>
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
                          num === story?.userStories.filter(r => r.userId === auth.id)[0]?.votePoint ? 'selected' : ''
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
                {auth && story && story.avgPoint !== null && 'UserStory'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                The player: <span className="user-lenght">{room.userRooms.length}</span>
              </Heading>
              <div className="voter-list border-line">
                {auth &&
                  room.userRooms
                    ?.sort(a => (a.userId !== room.hostUserId ? 1 : -1))
                    .map(ur => {
                      return (
                        <VoteUser
                          className="border-line"
                          key={ur.userId}
                          name={ur.user.name}
                          host={ur.userId === room.hostUserId}
                          vote={ur.user.userStories.filter(us => us.storyId === story?.id)[0]?.votePoint}
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
