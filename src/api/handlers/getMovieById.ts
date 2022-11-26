import { api } from '../constants';

export async function getMovieById(id: number) {
  return await api.get(`/movie/id/${id}`).then((res) => {
    return res.data.response;
  });
}
