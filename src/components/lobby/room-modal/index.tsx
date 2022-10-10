import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import useRoomModal from './hook';
import styles from './style.module.scss';

export interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const RoomModal: FC<IProps> = props => {
  const {openModal, setOpenModal} = props;
  const {errors, register, onSubmit, disabled} = useRoomModal(props);
  return (
    <>
      {openModal && (
        <Modal open={openModal}>
          <form className={styles['modal-create']} onSubmit={onSubmit}>
            <div className="container">
              <div className="content">
                <Icon className="x-circle" name="ico-x-circle" size={20} onClick={() => setOpenModal(false)} />
                <Heading as="h5">Create New Room</Heading>
                <div className="input-button">
                  <div className="input-name">
                    <div className="input-name">
                      <Input
                        error={errors.name?.message}
                        className={errors.name && 'error'}
                        autoFocus={true}
                        placeholder="Enter room name"
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
                      onClick={() => setOpenModal(false)}
                    />
                    <Button
                      className="w-full"
                      variant="contained"
                      color="primary"
                      text="Create"
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

export default RoomModal;
