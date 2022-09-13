import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
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
  const title = story && story.avgPoint === null ? 'Update' : 'Create New';

  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">{title} Story</Heading>
              <div className="input-button">
                <div className="input-name">
                  <Input className={errors.name && 'error'} placeholder="Enter story" {...register('name')} />
                  {errors.name && <p className="error-validate">{errors.name.message}</p>}
                </div>
                <div className="button">
                  <Button variant="white" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{title}</Button>
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
