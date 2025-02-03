import { Component } from 'react';
import Card from './Card';
import { SearchItems } from '../types/searchItems';

interface CardListProps {
  items: SearchItems;
}

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <table className="card-list">
        <thead className="card-list-header">
          <tr className="card-list-header-row">
            <th className="card-list-header-name">Name</th>
            <th className="card-list-header-description">Description</th>
          </tr>
        </thead>
        <tbody className="card-list-body">
          {items.map((item) => (
            <Card key={item.uid} item={item} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default CardList;
