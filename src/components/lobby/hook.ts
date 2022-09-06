import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {findRoom} from '@/data/client/room.client';

interface IFormInputs {
  name: string;
}
export default function useLobby() {
  const toast = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const Schema = yup.object().shape({
    name: yup.string().max(256, 'Room link must not exceed 256 letters').min(1, 'Please enter room link or Id')
  });

  const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

  const handleOnSubmit = async (idOrLink: string) => {
    const room = await findRoom(idOrLink);
    if (room && room.data) router.push(ROUTES.ROOM + room.data.id);
    else
      toast.show({
        type: 'danger',
        title: 'Error!',
        content: 'Room not exist',
        lifeTime: 3000
      });
  };

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    handleOnSubmit(data.name);
  };

  return {openModal, setOpenModal, register, handleSubmit, errors, onSubmit};
}
