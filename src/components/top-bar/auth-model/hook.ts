import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {Tracking} from '@/components/common/third-party/tracking';
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

export default function useAuthModal({setOpenModal}: IProps) {
  const auth = useStateAuth();
  const [disabled, setDisable] = useState(false);
  const dispatch = useDispatchAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IAuthUpdate>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IAuthUpdate> = data => {
    Tracking.event({name: 'Submit Update User Name form', properties: {auth, submitData: data}});
    setDisable(true);
    api.auth.update(data).then(res => {
      if (res.status === 200) {
        Tracking.event({name: 'Update User Name - success', properties: {auth, res}});
        dispatch(AuthActions.UPDATE({name: res.data.name}));
        socketUpdateRoomExceptMe();
        setOpenModal(false);
        toast.show({
          type: 'success',
          title: 'Success!',
          content: 'Update success name'
        });
      } else Tracking.event({name: 'Update User Name - fail', properties: {auth, res}});
      setDisable(false);
    });
  };

  return {errors, register, onSubmit: handleSubmit(submitHandler), disabled};
}
