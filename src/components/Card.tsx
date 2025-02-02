import React, { Component } from 'react';
import { SearchItem } from '../types/searchItems';

interface CardProps {
  item: SearchItem;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props.item;
    return (
      <>
        <p>{name}</p>
        <p>{description}</p>
      </>
    );
  }
}

export default Card;
