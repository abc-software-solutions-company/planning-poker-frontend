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

const VoteUser: React.FC<IProps> = ({name, className, vote, host, isCompleted = false}) => {
  let color = '#000000';
  if (vote && isCompleted) color = COLORVOTE[vote];
  console.log(host);
  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className={host ? 'text-red-400' : ''} name="ico-avatar" size={24} />
          <div className="name">
            {name} {host ? <span className="ml-1 rounded-lg bg-green-400 px-2 text-xs text-white">Host</span> : ''}
          </div>
        </div>
        {vote != undefined && !isCompleted && (
          <div className="voted">
            <Icon name="ico-checkmark" size={24} />
            <p className="text">Voted</p>
          </div>
        )}
        <span style={{color}}>{vote != undefined && isCompleted && vote}</span>
      </div>
    </>
  );
};

export default VoteUser;
