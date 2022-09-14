import {Box, Modal} from '@mui/material';
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

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 576,
  bgcolor: '#f6fafe',
  boxShadow: 24,
  p: 4
};

const ModalRoom: FC<IProps> = ({open, setOpen}) => {
  const {errors, register, handleSubmit, onSubmit} = useModelRoom({setOpen});
  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
            <div className="content">
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <div className="input-name">
                  <div className="input-name">
                    <Input className={errors.name && 'error'} placeholder="Enter room name" {...register('name')} />
                    {errors.name && <p className="error-validate">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="button">
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
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalRoom;
