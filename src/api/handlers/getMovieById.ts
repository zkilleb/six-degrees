import { api } from '../constants';
import { generateTMDBParams } from '../util';

export async function getMovieById(id: number) {
  return await api
    .get(`/movie/${id}/credits`, generateTMDBParams(id.toString()))
    .then((res) => {
      return res.data.cast;
    });
}
