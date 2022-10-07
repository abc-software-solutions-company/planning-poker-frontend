import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useRoom from '@/hooks/useRoom';

import style from './style.module.scss';

interface Iprops {
  className?: string;
  onNext: () => void;
  showEditBtn?: boolean;
}

const StoryTitle: FC<Iprops> = ({className, onNext, showEditBtn}) => {
  const {roomData} = useRoom();
  return (
    <div className={classNames(style['story-title'], className)}>
      <p className="name">{roomData?.story?.name || 'Story name'}</p>
      {showEditBtn && (
        <button className="btn-edit" onClick={onNext}>
          <Icon name="ico-edit" size={24} />
        </button>
      )}
    </div>
  );
};

export default StoryTitle;
