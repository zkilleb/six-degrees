import { api } from '../constants';
import { generateTMDBParams } from '../util';

export async function getActorById(id: number) {
  return await api
    .get(`/person/${id}/movie_credits`, generateTMDBParams(id.toString()))
    .then((r) => {
      return r.data.cast
        .sort((a: any, b: any) => b.vote_count - a.vote_count)
        .slice(0, 5);
    });
}
