import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IRoomCreate} from '@/data/types/room.type';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter room name').max(256, 'Your name must not exceed 256 letters')
});
interface IFormInputs {
  name: string;
}
const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

interface IHookParams {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function useModelRoom({setOpen}: IHookParams) {
  const router = useRouter();
  const auth = useStateAuth();
  const toast = useToast();

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
    if (auth) {
      const data: IRoomCreate = {name};
      api.room.create(data).then(res => {
        if (res.status === 201) {
          setOpen(false);
          reset();
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Create success story',
            lifeTime: 3000
          });
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
