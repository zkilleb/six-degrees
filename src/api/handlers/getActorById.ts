import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getActorById(id: number) {
  return api
    .get(`/person/${id}/movie_credits`, generateTMDBParams(id.toString()))
    .then((res) => {
      return res.data.cast;
    });
}
