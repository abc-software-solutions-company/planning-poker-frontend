import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
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
  name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters')
});

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};
export default function useLetsStart() {
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    api.auth.login(data).then(res => {
      if (res.status === 201) {
        Cookie.accessToken.set(res.data.accessToken);
        dispatchAuth(AuthActions.login(res.data.user));
        const previousPage = Cookie.previousPage.get();
        if (previousPage) {
          router.push(previousPage);
        } else {
          router.push(ROUTES.HOME);
        }
      }
    });
  };

  useEffect(() => {
    Cookie.accessToken.remove();
  }, []);

  return {register, errors, handleSubmit, onSubmit};
}
