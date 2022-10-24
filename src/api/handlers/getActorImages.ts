import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getActorImages(id: number) {
  return api
    .get(`/person/${id}/images`, generateTMDBParams(id.toString()))
    .then((res) => {
      return res.data.profiles[0].file_path;
    });
}
