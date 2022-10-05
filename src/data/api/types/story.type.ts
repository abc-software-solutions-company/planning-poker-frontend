import {StoryTypes} from '@/utils/constant';

export interface IStoryComplete {
  id: string;
}

export interface IStoryCreate {
  roomId: string;
  name: string;
  type: keyof typeof StoryTypes;
}

export interface IStoryUpdate extends IStoryComplete {
  name: string;
}

export interface IStoryResponse extends IStoryCreate, IStoryComplete {
  avgPoint: number | null;
}
