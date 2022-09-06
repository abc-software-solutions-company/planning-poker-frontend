import {Modal} from '@mui/material';
import React from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';

import useModalStory from './hook';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalStory: React.FC<IProps> = ({open, setOpen}) => {
  const {router, errors, register, handleSubmit, onSubmit} = useModalStory();
  const onCancel = () => {
    setOpen(false);
    router.push(ROUTES.HOME);
  };
  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">Create New Story</Heading>
              <div className="input-button">
                <Input placeholder="Enter story" {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button variant="white" onClick={onCancel}>
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
