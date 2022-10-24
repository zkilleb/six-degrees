import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getActorByName(keyword: string) {
  return api.get('/search/person', generateTMDBParams(keyword)).then((res) => {
    return res.data.results;
  });
}
