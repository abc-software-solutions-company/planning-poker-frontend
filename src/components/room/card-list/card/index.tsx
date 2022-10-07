import cn from 'classnames';

import style from './style.module.scss';

interface IProps {
  className?: string;
  name: string;
  onClick?: () => void;
}

const Card: React.FC<IProps> = ({name, className, onClick}) => {
  return (
    <button className={cn(style['vote-card'], className)} onClick={onClick}>
      <span className="card-number">{name}</span>
    </button>
  );
};

export default Card;
