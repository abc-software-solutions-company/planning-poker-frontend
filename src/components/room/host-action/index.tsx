import classNames from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';

import style from './style.module.scss';

interface Iprops {
  className?: string;
  show?: boolean;
  isCompleted?: boolean;
  onComplete: () => void;
  onNext: () => void;
  disableAction: boolean;
}

const HostAction: FC<Iprops> = ({className, isCompleted, onComplete, onNext, disableAction, show}) => {
  return (
    <>
      {show && (
        <div className={classNames(style.action, 'border-line', className)}>
          {!isCompleted && (
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              type="button"
              onClick={onComplete}
              disabled={disableAction}
            >
              Complete
            </Button>
          )}
          {isCompleted && (
            <Button className="w-full" variant="contained" color="primary" type="button" onClick={onNext}>
              Next Story
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default HostAction;
