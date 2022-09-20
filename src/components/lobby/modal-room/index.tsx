import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import useModelRoom from './hook';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalRoom: FC<IProps> = ({open, setOpen}) => {
  const {errors, register, handleSubmit, onSubmit} = useModelRoom({setOpen});
  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Icon className="x-circle" name="ico-x-circle" size={20} onClick={() => setOpen(false)} />
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <div className="input-name">
                  <div className="input-name">
                    <Input
                      error={errors.name?.message}
                      className={errors.name && 'error'}
                      placeholder="Enter room name"
                      {...register('name')}
                    />
                  </div>
                </div>
                <div className="action">
                  <Button
                    className="w-full"
                    variant="outlined"
                    color="primary"
                    text="Cancel"
                    onClick={() => setOpen(false)}
                  />
                  <Button className="w-full" variant="contained" color="primary" text="Create" type="submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalRoom;
