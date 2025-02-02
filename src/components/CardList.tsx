import React, { Component } from 'react';
import Card from './Card';
import { SearchItems } from '../types/searchItems';

interface CardListProps {
  items: SearchItems;
}

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map((item) => (
          <Card key={item.uid} item={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
