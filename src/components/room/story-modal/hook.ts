import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import api from '@/data/api';
import {socketToast, socketUpdateRoom} from '@/data/socket';
import useRoom from '@/hooks/useRoom';
import {StoryTypes} from '@/utils/constant';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please fill in story name').max(256, 'Story name must not exceed 256 letters').trim()
});

interface IFormInputs {
  name: string;
  type: keyof typeof StoryTypes;
}

export default function useStoryModal({setOpenModal}: IProps) {
  const {roomData, setStoryType} = useRoom();
  const [disabled, setDisable] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors, dirtyFields}
  } = useForm<IFormInputs>({
    defaultValues: {type: 'Fibonacci'},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IFormInputs> = ({name, type}) => {
    setDisable(true);
    const promiseArr = [];
    if (roomData) {
      if (roomData.story?.avgPoint === null) {
        promiseArr.push(api.story.update({id: roomData.story.id, name: name}));
      } else {
        promiseArr.push(api.story.create({name, roomId: roomData.id, type}));
      }
    }
    if (promiseArr.length > 0)
      Promise.any(promiseArr).then(({status}) => {
        if (status === 200 || status === 201) {
          socketUpdateRoom();
          setOpenModal(false);
          socketToast({
            type: 'success',
            title: 'Success!',
            content: 'Update success story'
          });
        }
        setDisable(false);
      });
  };

  useEffect(() => {
    const {type} = getValues();
    if (!roomData?.story?.type) setStoryType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields.type]);

  return {roomData, setValue, errors, register, onSubmit: handleSubmit(submitHandler), disabled};
}
