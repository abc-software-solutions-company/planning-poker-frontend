import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import Voting from '@/components/voting';
import {ROUTES} from '@/configs/routes.config';
import {getStaticPaths, getStaticProps} from '@/data/ssr/room.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageRoom({roomId}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo title={`Room ${roomId}`} url={ROUTES.ROOM + '/' + roomId} />
      <Voting roomId={roomId} />
    </>
  );
}

PageRoom.Layout = LayoutDefault;
