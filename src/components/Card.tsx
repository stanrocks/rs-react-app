import React from 'react';
import { SearchItem } from '../types/searchItems';

interface CardProps {
  item: SearchItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const { name, description } = item;
  return (
    <tr className="card-section">
      <td className="card-section-name">{name}</td>
      <td className="card-section-description">{description}</td>
    </tr>
  );
};

export default Card;
