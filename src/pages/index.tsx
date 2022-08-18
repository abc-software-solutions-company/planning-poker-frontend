import React from 'react';

import Login from '@/components/login';
import PlanningPocker from '@/components/planning-pocker';
import VoteRoom from '@/components/voting';
import LayoutDefault from '@/layouts/default';
import {IVoteUser} from '@/types';

export default function PageHome() {
  const dataVoteUsers: IVoteUser[] = [
    {name: 'Khanh', host: true, vote: true},
    {name: 'Huy'},
    {name: 'Linh'},
    {name: 'Phuoc', vote: true}
  ];

  return (
    <>
      <Login />
      <PlanningPocker />
      <VoteRoom dataUsers={dataVoteUsers} />
    </>
  );
}

PageHome.Layout = LayoutDefault;
