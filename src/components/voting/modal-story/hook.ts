import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import api from '@/data/api';
import {socketToast, socketUpdateRoom} from '@/data/socket';
import useRoom from '@/hooks/useRoom';
import {StoryTypes} from '@/utils/constant';

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in story name').max(256, 'Story name must not exceed 256 letters').trim()
});

interface IFormInputs {
  name: string;
  type: keyof typeof StoryTypes;
}

const FORM_DEFAULT_VALUES: IFormInputs = {name: '', type: 'Fibonacci'};

export default function useModalStory() {
  const {roomData, setStoryType, openModal, setOpenModal} = useRoom();
  const [disabled, setDisable] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: {errors, dirtyFields}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = ({name, type}) => {
    setDisable(true);
    if (roomData) {
      if (roomData.story?.avgPoint === null) {
        api.story.update({id: roomData.story.id, name: name}).then(res => {
          if (res.status === 200) {
            socketUpdateRoom();
            reset();
            setOpenModal(false);
            socketToast({
              type: 'success',
              title: 'Success!',
              content: 'Update success story'
            });
          }
          setDisable(false);
        });
      } else {
        api.story.create({name, roomId: roomData.id, type}).then(res => {
          if (res.status === 201) {
            socketUpdateRoom();
            reset();
            setOpenModal(false);
            socketToast({
              type: 'success',
              title: 'Success!',
              content: 'Create success story'
            });
          }
          setDisable(false);
        });
      }
    }
  };

  useEffect(() => {
    setValue('name', roomData?.story && roomData.story.avgPoint === null ? roomData.story.name : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    const {type} = getValues();
    if (!roomData?.story?.type) setStoryType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields.type]);

  return {roomData, openModal, setOpenModal, errors, register, handleSubmit, onSubmit, disabled};
}
