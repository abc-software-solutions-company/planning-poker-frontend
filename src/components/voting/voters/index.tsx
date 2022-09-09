import cn from 'classnames';

import Icon from '@/core-ui/icon';
import {COLORVOTE} from '@/utils/constant';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote: number | null;
  isCompleted: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, host, vote, isCompleted = false}) => {
  let color = '#000000';
  if (vote && isCompleted) color = COLORVOTE[vote];

  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className="abc-avatar" size={24} host={host} />
          <div className="name" style={{color}}>
            {name}
          </div>
        </div>
        {vote != undefined && !isCompleted && (
          <div className="voted">
            <Icon className="abc-checkmark" size={20} />
            <p className="text">Voted</p>
          </div>
        )}
        <span style={{color}}>{vote != undefined && isCompleted && vote}</span>
      </div>
    </>
  );
};

export default VoteUser;
