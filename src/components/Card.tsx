import { SearchItem } from '../types/searchItems';
import { Link, useSearchParams } from 'react-router';

interface CardProps {
  item: SearchItem;
}

const Card = ({ item }: CardProps) => {
  const [SearchParams] = useSearchParams();
  const query = SearchParams.get('query');
  const page = SearchParams.get('page');

  return (
    <>
      <tr className="card-section">
        <td className="card-section-name">
          <Link to={`?query=${query}&page=${page}&details=${item.uid}`}>
            {item.name}
          </Link>
        </td>
        <td className="card-section-description">
          <Link to={`?query=${query}&page=${page}&details=${item.uid}`}>
            {item.description}
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Card;
