import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IRoomCreate} from '@/data/api/types/room.type';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter room name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useRoomModal({setOpenModal}: IProps) {
  const [disabled, setDisable] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IRoomCreate>({
    defaultValues: {name: ''},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IRoomCreate> = data => {
    setDisable(true);
    api.room.create(data).then(res => {
      if (res.status === 201) {
        setOpenModal(false);
        reset();
        toast.show({
          type: 'success',
          title: 'Success!',
          content: 'Create success room'
        });
        router.push(`${ROUTES.ROOM}${res.data.id}`);
      }
      setDisable(false);
    });
  };

  return {errors, register, handleSubmit, onSubmit, disabled};
}
