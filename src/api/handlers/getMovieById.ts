import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getMovieById(id: number) {
  return api
    .get(`/movie/${id}/credits`, generateTMDBParams(id.toString()))
    .then((res) => {
      return res.data.cast;
    });
}
