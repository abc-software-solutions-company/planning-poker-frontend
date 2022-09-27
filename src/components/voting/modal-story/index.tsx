import {Modal} from '@mui/material';
import {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {IRoomFullResponse} from '@/data/api/types/room.type';

import useModalStory from './hook';
import styles from './style.module.scss';

export interface IModalStoryProps {
  roomData?: IRoomFullResponse;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ModalStory: FC<IModalStoryProps> = props => {
  const {roomData, openModal, setOpenModal} = props;
  const {errors, register, handleSubmit, onSubmit, disabled} = useModalStory(props);
  const title = roomData?.story?.avgPoint === null ? 'Update' : 'Create New';
  const textButton = roomData?.story?.avgPoint === null ? 'Update' : 'Create';

  return (
    <>
      <Modal open={openModal}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Icon className="x-circle" name="ico-x-circle" size={20} onClick={() => setOpenModal(false)} />
              <Heading as="h5">{title} Story</Heading>
              <div className="input-button">
                <div className="input-name">
                  <Input
                    error={errors.name?.message}
                    className={errors.name && 'error'}
                    placeholder="Enter story"
                    {...register('name')}
                  />
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
                    text={textButton}
                    type="submit"
                    disabled={disabled}
                  />
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
