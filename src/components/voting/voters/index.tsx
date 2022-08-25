import cn from 'classnames';
import Image from 'next/image';

// import LogoAvatar from '@/components/icons/avatar';
// import LogoCheckmark from '@/components/icons/checkmark';
import Avatar from '@/vendors/abc-icons/input/avatar.svg';
import Checkmark from '@/vendors/abc-icons/input/checkmark.svg';

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
          <Image src={Avatar} alt="Logo Avatar" host={host} />
          {/* <LogoAvatar host={host} /> */}
          <div className="name">{name}</div>
        </div>
        {/* {vote && <LogoCheckmark />} */}
        {vote && <Image src={Checkmark} alt="Logo Checkmark" />}
      </div>
    </>
  );
};

export default VoteUser;
