export type Credits = {
  id: number;
  profile_path: string;
  name: string;
  character: string;
};

export interface IGenre {
  id: number;
  name: string;
}

export interface ISingleContent {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  poster?: string;
  media_type?: string;
  date?: string;
}

export interface ISingleContentInfo extends ISingleContent {
  vote_count: number;
  genres: IGenre[];
  runtime: string;
  overview: string;
  episode_run_time: number[];
  popularity: number;
}
