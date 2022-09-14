import cn from 'classnames';

import Icon from '@/core-ui/icon';
import {CHARTCOLORS} from '@/utils/constant';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote?: number | null;
  isCompleted: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, vote, host, isCompleted = false}) => {
  let color = '#000000';
  if (vote && isCompleted) color = CHARTCOLORS[vote];

  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className={host ? 'text-red-400' : ''} name="ico-avatar" size={24} />
          <div className="name">
            {name} {host ? <span className="host">Host</span> : ''}
          </div>
        </div>
        {vote != null && !isCompleted && (
          <div className="voted">
            <Icon name="ico-checkmark" size={24} />
            <span>Voted</span>
          </div>
        )}
        {vote != null && isCompleted && (
          <span className="point" style={{color}}>
            {vote}
          </span>
        )}
      </div>
    </>
  );
};

export default VoteUser;
