import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {IRoomResponse} from '@/data/client/room.client';
import {createStory} from '@/data/client/story.client';

import useVoting from '../hook';

interface IFormInputs {
  name: string;
}
interface IHookParams {
  room: IRoomResponse;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}
export default function useModalStory({room, setRoom}: IHookParams) {
  const router = useRouter();

  const {updateRoom} = useVoting({room, setRoom});

  const Schema = yup.object().shape({
    name: yup.string().required('Please fill in story name').max(256, 'Story name must not exceed 256 letters')
  });

  const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const handleOnSubmit = async ({name}: IFormInputs) => {
    createStory({roomId: room.id, name}).then(res => {
      if (res.status === 201) {
        updateRoom();
      }
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  return {router, errors, register, handleSubmit, onSubmit};
}
