import axios from 'axios';

const KEY = '35944916-0a227103958c105cd60c29ad2';
const perPage = 12;

export async function fetchImagesAPI (imagesName, page, signal) {
    const response = await axios.get(`https://pixabay.com/api/`, {
        signal,
        params: {
          q: imagesName,
          page: page,
          key: KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      });

    return response.data;

}