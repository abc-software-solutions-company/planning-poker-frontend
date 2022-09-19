import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {socketUpdateRoom} from '@/data/socket';

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
  const toast = useToast();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const handleOnSubmit = async ({name}: IFormInputs) => {
    if (roomData) {
      if (roomData.story?.avgPoint === null) {
        api.story.update({id: roomData.story.id, name: name}).then(async res => {
          if (res.status === 200) {
            socketUpdateRoom({roomId: roomData.id});
            reset();
            setOpenModal(false);
            toast.show({
              type: 'success',
              title: 'Success!',
              content: 'Update success story',
              lifeTime: 3000
            });
          }
        });
      } else {
        api.story.create({name, roomId: roomData.id}).then(async res => {
          if (res.status === 201) {
            socketUpdateRoom({roomId: roomData.id});
            reset();
            setOpenModal(false);
            toast.show({
              type: 'success',
              title: 'Success!',
              content: 'Create success story',
              lifeTime: 3000
            });
          }
        });
      }
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  useEffect(() => {
    setValue('name', roomData?.story && roomData.story.avgPoint === null ? roomData.story.name : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  return {errors, register, handleSubmit, onSubmit};
}
