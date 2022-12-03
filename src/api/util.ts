export function generateTMDBParams(keyword: string) {
  return {
    params: {
      language: 'en-US',
      query: keyword,
      page: 1,
      include_adult: false,
    },
  };
}
