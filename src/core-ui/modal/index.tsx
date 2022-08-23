import {Modal} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {ICreateRoom, ICreateStory} from '@/types';

// import InputText from '@/core-ui/input-text';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  title: string;
  onClose: () => void;
  placeholder: string;
  handleOnSubmit?: (data: ICreateRoom | ICreateStory) => void;
}

const ModalCreate: React.FC<IProps> = ({open, onClose, title, placeholder, handleOnSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <form
          className={styles['modal-create']}
          onSubmit={handleSubmit(data => {
            console.log(data);
          })}
        >
          <div className="container">
            <div className="content">
              <Heading as="h5">{title}</Heading>
              <div className="input-button">
                <input className="form-input" placeholder={placeholder} {...register('name')} />
                <div className="button">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button>Create</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalCreate;
