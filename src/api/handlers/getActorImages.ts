import { api } from '../constants';
import { generateTMDBParams } from '../utils';

export function getActorImages(id: number) {
  try {
    return api
      .get(`/person/${id}/images`, generateTMDBParams(id.toString()))
      .then((res) => {
        return res.data.profiles[0].file_path;
      });
  } catch (e: any) {
    console.log(e.message);
  }
}
