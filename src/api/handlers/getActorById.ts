import { api } from '../constants';
import { generateTMDBParams } from '../util';

export async function getActorById(id: number) {
  return await api
    .get(`/person/${id}/movie_credits`, generateTMDBParams(id.toString()))
    .then((r) => {
      return r.data.cast;
    });
}
