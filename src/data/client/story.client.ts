import {ICreateStory} from '@/types';

import http from '../http';

export function createStory(data: ICreateStory) {
  http.stories.post(data);
}
