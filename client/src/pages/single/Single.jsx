import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";


const Single = () => {
  const { _id } = useParams();
  const [onePensioner, setOnePensioner] = useState([]);
  const [toggleAddMenu, setToggleAddMenu] = useState(false);

  useEffect(() => {
    fetch(`/mypensioners`, {
      headers: {
        Authorization: "AA " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const pensioner = data.myPensioners.filter((elem) => elem._id === _id);
        setOnePensioner(pensioner[0]);
      });
  }, [_id]);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={onePensioner.photo ? onePensioner.photo : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{onePensioner.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{onePensioner.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+{onePensioner.phoneNum}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{onePensioner.age}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{onePensioner.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pension:</span>
                  <span className="itemValue">{onePensioner.pension} sum</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">
            Last Payments
            <Link to="#" className="link" onClick={() => setToggleAddMenu(!toggleAddMenu)}>
              Add New
            </Link>
          </h1>
          <List pensioner_Id={_id} toggleMenu={toggleAddMenu} />
        </div>
      </div>
    </div>
  );
};

export default Single;
