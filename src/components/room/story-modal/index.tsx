import {Modal} from '@mui/material';
import {FC} from 'react';

import Button from '@/core-ui/button';
import DropdownBtn from '@/core-ui/dropdownBtn';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {StoryTypes} from '@/utils/constant';

import useStoryModal from './hook';
import style from './style.module.scss';

export interface IProps {
  openModal: boolean;
  setOpenModal: (param: boolean) => void;
}
const StoryModal: FC<IProps> = props => {
  const {openModal, setOpenModal} = props;
  const {roomData, setValue, errors, register, handleOnSubmit, disabled} = useStoryModal(props);
  const onClick = () => {
    setValue('name', roomData?.story?.name || '');
    setOpenModal(false);
  };
  const titlePrefix = roomData?.story?.avgPoint === null ? 'Update' : 'Create New';
  const btnText = roomData?.story?.avgPoint === null ? 'Update' : 'Create';

  return (
    <>
      {openModal && (
        <Modal open={openModal}>
          <form className={style['modal-create']} onSubmit={handleOnSubmit}>
            <div className="container">
              <div className="content">
                <Icon className="x-circle" name="ico-x-circle" size={20} onClick={onClick} />
                <Heading as="h5">{titlePrefix} Story</Heading>
                <div className="input-button">
                  <div className="input-name">
                    <Input
                      error={errors.name?.message}
                      className={errors.name && 'error'}
                      placeholder="Enter story"
                      {...register('name')}
                    />
                  </div>
                  {titlePrefix !== 'Update' && (
                    <DropdownBtn
                      {...register('type')}
                      className="input-type"
                      defaultValue={'Fibonacci'}
                      items={Object.keys(StoryTypes)}
                    />
                  )}
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
                      text={btnText}
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

export default StoryModal;
