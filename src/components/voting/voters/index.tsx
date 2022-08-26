import cn from 'classnames';

import Icon from '@/core-ui/icon';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote?: boolean;
  color?: string;
}

const VoteUser: React.FC<IProps> = ({name, className, host, vote, color}) => {
  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <Icon className="abc-avatar" size={24} host={host} color={color} />
          <div className="name">{name}</div>
        </div>
        {vote && <Icon className="abc-checkmark text-abc-blue" size={24} />}
      </div>
    </>
  );
};

export default VoteUser;
