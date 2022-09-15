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
  let lenVotedUser = 0;

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
  console.log(window.location.href);

  if (dataVoted) {
    lenVotedUser = dataVoted.filter(v => v !== null).length;
    console.log(lenVotedUser);
  }

  return (
    <>
      <div className={style['section-vote-room']}>
        <div className="container">
          <div className="topbar">
            <div className="left">
              <button onClick={() => router.push(ROUTES.HOME)}>
                <Icon name="ico-arrow-left-circle" size={28} />
              </button>
              <p className="room-name">{room.name}</p>
            </div>
            <div className="right">
              <Icon name="ico-user" size={24} />
              <p className={cls('text')}>{auth && auth.name}</p>
            </div>
          </div>

          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <p className={cls('name', story && story?.name.length >= 25 && 'break')}>
                  {story?.name || 'Story name'}
                </p>
                {isHost() && (
                  <button onClick={() => handleNewStory()}>
                    <Icon name="ico-edit" size={24} />
                  </button>
                )}
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
                {auth && story && story.avgPoint !== null && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                Voted players:{' '}
                <span className="user-lenght">
                  {lenVotedUser}/{room.userRooms.length}
                </span>
              </Heading>
              <div className={cls('voter-list border-line', room.userRooms.length >= 5 ? 'h-[285px]' : '')}>
                {auth &&
                  room.userRooms
                    ?.sort(a => (a.userId !== room.hostUserId ? 1 : -1))
                    .map(ur => {
                      const vote = ur.user.userStories.filter(us => us.storyId === story?.id)[0]?.votePoint;
                      return (
                        <VoteUser
                          className="border-line"
                          key={ur.userId}
                          name={ur.user.name}
                          host={ur.userId === room.hostUserId}
                          vote={vote !== undefined ? vote : null}
                          isCompleted={Boolean(auth && story && story.avgPoint !== null)}
                        />
                      );
                    })}
              </div>
              {isHost() && (
                <div className="action border-line">
                  {auth && (story === null || story.avgPoint === null) && (
                    <Button
                      className="w-full"
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={handleComplete}
                    >
                      Finish
                    </Button>
                  )}
                  {auth && story && story.avgPoint !== null && (
                    <Button
                      className="w-full"
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={handleNewStory}
                    >
                      Next
                    </Button>
                  )}
                </div>
              )}
              <ModalStory open={openModal} setOpen={setOpenModal} room={room} setRoom={setRoom} />
              <div className="sharing">
                <Heading as="h6">Invite a teammate</Heading>
                <div className="share-link">
                  <Input className="input-link" value={window.location.href} ref={inputLink} readOnly />
                  <Button
                    className="copy-btn"
                    variant="contained"
                    color="primary"
                    onClick={() => handleCopy(inputLink.current!.value)}
                  >
                    <Icon name="ico-copy" />
                  </Button>
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
