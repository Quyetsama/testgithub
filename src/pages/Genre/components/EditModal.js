import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { UrlBase } from '../../../configs/app.config';
import { createGenre, editGenre } from '../../../redux/actions/genre.action';
import { setAddModal, setEditModal } from '../../../redux/slices/genre.slice';


const EditModal = ({ }) => {
  const dispatch = useDispatch();
  const { editModal } = useSelector(state => state.genre);
  const [name, setName] = useState('');
  const [image, setImage] = useState();

  useEffect(() => {
    if (editModal.visible && editModal.genre) {
      const genre = editModal.genre;
      setName(genre.name)
    }
  }, [editModal])

  const handleSubmit = async () => {
    if (editModal.genre) {
      const genre = {
        name,
        ...(image && {image: image})
      }
  
      dispatch(editGenre({id: editModal.genre._id, genre}))
    }
    
    handleClose();
  }

  const handleClose = () => {
    dispatch(setEditModal({ visible: false, genre: null }))
    setName('');
    setImage();
  }

  return (
    <Modal show={editModal.visible} size='xl' onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingBottom: 16 }}>
          <input placeholder='name' defaultValue={name} onChange={e => setName(e.target.value)} />
        </div>
        <input type={'file'} accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])} />
        {(image || editModal.genre?.image) && (
          <div style={{ marginTop: 16 }}>
            <img src={image ? URL.createObjectURL(image) : `${UrlBase}/images/${editModal.genre?.image}`} width="100px" height="150px" />
          </div>
        )}
      </Modal.Body> 
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button disabled={!name || (!image && !editModal.genre?.image)} variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  );
};
// https://react-bootstrap.github.io/components/modal/
export default EditModal;