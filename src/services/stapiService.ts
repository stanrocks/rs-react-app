import { StapiCharacter } from '../types/stapi';
import { SearchItems } from '../types/searchItems';

interface Result<T> {
  data?: T;
  error?: { message: string; status?: number };
}

const STAPI_BASE_URL = 'https://stapi.co/api/v1/rest/character/search';

function buildStapiFetchConfig(term: string): [string, string] {
  if (term.trim() === '') {
    return [`${STAPI_BASE_URL}?pageNumber=0`, `GET`];
  } else {
    return [`${STAPI_BASE_URL}?name=${term.trim()}`, `POST`];
  }
}

function transformCharactersData(characters: StapiCharacter[]): SearchItems {
  return characters.map((character: StapiCharacter) => {
    const { uid, name, ...rest } = character;

    const descriptionParts: string[] = [];
    for (const key in rest) {
      if (Object.prototype.hasOwnProperty.call(rest, key)) {
        const value = rest[key as keyof typeof rest];
        if (typeof value === 'boolean') {
          if (value) {
            descriptionParts.push(key);
          }
        } else if (value !== undefined && value !== null) {
          descriptionParts.push(`${key}: ${value}`);
        }
      }
    }

    const description = descriptionParts.join(', ');

    return {
      uid,
      name,
      description,
    };
  });
}

async function searchCharacters(term: string): Promise<Result<SearchItems>> {
  const [url, method] = buildStapiFetchConfig(term);

  try {
    const response = await fetch(url, { method });
    if (!response.ok) {
      console.log('HTTP error! Status: ', response.status);
      return {
        error: {
          message: `HTTP error! Message: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const data = await response.json();

    if (!data.characters || !Array.isArray(data.characters)) {
      return { error: { message: 'Invalid data from STAPI.' } };
    }
    // console.log('response: ', response);
    // console.log('response status: ', response.status);

    // console.log('Raw data: ', data);
    // console.log('Raw characters: ', data.characters);

    const transformedCharacters = transformCharactersData(data.characters);
    // console.log('transformedCharacters: ', transformedCharacters);
    return { data: transformedCharacters };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Non-HTTP Error in search: ', error.message);
      return { error: { message: error.message } };
    } else {
      return { error: { message: 'An unknown error occurred' } };
    }
  }
}

export const stapiService = {
  searchCharacters,
};
