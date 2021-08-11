import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '21859794-b320bd39175c403fcfc8c4a95';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) =>
  axios.get(
            `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
            ).then(response => response.data.hits);

export { fetchImages };