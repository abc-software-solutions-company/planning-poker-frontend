import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {Dispatch, SetStateAction, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter room name').max(32, 'Your name must not exceed 32 letters').trim()
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
  const [disabled, setDisable] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setDisable(true);
    api.room.create(data).then(res => {
      if (res.status === 201) {
        setOpen(false);
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
