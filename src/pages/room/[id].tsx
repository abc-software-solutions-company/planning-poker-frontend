import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import Voting from '@/components/voting';
import {getStaticPaths, getStaticProps} from '@/data/ssr/room.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageRoom({roomId}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo title="Room" />
      <Voting roomId={roomId} />
    </>
  );
}

PageRoom.Layout = LayoutDefault;
