import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';

import useModelRoom from './hook';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalRoom: FC<IProps> = ({open, setOpen}) => {
  const toast = useToast();
  const {errors, register, handleSubmit, onSubmit} = useModelRoom({setOpen});
  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">Create New Room</Heading>
              <div className="input-button">
                <Input className={errors.name && 'error'} placeholder="Enter room name" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button variant="white" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={() =>
                      toast.show({
                        type: 'success',
                        title: 'Success!',
                        content: 'Create room success',
                        lifeTime: 3000
                      })
                    }
                  >
                    Create
                  </Button>
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
