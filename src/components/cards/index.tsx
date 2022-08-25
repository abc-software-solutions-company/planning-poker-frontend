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
          <span>{children}</span>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
