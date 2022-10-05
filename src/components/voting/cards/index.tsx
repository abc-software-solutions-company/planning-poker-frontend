import cn from 'classnames';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  name: string;
  onClick?: () => void;
}

const VoteCard: React.FC<IProps> = ({name, className, ...rest}) => {
  return (
    <button className={cn(styles['vote-card'], styles[className + ''])} {...rest}>
      <span className="card-number">{name}</span>
    </button>
  );
};

export default VoteCard;
