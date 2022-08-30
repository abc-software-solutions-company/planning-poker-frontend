import cn from 'classnames';
import {HTMLProps} from 'react';

interface IProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  value: number;
}

const VoteCard: React.FC<IProps> = ({value, className, ...rest}) => {
  return (
    <div className={cn('card-item', className)} {...rest}>
      <div className="card-number">
        <button>{value}</button>
      </div>
    </div>
  );
};

export default VoteCard;
