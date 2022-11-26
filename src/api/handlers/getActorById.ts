import { api } from '../constants';

export async function getActorById(id: number) {
  return await api.get(`/person/id${id}`).then((res) => {
    return res.data.response;
  });
}
