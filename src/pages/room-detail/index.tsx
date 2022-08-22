import React from 'react';

import Voting from '@/components/voting';
import LayoutDefault from '@/layouts/default';
import {IVoteUser} from '@/types';

export default function PageAction() {
  const dataVoteUsers: IVoteUser[] = [
    {name: 'Khanh', host: true, vote: true},
    {name: 'Huy'},
    {name: 'Linh'},
    {name: 'Phuoc', vote: true}
  ];

  return (
    <>
      <Voting dataUsers={dataVoteUsers} />
    </>
  );
}

PageAction.Layout = LayoutDefault;
