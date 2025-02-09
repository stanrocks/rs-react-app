import React from 'react';
import { SearchItem } from '../types/searchItems';

interface CardProps {
  item: SearchItem;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  const { name, description } = item;
  return (
    <tr className="card-section" onClick={onClick}>
      <td className="card-section-name">{name}</td>
      <td className="card-section-description">{description}</td>
    </tr>
  );
};

export default Card;
