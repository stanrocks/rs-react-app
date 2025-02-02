import { StapiCharacter } from '../types/stapi';
import { SearchItems } from '../types/searchItems';

interface Result<T> {
  data?: T;
  error?: Error;
}

const STAPI_BASE_URL = 'https://stapi.co/api/v1/rest/character/search';

export class HTTPError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}

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
      throw new HTTPError(
        `HTTP error! Message: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    if (!data.characters || !Array.isArray(data.characters)) {
      throw new Error('Invalid data from STAPI.');
    }
    // console.log('response: ', response);
    // console.log('response status: ', response.status);

    // console.log('Raw data: ', data);
    // console.log('Raw characters: ', data.characters);

    const transformedCharacters = transformCharactersData(data.characters);
    // console.log('transformedCharacters: ', transformedCharacters);
    return { data: transformedCharacters };
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      console.error('HTTP Error in search: ', error.message, error.status);
      return { error };
    } else if (error instanceof Error) {
      console.error('Non-HTTP Error in search: ', error.message);
      return { error };
    } else {
      const unknownError = new Error('An unknown error occurred');
      console.error('An unknown Error in search: ', unknownError);
      return { error: unknownError };
    }
  }
}

export const stapiService = {
  searchCharacters,
};
