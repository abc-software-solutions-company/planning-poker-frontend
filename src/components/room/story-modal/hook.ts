import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {Tracking} from '@/components/common/third-party/tracking';
import {useStateAuth} from '@/contexts/auth';
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
  const auth = useStateAuth();
  const {roomData, setStoryType} = useRoom();
  const [disabled, setDisable] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors, dirtyFields}
  } = useForm<IFormInputs>({
    defaultValues: {type: 'Fibonacci', name: 'untitled'},
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IFormInputs> = data => {
    const {name, type} = data;
    setDisable(true);
    if (roomData) {
      if (roomData.story?.avgPoint === null) {
        Tracking.event({
          name: 'Submit Update Story form',
          properties: {auth, submitData: data, currentData: roomData.story}
        });
        api.story.update({id: roomData.story.id, name}).then(res => {
          if (res.status === 200) {
            socketUpdateRoom();
            setOpenModal(false);
            socketToast({
              type: 'success',
              title: 'Success!',
              content: 'Update success story'
            });
            Tracking.event({name: 'Update Story - success', properties: {auth, res}});
          } else Tracking.event({name: 'Update Story - fail', properties: {auth, res}});
          setDisable(false);
        });
      } else {
        Tracking.event({name: 'Submit Create Story form', properties: {auth, submitData: data}});
        api.story.create({name, roomId: roomData.id, type}).then(res => {
          if (res.status === 201) {
            socketUpdateRoom();
            setOpenModal(false);
            socketToast({
              type: 'success',
              title: 'Success!',
              content: 'Create success story'
            });
            Tracking.event({name: 'Create Story - success', properties: {auth, res}});
          } else Tracking.event({name: 'Create Story - fail', properties: {auth, res}});
          setDisable(false);
        });
      }
    }
  };

  useEffect(() => {
    const {type} = getValues();
    if (!roomData?.story?.type) setStoryType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields.type]);

  return {roomData, errors, disabled, setValue, register, onSubmit: handleSubmit(submitHandler)};
}
