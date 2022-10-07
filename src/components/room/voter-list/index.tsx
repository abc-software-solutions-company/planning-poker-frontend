import classNames from 'classnames';
import {FC} from 'react';

import {IRoomFullResponse} from '@/data/api/types/room.type';
import {ChartColors, StoryTypes} from '@/utils/constant';

import style from './style.module.scss';
import Voter from './voter';

interface Iprops {
  className?: string;
  roomData?: IRoomFullResponse;
  storyType: keyof typeof StoryTypes;
  isCompleted?: boolean;
}

const VoterList: FC<Iprops> = ({className, roomData, storyType, isCompleted}) => {
  return (
    <div className={classNames(style['voter-list'], 'border-line scrollbar', className)}>
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
            colorCard={isVoted ? ChartColors[Object.keys(StoryTypes[storyType]).indexOf(String(votePoint))] : undefined}
            isCompleted={isCompleted}
          />
        );
      })}
    </div>
  );
};

export default VoterList;
