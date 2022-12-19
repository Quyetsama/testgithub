import React from "react";
import { UrlBase } from "../../../configs/app.config";

const ItemMovie = ({
  movie,
  onDelete,
  onEdit
}) => {
  return (
    <tr key={movie._id}>
      <td>{movie._id}</td>
      <td>{movie.name}</td>
      <td>
        <img src={`${UrlBase}/images/${movie.image}`} width="100px" height="150px" />
      </td>
      <td>{movie.description}</td>
      <td>{movie.createdAt}</td>
      <td>{movie.updatedAt}</td>
      <td>
        <div className="dropdown table-action-dropdown">
          <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
            <li><a className="dropdown-item" href="#" onClick={onEdit}><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
            <div className="dropdown-divider"></div>
            <li><a className="dropdown-item text-danger" href="#" onClick={onDelete}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
          </ul>
        </div>
      </td>
    </tr>

  );
}

export default ItemMovie;