import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import Card from '@/components/voting/card';
import ModalStory from '@/components/voting/modal-story';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {ChartColors, StoryTypes} from '@/utils/constant';

import Chart from './chart';
import useVoting from './hooks';
import style from './style.module.scss';
import Voter from './voter';

export interface IVoteRoomProps {
  roomId: string;
}

const VoteRoom: FC<IVoteRoomProps> = ({roomId}) => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const {
    auth,
    openModal,
    roomData,
    chartData,
    isHost,
    disableBtn,
    storyType,
    isCompleted,
    onClickCopy,
    onClickComplete,
    onClickNext,
    onSelectPoker
  } = useVoting({roomId});

  const numVotedUser = roomData?.users?.filter(({votePoint}) => votePoint || votePoint === 0).length || 0;
  const numJoinUser = roomData?.users?.length || 0;
  const votedInfo = `${numVotedUser}/${numJoinUser}`;

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

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
                <p className="name">{roomData?.story?.name || 'Story name'}</p>
                {isHost && !isCompleted && (
                  <button className="btn-edit" onClick={onClickNext}>
                    <Icon name="ico-edit" size={24} />
                  </button>
                )}
              </div>
              {!isCompleted && auth && (
                <div className="card-holder">
                  {roomData &&
                    Object.keys(StoryTypes[storyType]).map(key => {
                      const value = Number(key);
                      const isSelected = value === roomData.users.filter(user => user.id === auth.id)[0]?.votePoint;
                      return (
                        <Card
                          key={value}
                          className={isSelected ? 'selected' : ''}
                          name={StoryTypes[storyType][value]}
                          onClick={() => {
                            if (!isSelected) onSelectPoker(value);
                          }}
                        />
                      );
                    })}
                </div>
              )}
              {isCompleted && chartData && (
                <Chart
                  className="chart-holder"
                  onClickNext={onClickNext}
                  chartData={chartData}
                  showBtnNextStory={isCompleted && isHost}
                  votedInfo={votedInfo}
                />
              )}
            </div>
            <div className="right-content">
              <Heading className="title" as="h6">
                {!isCompleted && 'Wait for voting'}
                {isCompleted && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h6">
                Voted players: {roomData && <span className="user-lenght">{votedInfo}</span>}
              </Heading>
              <div className="voter-list border-line scrollbar">
                {roomData?.users.map(({id, name, votePoint, isOnline}) => {
                  const isVoted = votePoint || votePoint === 0;
                  return (
                    <Voter
                      className="border-line"
                      key={id}
                      name={name}
                      host={id === roomData.hostUserId}
                      isOnline={isOnline}
                      voteCard={isVoted ? StoryTypes[storyType][votePoint] : undefined}
                      colorCard={
                        isVoted ? ChartColors[Object.keys(StoryTypes[storyType]).indexOf(String(votePoint))] : undefined
                      }
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
                      disabled={disableBtn}
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
              {openModal && <ModalStory />}
              <div className="invite-link">
                <Heading as="h6">Invite a teammate</Heading>
                <div className="share-link">
                  <Input className="input-link" value={url} readOnly />
                  <Button className="copy-btn" variant="contained" color="primary" onClick={() => onClickCopy(url)}>
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
