import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import {createUser, ICreateUser} from '@/data/client/user.client';
import Cookie from '@/utils/cookie';

interface IFormInputs {
  name: string;
}

export default function useLetsStart() {
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();
  const Schema = yup.object().shape({
    name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters')
  });
  const FORM_DEFAULT_VALUES: IFormInputs = {
    name: ''
  };
  const handleOnSubmit = (data: ICreateUser) => {
    createUser(data).then(res => {
      if (res.status === 201) {
        Cookie.remove('_userId');
        Cookie.set('_userId', res.data.id, {expires: 7, sameSite: 'strict', path: '/'});
        dispatchAuth(AuthActions.login(res.data));
        router.push(ROUTES.HOME);
      }
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
    handleOnSubmit(data);
  };

  return {register, errors, handleSubmit, onSubmit};
}
