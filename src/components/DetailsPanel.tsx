import React, { useEffect, useState } from 'react';
import { stapiService } from '../services/stapiService';
import { CharacterDetails } from '../types/stapi';
import { useSearchParams } from 'react-router';

const DetailsPanel: React.FC = () => {
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('details');

  useEffect(() => {
    if (itemId) {
      setLoading(true);
      console.log('🚀 ~ useEffect ~ fetching character details');
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
    }
  }, [itemId]);

  return (
    <aside className="details-panel">
      <button className="close-button">Close</button>
      {loading ? (
        <span>Loading...</span>
      ) : details ? (
        <pre>{JSON.stringify(details, null, 2)}</pre>
      ) : (
        <span>No details available.</span>
      )}
    </aside>
  );
};

export default DetailsPanel;
