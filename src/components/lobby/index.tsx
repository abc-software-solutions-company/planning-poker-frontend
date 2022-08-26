import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import ModalRoom from '@/components/modal-room';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import {findRoom} from '@/data/client/room.client';

import styles from './style.module.scss';

const Lobby: FC = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const Schema = yup.object().shape({
    name: yup.string().max(256, 'Room link must not exceed 256 letters').min(1, 'Room link must be atleast 1 letter')
  });

  interface IFormInputs {
    name: string;
  }

  const FORM_DEFAULT_VALUES: IFormInputs = {name: ''};

  const handleOnSubmit = async (idOrLink: string) => {
    const room = await findRoom(idOrLink);
    if (room && room.data) router.push(ROUTES.ROOM + room.data.id);
    else alert('Id or Link not exist');
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

  return (
    <>
      <div className={styles.lobby}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-button">
            <Button className="button-left" onClick={() => setOpen(true)}>
              Create Room
            </Button>
            <ModalRoom placeholder="Enter room name" title="Create New Room" open={open} setOpen={setOpen} />
            <form className="input-right" onSubmit={handleSubmit(onSubmit)}>
              <input placeholder="Enter a link or ID" {...register('name')}></input>
              {errors.name && <p className="error-validate">{errors.name.message}</p>}
              <Button className="button-right" type="submit">
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
