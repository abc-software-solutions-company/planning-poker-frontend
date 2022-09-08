import cn from 'classnames';
import {useEffect, useState} from 'react';

import Icon from '@/core-ui/icon';

interface IProps {
  className?: string;
  name: string;
  host?: boolean;
  vote: number | null;
  color?: string;
  isComplete: boolean;
}

const VoteUser: React.FC<IProps> = ({name, className, host, vote, color, isComplete = false}) => {
  const [bgcolor, setBgcolor] = useState<string>('');

  const colors: {[index: number]: string} = {
    0: '#56CCF2',
    1: '#4F4F4F',
    2: '#FBE38E',
    3: '#FED0EE',
    5: '#BB6BD9',
    8: '#F2994A',
    13: '#D14F4F',
    21: '#3B8260'
  };

  useEffect(() => {
    if (vote || vote == 0) {
      setBgcolor(colors[vote]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  return (
    <>
      <div className={cn('player-status', className, vote != undefined && isComplete === true && `${bgcolor}`)}>
        <div className="player-info">
          <Icon className="abc-avatar" size={24} host={host} color={color} />
          <div className="name" style={{color: `${bgcolor}`}}>
            {name}
          </div>
        </div>
        {vote != undefined && !isComplete && (
          <div className="voted">
            <Icon className="abc-checkmark" size={20} />
            <p className="text">Voted</p>
          </div>
        )}
        <span style={{color: `${bgcolor}`}}>{vote != undefined && isComplete && vote}</span>
      </div>
    </>
  );
};

export default VoteUser;
