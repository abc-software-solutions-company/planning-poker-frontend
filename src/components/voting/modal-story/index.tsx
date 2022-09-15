import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {IRoomResponse} from '@/data/client/room.client';

import useModalStory from './hook';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  room: IRoomResponse;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}

const ModalStory: FC<IProps> = ({open, room, setOpen, setRoom}) => {
  const {story, errors, register, handleSubmit, onSubmit} = useModalStory({room, setRoom});
  const title = story && story.avgPoint === null ? 'Update' : 'Create';

  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Icon className="x-circle" name="ico-x-circle" size={20} onClick={() => setOpen(false)} />
              <Heading as="h5">{title} Story</Heading>
              <div className="input-button">
                <div className="input-name">
                  <Input
                    error={errors.name?.message}
                    className={errors.name && 'error'}
                    placeholder="Enter story"
                    {...register('name')}
                  />
                </div>
                <div className="action">
                  <Button
                    className="w-full"
                    variant="outlined"
                    color="primary"
                    text="Cancel"
                    onClick={() => setOpen(false)}
                  />
                  <Button className="w-full" variant="contained" color="primary" text={title} type="submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalStory;
