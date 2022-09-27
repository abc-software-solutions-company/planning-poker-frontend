import cn from 'classnames';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  value: number;
  onClick?: () => void;
}

const VoteCard: React.FC<IProps> = ({value, className, ...rest}) => {
  return (
    <button className={cn(styles['vote-card'], styles[className + ''])} {...rest}>
      <span className="card-number">{value}</span>
    </button>
  );
};

export default VoteCard;
