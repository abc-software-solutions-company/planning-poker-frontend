import React from 'react';

import VoteRoom from '@/components/voting';
import LayoutDefault from '@/layouts/default';
import {IVoteUser} from '@/types';

export default function PageHome() {
  const dataVoteUsers: IVoteUser[] = [{name: 'Khanh', host: true}, {name: 'Huy'}, {name: 'Linh'}, {name: 'Phuoc'}];

  return (
    <>
      <VoteRoom dataUsers={dataVoteUsers} btnL="Finish" btnR="Next" />
    </>
  );
}

PageHome.Layout = LayoutDefault;
