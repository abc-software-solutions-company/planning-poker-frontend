import {yupResolver} from '@hookform/resolvers/yup';
import {Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {io} from 'socket.io-client';
import * as yup from 'yup';

import {IRoomResponse} from '@/data/client/room.client';
import {createStory} from '@/data/client/story.client';

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

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3334');

export default function useModalStory({room, setRoom}: IHookParams) {
  const {toast} = useVoting({room, setRoom});

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
    createStory({roomId: room.id, name}).then(async res => {
      if (res.status === 201) {
        socket.emit('update');
        reset();
        toast.show({
          type: 'success',
          title: 'Success!',
          content: 'Create success story',
          lifeTime: 3000
        });
      }
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  return {errors, register, handleSubmit, onSubmit};
}
