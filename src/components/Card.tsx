import { SearchItem } from '../types/searchItems';
import { Link, useSearchParams } from 'react-router';

interface CardProps {
  item: SearchItem;
}

const Card = ({ item }: CardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams({
      query: query || '',
      page: page || '',
      details: item.uid,
    });
  };

  return (
    <>
      <tr className="card-section">
        <td className="card-section-name">
          <Link
            onClick={handleClick}
            to={`?query=${query}&page=${page}&details=${item.uid}`}
          >
            {item.name}
          </Link>
        </td>
        <td className="card-section-description">
          <Link
            onClick={handleClick}
            to={`?query=${query}&page=${page}&details=${item.uid}`}
          >
            {item.description}
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Card;
