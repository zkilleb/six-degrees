import { api } from '../constants';

export async function getActorByName(keyword: string) {
  return await api.get(`/person/name/${keyword}`).then((res) => {
    return res.data.response;
  });
}
