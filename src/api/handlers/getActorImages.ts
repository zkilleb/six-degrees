import { api } from '../constants';

export async function getActorImages(id: number) {
  try {
    return await api.get(`/image/${id}`).then((res) => {
      return res.data.response;
    });
  } catch (e: any) {
    console.log(e.message);
  }
}
