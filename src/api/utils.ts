export function generateTMDBParams(keyword: string) {
  return {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      language: 'en-US',
      query: keyword,
      page: 1,
      include_adult: false,
    },
  };
}
