import cn from 'classnames';
import {ReactNode} from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
}

const VoteCard: React.FC<IProps> = ({children, className = ''}) => {
  return (
    <>
      <div className={cn('card-item', className)}>
        <div className="card-number">
          <button>{children}</button>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
