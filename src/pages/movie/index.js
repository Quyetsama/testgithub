import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent";
import { UrlBase } from "../../configs/app.config";
import adminLayout from "../../hoc/adminLayout";
import { deleteMovie, loadMovie } from "../../redux/actions/movie.action";
import { setAddModal, setEditModal } from "../../redux/slices/movie.slice";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
// import AddModal from "./components/AddModal";
// import EditModal from "./components/EditModal";
import ItemMovie from "./components/ItemMovie";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.movie);
  

  useEffect(() => {
    dispatch(loadMovie());
  }, []);

  const _renderItem = (movie) => {
    const handleDelete = () => {
      const answer = window.confirm("Are you sure to delete this movie?");
      if (answer) {
        dispatch(deleteMovie(movie._id))
      }
    }

    const handleEdit = () => {
      dispatch(setEditModal({visible: true, movie: movie}))
    }

    return (
      <ItemMovie key={movie._id} movie={movie} onDelete={handleDelete} onEdit={handleEdit} />
    )
  }

  return (
    <>
      <div className="table-container" style={{ width: '100%' }}>
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">Movies</h5>
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
                <th>Description</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(_renderItem)}
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

export default adminLayout(MoviePage);