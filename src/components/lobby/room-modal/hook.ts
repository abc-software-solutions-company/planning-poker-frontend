import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {Tracking} from '@/components/common/third-party/tracking';
import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IRoomCreate} from '@/data/api/types/room.type';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter room name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useRoomModal({setOpenModal}: IProps) {
  const [disabled, setDisable] = useState(false);
  const auth = useStateAuth();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IRoomCreate>({
    defaultValues: {name: 'untitled'},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IRoomCreate> = data => {
    setDisable(true);
    Tracking.event({name: 'Submit Create Room form', properties: {auth, submitData: data}});
    api.room.create(data).then(res => {
      if (res.status === 201) {
        Tracking.event({name: 'Create Room - success', properties: {auth, res}});
        setOpenModal(false);
        reset();
        toast.show({
          type: 'success',
          title: 'Success!',
          content: 'Create success room'
        });
        router.push(`${ROUTES.ROOM}${res.data.id}`);
      } else Tracking.event({name: 'Create Room - fail', properties: {auth, res}});

      setDisable(false);
    });
  };

  return {errors, disabled, register, onSubmit: handleSubmit(submitHandler)};
}
