import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";
import { UrlBase } from "../../configs/app.config";
import adminLayout from "../../hoc/adminLayout";
import { deleteGenre, loadGenre } from "../../redux/actions/genre.action";
import { setAddModal, setEditModal } from "../../redux/slices/genre.slice";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import ItemGenre from "./components/ItemGenre";

const GenrePage = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector(state => state.genre);
  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadGenre());
  }, []);

  const _renderItem = (genre) => {
    const handleDelete = () => {
      const answer = window.confirm("Are you sure to delete this genre?");
      if (answer) {
        dispatch(deleteGenre(genre._id))
      }
    }

    const handleEdit = () => {
      dispatch(setEditModal({visible: true, genre: genre}))
    }

    return (
      <ItemGenre key={genre._id} genre={genre} onDelete={handleDelete} onEdit={handleEdit} />
    )
  }

  return (
    <>
      <div className="table-container" style={{ width: '100%' }}>
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">Genres</h5>
          </div>
          <div className="col text-right">
            <button className="btn btn-default low-height-btn" onClick={() => dispatch(setAddModal({visible: true}))}>
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genres.map(_renderItem)}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      <AddModal />
      <EditModal />
      {/* <ModalComponent title="Create Genre" content={<AddModal />} dataBsBackdrop="static" id="addModal" fullScreen="true" /> */}
    </>
  );
}

export default adminLayout(GenrePage);