import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {allRoom, getRoom, IRoomResponse} from '../client/room.client';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  room: IRoomResponse;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    const room = await getRoom({id: id});
    if (!room.data) throw new Error('');
    room.data.id = room.data.id;
    return {
      props: {
        room: room.data,
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
  const rooms = await allRoom();
  const paths = rooms.data.flatMap(room => ({params: {id: `${room.id}`}}));
  return {paths, fallback: 'blocking'};
};
