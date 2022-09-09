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
  setOpen: Dispatch<SetStateAction<boolean>>;
  room: IRoomResponse;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}

const ModalStory: FC<IProps> = ({open, setOpen, room, setRoom}) => {
  const {errors, register, handleSubmit, onSubmit} = useModalStory({room, setRoom});
  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">Create New Story</Heading>
              <div className="input-button">
                <div className="input-name">
                  <Input className={errors.name && 'error'} placeholder="Enter story" {...register('name')} />
                  {errors.name && <p className="error-validate">{errors.name.message}</p>}
                </div>
                <div className="button">
                  <Button variant="white" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
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
