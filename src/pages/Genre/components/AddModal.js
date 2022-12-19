import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createGenre } from '../../../redux/actions/genre.action';
import { setAddModal } from '../../../redux/slices/genre.slice';


const AddModal = ({ }) => {
  const dispatch = useDispatch();
  const { addModal } = useSelector(state => state.genre);
  const [name, setName] = useState('');
  const [image, setImage] = useState();

  const handleSubmit = async () => {
    const genre = {
      name,
      image
    }

    await dispatch(createGenre(genre));

    handleClose()
  }

  const handleClose = () => {
    dispatch(setAddModal({ visible: false }))
    setName('');
    setImage();
  }

  return (
    <Modal show={addModal.visible} size='xl' onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingBottom: 16 }}>
          <input placeholder='name' defaultValue={name} onChange={e => setName(e.target.value)} />
        </div>
        <input type={'file'} accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])} />
        {image && (
          <div style={{ marginTop: 16 }}>
            <img src={URL.createObjectURL(image)} width="100px" height="150px" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button disabled={!name || !image} variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  );
};
// https://react-bootstrap.github.io/components/modal/
export default AddModal;