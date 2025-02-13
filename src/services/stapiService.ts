import { StapiCharacter, CharacterDetails } from '../types/stapi';
import { SearchItems } from '../types/searchItems';

interface Result<T> {
  data?: T;
  error?: { message: string; status?: number };
  totalPages?: number;
}

const STAPI_BASE_URL = 'https://stapi.co/api/v1/rest/character';

function buildStapiFetchConfig(
  term: string,
  pageNumber: number
): [string, string] {
  if (!term.trim()) {
    return [`${STAPI_BASE_URL}/search?pageNumber=${pageNumber - 1}`, `GET`];
  }
  return [
    `${STAPI_BASE_URL}/search?name=${term.trim()}&pageNumber=${pageNumber - 1}`,
    `POST`,
  ];
}

async function getCharacterDetails(
  uid: string
): Promise<Result<CharacterDetails>> {
  console.log('🚀 ~ Someone called getCharacterDetails!');

  try {
    const response = await fetch(`${STAPI_BASE_URL}?uid=${uid}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.log('HTTP error! Status:', response.status);
      return {
        error: {
          message: `HTTP error! Message: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const data = await response.json();

    if (!data.character) {
      return { error: { message: 'Invalid character data from STAPI.' } };
    }
    console.log('🚀 fetched character details:', data.character);
    return { data: data.character };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Non-HTTP Error in fetch:', error.message);
      return { error: { message: error.message } };
    } else {
      return { error: { message: 'An unknown error occurred' } };
    }
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

async function searchCharacters(
  term: string,
  pageNumber: number
): Promise<Result<SearchItems>> {
  const [url, method] = buildStapiFetchConfig(term, pageNumber);

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

    const transformedCharacters = transformCharactersData(data.characters);
    const totalPages = data.page.totalPages || 0;

    return { data: transformedCharacters, totalPages };
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
  getCharacterDetails,
};
