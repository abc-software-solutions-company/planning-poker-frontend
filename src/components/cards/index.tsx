import cn from 'classnames';
import {ReactNode} from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
  value: string;
  onClick?: () => void;
}

const VoteCard: React.FC<IProps> = ({children, className = '', value, onClick}) => {
  const handleValue = () => {
    console.log(value);
    onClick?.();
  };

  return (
    <>
      <div className={cn('card-item', className)}>
        <div className={cn('card-number')}>
          <button
            type="button"
            onClick={() => {
              handleValue();
            }}
            value={value}
          >
            {children}
          </button>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
