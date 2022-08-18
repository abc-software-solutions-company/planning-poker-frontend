import cn from 'classnames';

import LogoAvatar from '@/components/icons/avatar';
import LogoCheckmark from '@/components/icons/checkmark';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote?: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, host, vote}) => {
  return (
    <>
      <div className={cn('player-status', className)}>
        <div className="player-info">
          <LogoAvatar host={host} />
          <div className="name">{name}</div>
        </div>
        {vote && <LogoCheckmark />}
      </div>
    </>
  );
};

export default VoteUser;
