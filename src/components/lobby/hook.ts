import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {Tracking} from '../common/third-party/tracking';

const Schema = yup.object().shape({
  idOrLink: yup
    .string()
    .required('Please enter room link or ID')
    .max(256, 'room link or ID must not exceed 256 letters')
    .trim()
});

interface IFormInputs {
  idOrLink: string;
}

export default function useLobby() {
  const auth = useStateAuth();
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
    defaultValues: {idOrLink: ''},
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IFormInputs> = data => {
    setDisable(true);
    Tracking.event({name: 'Submit Join Room form', properties: {auth, submitData: data}});
    api.room.get({id: detectId(data.idOrLink)}).then(res => {
      if (res.status === 200 && res.data) {
        Tracking.event({name: 'Find Room - success', properties: {auth, res}});
        router.push(ROUTES.ROOM + res.data.id);
        toast.show({
          type: 'success',
          title: 'Success',
          content: 'Join success room'
        });
      } else {
        toast.show({
          type: 'danger',
          title: 'Error!',
          content: 'Room does not exist'
        });
        Tracking.event({name: 'Find Room - fail', properties: {auth, res}});
      }
      setDisable(false);
    });
  };

  return {openModal, errors, disabled, setOpenModal, register, onSubmit: handleSubmit(submitHandler)};
}
