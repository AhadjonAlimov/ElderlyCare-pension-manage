import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [pData, setPData] = useState([]);

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
        setPData(dataId);
      })
  }, [])

  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amountP={pData.length} />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest all payments</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
