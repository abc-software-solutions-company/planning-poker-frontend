export interface IStoryComplete {
  id: string;
}

export interface IStoryCreate {
  name: string;
  roomId: string;
}

export interface IStoryUpdate extends IStoryComplete {
  name: string;
}

export interface IStoryResponse extends IStoryCreate, IStoryComplete {
  avgPoint: number | null;
}
