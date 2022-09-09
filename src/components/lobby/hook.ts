import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {findRoom} from '@/data/client/room.client';

const Schema = yup.object().shape({
  name: yup.string().max(256, 'Room link must not exceed 256 letters').min(1, 'Please enter room link or Id')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

export default function useLobby() {
  const toast = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleOnSubmit = async (idOrLink: string) => {
    const room = await findRoom(idOrLink);
    if (room && room.status === 200) {
      router.push(ROUTES.ROOM + room.data.id);
      toast.show({
        type: 'success',
        title: 'Success',
        content: 'Join the success room',
        lifeTime: 3000
      });
    } else
      toast.show({
        type: 'danger',
        title: 'Error!',
        content: 'Room does not exist',
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
