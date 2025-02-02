import React, { Component } from 'react';
import { SearchItem } from '../types/searchItems';

interface CardProps {
  item: SearchItem;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props.item;
    return (
      <tr className="card-section">
        <td className="card-section-name">{name}</td>
        <td className="card-section-description">{description}</td>
      </tr>
    );
  }
}

export default Card;
