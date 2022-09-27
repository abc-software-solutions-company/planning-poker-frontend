import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import api from '@/data/api';
import {socketToast, socketUpdateRoom} from '@/data/socket';

import {IModalStoryProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in story name').max(256, 'Story name must not exceed 256 letters').trim()
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

export default function useModalStory(props: IModalStoryProps) {
  const {roomData, setOpenModal} = props;
  const [disabled, setDisable] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = ({name}) => {
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
        api.story.create({name, roomId: roomData.id}).then(res => {
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

  return {errors, register, handleSubmit, onSubmit, disabled};
}
