import React from 'react';
import Card from './Card';
import { SearchItems } from '../types/searchItems';
import { Outlet } from 'react-router';

interface CardListProps {
  items: SearchItems;
}

const CardList = ({ items }: CardListProps) => {
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
          <React.Fragment key={item.uid}>
            <Card item={item} />
          </React.Fragment>
        ))}
        <Outlet />
      </tbody>
    </table>
  );
};

export default CardList;
