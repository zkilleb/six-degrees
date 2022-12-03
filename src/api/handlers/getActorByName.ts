import { api } from '../constants';
import { generateTMDBParams } from '../util';

export async function getActorByName(keyword: string) {
  return await api
    .get('/search/person', generateTMDBParams(keyword))
    .then((r) => {
      return r.data.results;
    });
}
