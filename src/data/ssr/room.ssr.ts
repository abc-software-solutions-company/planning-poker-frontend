import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {IRoom} from '@/types';

import http from '../http';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  room: IRoom;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    const room = await (await http.rooms.get(id)).data;
    if (!room) throw new Error('');
    room.id = Number(room.id);
    return {
      props: {
        room,
        ...(await serverSideTranslations(locale!, ['common']))
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const rooms = await http.rooms.all();
  const paths = rooms.data.flatMap(room => ({params: {id: `${room.id}`}}));
  return {paths, fallback: 'blocking'};
};
