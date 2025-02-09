import React, { useEffect, useState } from 'react';
import { stapiService } from '../services/stapiService';
import { CharacterDetails } from '../types/stapi';

interface DetailsPanelProps {
  id: string;
  onClose: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ id, onClose }) => {
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('🚀 ~ useEffect ~ Details Panel, id changed:', setLoading);
    stapiService.getCharacterDetails(id).then((result) => {
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
  }, [id]);

  return (
    <div className="details-panel">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      {loading ? (
        <span>Loading...</span>
      ) : details ? (
        <pre>{JSON.stringify(details, null, 2)}</pre>
      ) : (
        <span>No details available.</span>
      )}
    </div>
  );
};

export default DetailsPanel;
