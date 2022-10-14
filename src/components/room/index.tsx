import {FC} from 'react';

import StoryModal from '@/components/room/story-modal';
import {useStateAuth} from '@/contexts/auth';
import Heading from '@/core-ui/heading';
import useRoom from '@/hooks/useRoom';

import TopBar from '../top-bar';
import CardList from './card-list';
import Chart from './chart';
import useVoting from './hooks';
import HostAction from './host-action';
import InviteLink from './invite-link';
import StoryTitle from './story-title';
import style from './style.module.scss';
import VoterList from './voter-list';

export interface IVoteRoomProps {
  roomId: string;
}

const VoteRoom: FC<IVoteRoomProps> = ({roomId}) => {
  const auth = useStateAuth();
  const {openModal, storyType, roomData, setOpenModal} = useRoom();
  const {chartData, isHost, disableAction, onComplete, onNext, onSelectPoker, onClickUpdateStory} = useVoting({roomId});
  const isCompleted = roomData?.story && roomData.story.avgPoint !== null;
  const numVotedUser = roomData?.users?.filter(({votePoint}) => votePoint || votePoint === 0).length || 0;
  const numJoinUser = roomData?.users?.length || 0;
  const voteInfo = `${numVotedUser}/${numJoinUser}`;
  const title = isCompleted ? 'Result' : 'Wait for voting';
  const displayHolder = () => {
    if (isCompleted) return <Chart {...{onNext, chartData, voteInfo, showBtnNextStory: isCompleted && isHost}} />;
    return <CardList {...{onSelectPoker}} />;
  };

  return (
    <div className={style['section-vote-room']}>
      <div className="container">
        <TopBar showBackBtn={true} roomName={roomData?.name} authName={auth?.name} />
        <div className="content">
          <div className="left-content">
            <StoryTitle {...{onClick: onClickUpdateStory, showEditBtn: isHost && !isCompleted}} />
            {displayHolder()}
          </div>
          <div className="right-content">
            <Heading className="title" as="h6">
              {title}
            </Heading>
            <Heading className="sub-title border-line" as="h6">
              Voted players: {<span className="vote-info">{voteInfo}</span>}
            </Heading>
            <VoterList className="border-line scrollbar" {...{roomData, storyType, isCompleted}} />
            <HostAction className="border-line" {...{isCompleted, onNext, onComplete, disableAction, show: isHost}} />
            <StoryModal {...{openModal, setOpenModal}} />
            <InviteLink linkValue={typeof window !== 'undefined' ? window.location.href : ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteRoom;
