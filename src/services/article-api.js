import axios from 'axios';

const BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';

export const fetchArticles = (query = 'react') => axios.get(BASE_URL + query);

export const dummy = () => null;
// axios
//   .get(BASE_URL + DEFAULT_QUERY)
//   .then(({ data }) => {
//     this.setState({ articles: mapper(data.hits) });
//   })
//   .catch(error => {
//     this.setState({ error });
//   })
//   .finally(() => {
//     this.setState({ isLoading: false });
//   });

// eslint-disable-next-line-использовать-обычный-export-в-единичном-случае
