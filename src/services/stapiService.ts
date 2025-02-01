import { StapiCharacter } from '../types/stapi';

const STAPI_BASE_URL = 'https://stapi.co/api/v1/rest/character/search';

async function searchCharacters(term: string): Promise<StapiCharacter[]> {
  let url: string;
  let method: string = 'GET';

  if (term.trim() === '') {
    url = `${STAPI_BASE_URL}?pageNumber=0`;
  } else {
    url = `${STAPI_BASE_URL}?name=${term.trim()}`;
    method = 'POST';
  }

  console.log('url: ', url);

  try {
    const response = await fetch(url, { method });

    if (!response.ok) {
      throw new Error(
        `HTTP error! Response status: ${response.status}, error message: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.characters || !Array.isArray(data.characters)) {
      throw new Error('Invalid data format received from STAPI.');
    }
    console.log('response: ', response);
    console.log('response status: ', response.status);
    return data.characters;
  } catch (error: unknown) {
    console.error('Error fetching from STAPI:', error);
    throw error;
  }
}

export const stapiService = {
  searchCharacters,
};
