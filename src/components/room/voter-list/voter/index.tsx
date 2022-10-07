import cn from 'classnames';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  isOnline?: boolean;
  voteCard?: string;
  colorCard?: string;
  isCompleted?: boolean;
}

const Voter: React.FC<IProps> = ({name, className, voteCard, colorCard, host, isOnline, isCompleted}) => {
  return (
    <div className={cn(style.voter, className)}>
      <div className="player-info">
        <div className={cn('icon', isOnline ? 'online' : '')}>
          <Icon className={host ? 'text-red-400' : ''} name="ico-avatar" size={24} />
        </div>

        <div className="name">
          {name} {host ? <span className="host">Host</span> : ''}
        </div>
      </div>
      {voteCard && !isCompleted && (
        <div className="voted">
          <Icon name="ico-checkmark" size={24} />
          <span>Voted</span>
        </div>
      )}
      {voteCard && isCompleted && (
        <span className="point" style={{color: colorCard || '#000000'}}>
          {voteCard}
        </span>
      )}
    </div>
  );
};

export default Voter;
