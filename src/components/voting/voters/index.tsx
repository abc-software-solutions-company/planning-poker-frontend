import cn from 'classnames';

import Icon from '@/core-ui/icon';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote?: number;
  color?: string;
  isFinish: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, host, vote, color, isFinish = false}) => {
  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className="abc-avatar" size={24} host={host} color={color} />
          <div className="name">{name}</div>
        </div>
        {vote != undefined && isFinish === false && <Icon className="abc-checkmark text-abc-blue" size={24} />}
        {vote != undefined && isFinish === true && vote}
      </div>
    </>
  );
};

export default VoteUser;
