import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getMovieByKeyword(keyword: string) {
  if (keyword) {
    return api.get(`/search/movie`, generateTMDBParams(keyword)).then((res) => {
      return res.data.results;
    });
  } else return [];
}
