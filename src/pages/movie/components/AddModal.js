import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { loadGenre } from '../../../redux/actions/genre.action';
import { createMovie } from '../../../redux/actions/movie.action';
import { setAddModal } from '../../../redux/slices/movie.slice';
import { ApiService } from '../../../services/api.service';


const AddModal = ({ }) => {
  const dispatch = useDispatch();
  const { addModal } = useSelector(state => state.movie);
  const { genres } = useSelector(state => state.genre);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState();
  const [des, setDes] = useState('');
  const [totalEps, setTotalEps] = useState(1);
  const [episodes, setEpisodes] = useState([undefined]);

  useEffect(() => {
    dispatch(loadGenre());
  }, [])

  const handleSubmit = async () => {
    const movie = {
      name,
      categories: genre,
      image,
      description: des,
      totalEpisodes: +totalEps,
    }

    await dispatch(createMovie({movie, episodes}));

    handleClose()
  }

  const handleClose = () => {
    dispatch(setAddModal({ visible: false }))
    setName('');
    setGenre('');
    setImage();
    setDes('');
    setTotalEps(1);
    setEpisodes([undefined]);
  }

  const handleSelectMovie = (index, file) => {
    let newEpisodes = [...episodes];
    newEpisodes[index] = file;
    setEpisodes(newEpisodes);
  }

  const handleRemoveMovie = (index) => {
    let newEpisodes = [...episodes];
    newEpisodes.splice(index, 1);
    setEpisodes(newEpisodes);
  }

  const validButton = () => {
    let isValid = true;
    if (!name || !genre || !image || !des || totalEps <= 0 || !episodes.length || episodes.includes(undefined) || episodes.length > +totalEps) {
      isValid = false;
    }

    return isValid;
  }

  return (
    <Modal show={addModal.visible} size='xl' onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingBottom: 16 }}>
          <input placeholder='name' defaultValue={name} onChange={e => setName(e.target.value)} />
        </div>

        <div style={{ paddingBottom: 16 }}>
          <select defaultValue={''} className="form-select" aria-label="Default select example" onChange={e => setGenre(e.target.value)}>
            <option value="" disabled hidden>Choose genre</option>
            {genres.map(el => <option key={el._id} value={el._id}>{el.name}</option>)}
          </select>
        </div>

        <input type={'file'} accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])} />
        {image && (
          <div style={{ marginTop: 16 }}>
            <img src={URL.createObjectURL(image)} width="100px" height="150px" />
          </div>
        )}
        <div style={{ paddingTop: 16 }}>
          <textarea placeholder='description' defaultValue={des} onChange={e => setDes(e.target.value)} />
        </div>
        <div style={{ paddingTop: 16 }}>
          <input type={'number'} placeholder='totalEpisodes' defaultValue={totalEps} onChange={e => setTotalEps(e.target.value)} />
        </div>
        <div style={{ paddingTop: 32 }}>
          <h5>Episodes</h5>
        </div>
        {episodes.map((el, index) => {
          return (
            <div key={index} style={{ paddingTop: 16 }}>
              <input type={'file'} accept="video/mp4" onChange={e => handleSelectMovie(index, e.target.files[0])} />
              {index === episodes.length - 1 && (
                <Button variant='danger' onClick={() => { handleRemoveMovie(index) }}>
                  x
                </Button>
              )}

            </div>
          )
        })}
        <div style={{ paddingTop: 16 }}>
          <Button variant="secondary" onClick={() => {
            setEpisodes([...episodes, undefined]);
          }}>
            + episode
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          disabled={!validButton()}
          variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default AddModal;