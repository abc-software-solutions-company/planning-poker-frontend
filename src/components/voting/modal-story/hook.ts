import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ICreateStory} from '@/types';

interface IFormInputs {
  name: string;
}

export default function useModalStory() {
  const router = useRouter();

  const Schema = yup.object().shape({
    name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 10 letters')
  });

  const FORM_DEFAULT_VALUES: IFormInputs = {
    name: ''
  };

  const handleOnSubmit = async (data: ICreateStory) => {
    console.log('🚀 ~ file: index.tsx ~ line 43 ~ data', data);
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
    handleOnSubmit(data as ICreateStory);
  };
  return {router, errors, register, handleSubmit, onSubmit};
}
