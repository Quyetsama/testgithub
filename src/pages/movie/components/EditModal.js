import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { UrlBase } from '../../../configs/app.config';
import { loadGenre } from '../../../redux/actions/genre.action';
import { addEpisode, createMovie, editEpisode, editMovie } from '../../../redux/actions/movie.action';
import { setAddModal, setEditModal } from '../../../redux/slices/movie.slice';
import { ApiService } from '../../../services/api.service';
import ItemEpisode from './ItemEpisode';


const EditModal = ({ }) => {
  const dispatch = useDispatch();
  const { editModal } = useSelector(state => state.movie);
  const { genres } = useSelector(state => state.genre);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState();
  const [des, setDes] = useState('');
  const [totalEps, setTotalEps] = useState(1);
  const [episodes, setEpisodes] = useState();
  const ref = useRef();

  useEffect(() => {
    if (editModal.movie) {
      const movie = editModal.movie;
      setName(movie.name);
      setGenre(movie.categories[0]._id);
      setDes(movie.description);
      setTotalEps(movie.totalEpisodes);
    }
  }, [editModal.movie]);

  useEffect(() => {
    dispatch(loadGenre());
  }, [])

  const handleSubmit = async () => {
    const movie = {
      name,
      categories: genre,
      ...(image && {image: image}),
      description: des,
      totalEpisodes: +totalEps,
    }

    await dispatch(editMovie({id: editModal.movie._id, movie}));

    handleClose()
  }

  const handleAdd = () => {
    if (editModal.movie) {
      dispatch(addEpisode({
        id: editModal.movie._id,
        episode: episodes,
      }))
      handleClose();
    }
  }

  const handleClose = () => {
    dispatch(setEditModal({ visible: false }))
    setName('');
    setGenre('');
    setImage();
    setDes('');
    setTotalEps(1);
    setEpisodes();
  }

  const validButton = () => {
    let isValid = true;
    if (!name || !genre || !des || totalEps < editModal.movie?.episodes.length) {
      isValid = false;
    }

    return isValid;
  }

  return (
    <Modal show={editModal.visible} size='xl' onHide={handleClose}>
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
            {genres.map(el => <option key={el._id} selected={el._id === genre} value={el._id}>{el.name}</option>)}
          </select>
        </div>

        <input type={'file'} accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])} />
        {(image || editModal.movie?.image) && (
          <div style={{ marginTop: 16 }}>
            <img src={image ? URL.createObjectURL(image) : `${UrlBase}/images/${editModal.movie?.image}`} width="100px" height="150px" />
          </div>
        )}
        <div style={{ paddingTop: 16 }}>
          <textarea placeholder='description' defaultValue={des} onChange={e => setDes(e.target.value)} />
        </div>
        <div style={{ paddingTop: 16 }}>
          <input type={'number'} placeholder='totalEpisodes' value={totalEps} onChange={e => setTotalEps(e.target.value)} />
        </div>
        <div style={{ paddingTop: 32 }}>
          <h5>Episodes</h5>
        </div>
        {editModal.movie?.episodes.map((el) => {
          const handleSave = (episode) => {
            dispatch(editEpisode({
              id: el._id,
              episode
            }))
            handleClose();
          }

          return (
            <ItemEpisode key={el._id} item={el} onSave={handleSave} />
          )
        })}
        {editModal.movie?.episodes.length < editModal.movie?.totalEpisodes && (
          <div style={{ paddingTop: 16 }}>
            <p>-New episode-</p>
            <input ref={ref} type={'file'} accept="video/mp4" onChange={e => setEpisodes(e.target.files[0])} />
            {!!episodes && (
              <>
                <Button
                  variant="danger"
                  style={{ marginRight: 16, marginLeft: 16 }}
                  onClick={() => {
                    setEpisodes();
                    ref.current.value = '';
                  }}>
                  Cancel
                </Button>
                <Button variant="success" onClick={handleAdd}>
                  Save
                </Button>
              </>
            )}
          </div>
        )}

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

export default EditModal;