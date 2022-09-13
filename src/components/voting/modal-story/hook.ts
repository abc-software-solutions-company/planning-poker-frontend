import {yupResolver} from '@hookform/resolvers/yup';
import {Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {IRoomResponse} from '@/data/client/room.client';
import {createStory, updateStory} from '@/data/client/story.client';
import socket from '@/data/socket';

import useVoting from '../hook';

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in story name').max(256, 'Story name must not exceed 256 letters')
});

interface IFormInputs {
  name: string;
}
interface IHookParams {
  room: IRoomResponse;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}

const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

export default function useModalStory({room, setRoom}: IHookParams) {
  const {toast, story} = useVoting({room, setRoom});

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const handleOnSubmit = async ({name}: IFormInputs) => {
    if (story) {
      updateStory({id: story.id, name: name}).then(async res => {
        if (res.status === 200) {
          socket.emit('update', {roomId: room.id});
          reset();
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Update success story',
            lifeTime: 3000
          });
        }
      });
    } else {
      createStory({roomId: room.id, name}).then(async res => {
        if (res.status === 201) {
          socket.emit('update', {roomId: room.id});
          reset();
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Create success story',
            lifeTime: 3000
          });
        }
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  return {errors, register, handleSubmit, onSubmit, story};
}
