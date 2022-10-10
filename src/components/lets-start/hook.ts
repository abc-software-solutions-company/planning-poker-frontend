import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import api from '@/data/api';
import Cookie from '@/utils/cookie';

interface IFormInputs {
  name: string;
}
const Schema = yup.object().shape({
  name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useLetsStart() {
  const [disabled, setDisable] = useState(false);
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();
  const {
    register,
    setFocus,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: {name: ''},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setDisable(true);
    api.auth.login(data).then(res => {
      if (res.status === 201) {
        Cookie.accessToken.set(res.data.accessToken);
        dispatchAuth(AuthActions.UPDATE(res.data.user));
        const previousPage = Cookie.previousPage.get();
        if (previousPage) {
          router.push(previousPage);
        } else {
          router.push(ROUTES.LOBBY);
        }
      }
      setDisable(false);
    });
  };
  useEffect(() => {
    setFocus('name');
    Cookie.accessToken.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {register, errors, handleSubmit, onSubmit, disabled};
}
