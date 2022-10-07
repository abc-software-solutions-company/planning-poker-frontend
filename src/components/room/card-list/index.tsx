import classNames from 'classnames';

import {useStateAuth} from '@/contexts/auth';
import useRoom from '@/hooks/useRoom';
import {StoryTypes} from '@/utils/constant';

import Card from './card';
import style from './style.module.scss';

interface IProps {
  className?: string;
  onSelectPoker: (value: number) => Promise<void>;
}

const CardList: React.FC<IProps> = ({className, onSelectPoker}) => {
  const {storyType, roomData} = useRoom();
  const auth = useStateAuth();

  return (
    <div className={classNames(style['card-holder'], className)}>
      {roomData &&
        auth &&
        Object.keys(StoryTypes[storyType]).map(key => {
          const value = Number(key);
          const isSelected = value === roomData.users.filter(user => user.id === auth.id)[0]?.votePoint;
          return (
            <Card
              key={value}
              className={classNames('vote-card', isSelected ? ' selected' : '')}
              name={StoryTypes[storyType][value]}
              onClick={() => {
                if (!isSelected) onSelectPoker(value);
              }}
            />
          );
        })}
    </div>
  );
};

export default CardList;
