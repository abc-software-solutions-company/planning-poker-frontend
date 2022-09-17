export interface IUserStoryCreate {
  storyId: string;
}

export interface IUserStoryUpdate extends IUserStoryCreate {
  votePoint: number | null;
}

export interface IUserStoryResponse extends IUserStoryUpdate {
  userId: string;
}
