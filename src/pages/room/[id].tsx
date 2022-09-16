import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Voting from '@/components/voting';
import {getStaticPaths, getStaticProps} from '@/data/ssr/room.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageRoom({room}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Voting data={room} />;
}

PageRoom.Layout = LayoutDefault;
