import {yupResolver} from '@hookform/resolvers/yup';
import {Modal} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import useToast from '@/core-ui/toast';
import {createStory} from '@/data/client/story.client';
import {ICreateStory} from '@/types';

// import InputText from '@/core-ui/input-text';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
}

const Schema = yup.object().shape({
  name: yup
    .string()
    .required('Please fill in your name')
    .max(32, 'Your name must not exceed 10 letters')
    .min(1, 'Your name must be atleast 1 letter')
});

interface IFormInputs {
  name: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  name: ''
};

const ModalStory: React.FC<IProps> = ({open, setOpen, title, placeholder}) => {
  const toast = useToast();
  const router = useRouter();
  const handleOnSubmit = (data: ICreateStory) => {
    createStory(data).then(res => {
      if (res.status === 201) setOpen(false);
    });
  };

  const onCancel = () => {
    setOpen(false);
    router.push(ROUTES.HOME);
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

  return (
    <>
      <Modal open={open}>
        <form className={styles['modal-create']} onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="content">
              <Heading as="h5">{title}</Heading>
              <div className="input-button">
                <input className="form-input" placeholder={placeholder} {...register('name')} />
                {errors.name && <p className="error-validate">{errors.name.message}</p>}
                <div className="button">
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button
                    type="submit"
                    onClick={() =>
                      toast.show({
                        type: 'danger',
                        title: 'Error!',
                        content: 'Please enter story',
                        lifeTime: 3000
                      })
                    }
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalStory;
