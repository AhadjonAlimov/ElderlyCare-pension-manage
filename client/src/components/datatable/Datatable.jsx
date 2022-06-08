import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import M from "materialize-css";


const Datatable = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch("/mypensioners", {
      headers: {
        Authorization: "AA " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        const dataId = result.myPensioners.map((elem, i) => {
          elem.id = i + 1;
          return elem;
        })
        setData(dataId);
      })
  }, [])

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const handleDelete = (id) => {
    fetch(`/deletepensioner/${id}`, {
      method: "delete",
      headers: {
        Authorization: "AA " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.filter((item) => item._id !== result._id);
        setData(newData);
      })
      .catch(err => console.log(err));
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              // to="/users/test"
              to={`/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
