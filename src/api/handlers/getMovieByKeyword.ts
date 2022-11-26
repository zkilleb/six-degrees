import { api } from '../constants';

export async function getMovieByKeyword(keyword: string) {
  if (keyword) {
    return api.get(`movie/name/${keyword}`).then((res) => {
      return res.data.response;
    });
  } else return [];
}
