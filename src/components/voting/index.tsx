import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC, useRef} from 'react';

import VoteCard from '@/components/voting/cards';
import ModalStory from '@/components/voting/modal-story';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {FIBONACCI} from '@/utils/constant';

import Chart from './chart';
import useVoting from './hook';
import style from './style.module.scss';
import VoteUser from './voters';

export interface IVoteRoomProps {
  roomId: string;
}
const VoteRoom: FC<IVoteRoomProps> = ({roomId}) => {
  const router = useRouter();
  const {
    auth,
    openModal,
    roomData,
    votedData,
    isHost,
    isCompleted,
    onClickCopy,
    setOpenModal,
    onClickComplete,
    onClickNext,
    onSelectPoker
  } = useVoting({roomId});

  const inputLink = useRef<HTMLInputElement>(null);

  const numVotedUser =
    roomData?.users?.filter(({votePoint}) => votePoint !== undefined && votePoint !== null).length || 0;
  const numJoinUser = roomData?.users?.length || 0;

  return (
    <>
      <div className={style['section-vote-room']}>
        <div className="container">
          <div className="topbar">
            <div className="left">
              <button onClick={() => router.push(ROUTES.HOME)}>
                <Icon name="ico-arrow-left-circle" size={28} />
              </button>
              <p className="room-name">{roomData && roomData.name}</p>
            </div>
            <div className="right">
              <Icon name="ico-user" size={24} />
              <p className={cls('text')}>{auth && auth.name}</p>
            </div>
          </div>

          <div className="content">
            <div className="left-content">
              <div className="story-name">
                <p className={cls('name', roomData?.story && roomData.story.name.length >= 25 && 'break')}>
                  {roomData?.story?.name || 'Story name'}
                </p>
                {isHost && (
                  <button onClick={onClickNext}>
                    <Icon name="ico-edit" size={24} />
                  </button>
                )}
              </div>
              {!isCompleted && auth && (
                <div className="card-holder">
                  {roomData &&
                    FIBONACCI.map(num => {
                      return (
                        <VoteCard
                          key={num}
                          className={
                            num === roomData.users.filter(user => user.id === auth.id)[0]?.votePoint ? 'selected' : ''
                          }
                          value={num}
                          onClick={() => onSelectPoker(num)}
                        />
                      );
                    })}
                </div>
              )}
              {isCompleted && votedData && (
                <Chart
                  className="chart-holder"
                  votedData={votedData}
                  onClickNext={onClickNext}
                  showBtnNextStory={isCompleted && isHost}
                />
              )}
            </div>
            <div className="right-content">
              <Heading className="title" as="h6">
                {!isCompleted && 'Wait for voting'}
                {isCompleted && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                Voted players:{' '}
                {roomData && (
                  <span className="user-lenght">
                    {numVotedUser}/{numJoinUser}
                  </span>
                )}
              </Heading>
              <div className="voter-list border-line">
                {roomData?.users
                  ?.sort(user => (user.id === roomData.hostUserId ? -1 : 1))
                  .map(({id, name, votePoint}) => {
                    return (
                      <VoteUser
                        className="border-line"
                        key={id}
                        name={name}
                        host={id === roomData.hostUserId}
                        votePoint={votePoint}
                        isCompleted={isCompleted}
                      />
                    );
                  })}
              </div>
              {isHost && (
                <div className="action border-line">
                  {!isCompleted && (
                    <Button
                      className="w-full"
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={onClickComplete}
                    >
                      Complete
                    </Button>
                  )}
                  {isCompleted && (
                    <Button className="w-full" variant="contained" color="primary" type="button" onClick={onClickNext}>
                      Next Story
                    </Button>
                  )}
                </div>
              )}
              {openModal && <ModalStory {...{roomData, openModal, setOpenModal}} />}
              <div className="sharing">
                <Heading as="h6">Invite a teammate</Heading>
                <div className="share-link">
                  <Input className="input-link" value={window.location.href} ref={inputLink} readOnly />
                  <Button
                    className="copy-btn"
                    variant="contained"
                    color="primary"
                    onClick={() => onClickCopy(inputLink.current!.value)}
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
