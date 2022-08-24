import {ICreateStory} from '@/types';

import http from '../http';

export function createStory(data: ICreateStory) {
  return http.stories.post(data);
}
