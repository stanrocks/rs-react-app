import React, { useEffect, useState } from 'react';
import { stapiService } from '../services/stapiService';
import { CharacterDetails } from '../types/stapi';
import { useSearchParams } from 'react-router';

const DetailsPanel: React.FC = () => {
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemId = searchParams.get('details');

  useEffect(() => {
    if (itemId) {
      setLoading(true);
      stapiService.getCharacterDetails(itemId).then((result) => {
        if (result.error) {
          console.error(
            'Error fetching character details:',
            result.error.message
          );
        } else {
          setDetails(result.data || null);
        }
        setLoading(false);
      });
    } else {
      setDetails(null);
    }
  }, [itemId]);

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!itemId) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <aside className="details-panel">
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        {loading ? (
          <span>Loading...</span>
        ) : details ? (
          <pre>{JSON.stringify(details, null, 2)}</pre>
        ) : (
          <span>No details available.</span>
        )}
      </aside>
    </div>
  );
};

export default DetailsPanel;
