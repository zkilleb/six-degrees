import { api } from '../constants';
import { generateTMDBParams } from '../util';

export async function getActorImages(id: number) {
  try {
    return await api
      .get(`/person/${id}/images`, generateTMDBParams(id.toString()))
      .then((res) => {
        return res.data.profiles[0].file_path;
      });
  } catch (e: any) {
    console.log('Request to get image failed');
  }
}
