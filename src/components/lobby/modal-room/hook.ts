import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth';
import {createRoom, ICreateRoom} from '@/data/client/room.client';

interface IFormInputs {
  name: string;
}

export default function useModelRoom() {
  const router = useRouter();
  const auth = useStateAuth();

  const Schema = yup.object().shape({
    name: yup.string().required('Please enter room name').max(256, 'Your name must not exceed 256 letters')
  });

  const FORM_DEFAULT_VALUES: IFormInputs = {
    name: ''
  };

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const handleOnSubmit = async ({name}: IFormInputs) => {
    if (auth) {
      const data: ICreateRoom = {name, hostUserId: auth.id};
      createRoom(data).then(res => {
        if (res.status === 201) {
          router.push(`${ROUTES.ROOM}${res.data.id}`);
        }
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data);
  };

  return {errors, register, handleSubmit, onSubmit};
}
