import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { UrlBase } from '../../../configs/app.config';
import { editEpisode } from '../../../redux/actions/movie.action';


const ItemEpisode = ({ item, onSave }) => {
  const dispatch = useDispatch();
  const [episode, setEpisode] = useState();
  const ref = useRef();

  const handleCancel = () => {
    setEpisode();
    ref.current.value = '';
  }

  return (
    <div style={{ paddingTop: 16 }}>
      <a href={`${UrlBase}/movies/${item.filename}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 16 }}>{item.filename}</a>
      <input ref={ref} type={'file'} accept="video/mp4" title='abc' onChange={e => setEpisode(e.target.files[0])} />
      {episode && (
        <>
          <Button
            variant="danger"
            style={{ marginRight: 16 }}
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onSave(episode)}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};

export default ItemEpisode;