import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth, useStateAuth} from '@/contexts/auth/context';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IAuthUpdate} from '@/data/api/types/auth.type';
import {socketUpdateRoomExceptMe} from '@/data/socket';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter user name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useAuthModal({openModal, setOpenModal}: IProps) {
  const auth = useStateAuth();
  const [disabled, setDisable] = useState(false);
  const dispatch = useDispatchAuth();
  const toast = useToast();

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm<IAuthUpdate>({
    defaultValues: {name: ''},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
    if (openModal) {
      setValue('name', auth?.name || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const submitHandler: SubmitHandler<IAuthUpdate> = data => {
    setDisable(true);
    api.auth.update(data).then(({status, data: {name}}) => {
      if (status === 200) {
        dispatch(AuthActions.UPDATE({name}));
        socketUpdateRoomExceptMe();
        setOpenModal(false);
        toast.show({
          type: 'success',
          title: 'Success!',
          content: 'Update success name'
        });
      }
      setDisable(false);
    });
  };

  return {errors, register, onSubmit: handleSubmit(submitHandler), disabled};
}
