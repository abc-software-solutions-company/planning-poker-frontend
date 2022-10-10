import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import {useStateAuth} from '@/contexts/auth';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import useAuthModal from './hook';
import styles from './style.module.scss';

export interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AuthModal: FC<IProps> = props => {
  const auth = useStateAuth();
  console.log('🚀 ~ file: index.tsx ~ line 20 ~ auth', auth);
  const {openModal, setOpenModal} = props;
  const {errors, register, onSubmit, disabled} = useAuthModal(props);

  return (
    <>
      {openModal && (
        <Modal open={openModal}>
          <form className={styles['modal-create']} onSubmit={onSubmit}>
            <div className="container">
              <div className="content">
                <Icon className="x-circle" name="ico-x-circle" size={20} onClick={() => setOpenModal(false)} />
                <Heading as="h5">Update User Name</Heading>
                <div className="input-button">
                  <div className="input-name">
                    <div className="input-name">
                      <Input
                        error={errors.name?.message}
                        className={errors.name && 'error'}
                        placeholder="Enter user name"
                        autoFocus={true}
                        maxLength={33}
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
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    />
                    <Button
                      className="w-full"
                      variant="contained"
                      color="primary"
                      text="Update"
                      type="submit"
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AuthModal;
