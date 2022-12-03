import dayjs from 'dayjs';
import { generateTMDBParams } from '../util';
import { api } from '../constants';

export async function getMovieByKeyword(keyword: string) {
  if (keyword) {
    const now = dayjs(Date.now()).format('YYYY-MM-DD');
    const tempResponse = await api
      .get(`/search/movie`, generateTMDBParams(keyword))
      .then((res) => {
        return res.data.results;
      });
    const response = tempResponse.filter((movie: any) => {
      if (movie.release_date !== '') {
        return !dayjs(movie.release_date).isAfter(now);
      } else return true;
    });
    return response;
  } else return [];
}
