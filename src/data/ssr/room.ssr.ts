import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import api from '../api';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  roomId: string;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    return {
      props: {
        roomId: id,
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
  const rooms = await api.room.all();
  const paths = rooms.data.flatMap(room => ({params: {id: `${room.id}`}}));
  return {paths, fallback: 'blocking'};
};
