import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
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
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <div className="input-name">
                  <Input className={errors.name && 'error'} placeholder="Enter room name" {...register('name')} />
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

export default ModalRoom;
