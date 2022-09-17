import cn from 'classnames';

import Icon from '@/core-ui/icon';
import {CHARTCOLORS} from '@/utils/constant';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  votePoint?: number | null;
  isCompleted: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, votePoint, host, isCompleted = false}) => {
  let color = '#000000';
  if (votePoint && isCompleted) color = CHARTCOLORS[votePoint];

  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className={host ? 'text-red-400' : ''} name="ico-avatar" size={24} />
          <div className="name">
            {name} {host ? <span className="host">Host</span> : ''}
          </div>
        </div>
        {votePoint != null && !isCompleted && (
          <div className="voted">
            <Icon name="ico-checkmark" size={24} />
            <span>Voted</span>
          </div>
        )}
        {votePoint != null && isCompleted && (
          <span className="point" style={{color}}>
            {votePoint}
          </span>
        )}
      </div>
    </>
  );
};

export default VoteUser;
