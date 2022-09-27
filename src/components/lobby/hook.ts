import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

const Schema = yup.object().shape({
  idOrLink: yup
    .string()
    .required('Please enter room link or ID')
    .max(256, 'Room link must not exceed 256 letters')
    .trim()
});

interface IFormInputs {
  idOrLink: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {idOrLink: ''};

export default function useLobby() {
  const toast = useToast();
  const router = useRouter();
  const [disabled, setDisable] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const detectId = (idOrLink: string) => {
    let id;
    if (!idOrLink.includes(window.location.origin + ROUTES.ROOM)) {
      id = idOrLink;
    } else {
      const arr = idOrLink.split(window.location.origin + ROUTES.ROOM);
      id = arr[arr.length - 1];
    }
    return id.toLowerCase();
  };

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = ({idOrLink}) => {
    setDisable(true);
    api.room.get({id: detectId(idOrLink)}).then(res => {
      if (res.status === 200 && res.data) {
        router.push(ROUTES.ROOM + res.data.id);
        toast.show({
          type: 'success',
          title: 'Success',
          content: 'Join the success room'
        });
      } else
        toast.show({
          type: 'danger',
          title: 'Error!',
          content: 'Room does not exist'
        });
    });
    setDisable(false);
  };

  return {openModal, setOpenModal, register, handleSubmit, errors, onSubmit, disabled};
}
