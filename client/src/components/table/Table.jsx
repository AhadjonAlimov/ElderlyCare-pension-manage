import { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import M from "materialize-css";


const List = ({ pensioner_Id, toggleMenu }) => {
  const [getData, setGetData] = useState([]);
  const [rowsData, setRowsData] = useState({
    month: "",
    amount: 0,
    date: "",
    payMethod: "",
  });
  
  useEffect(() => {
    fetch(`/mypensioninfo`, {
      headers: {
        Authorization: "AA " + localStorage.getItem("jwt"),
        id: pensioner_Id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.myPensionInfo.reverse();
        const dataId = data.myPensionInfo.map((elem, i) => {
          elem.id = i + 1;
          return elem;
        });
        setGetData(dataId);
      });
  }, [])

  const addPension = () => {
    let newDate = new Date();
    let date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    let currentDate = date + " " + time;
    fetch("/pensionInfo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "AA " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        month: rowsData.month,
        amount: rowsData.amount,
        date: currentDate,
        payMethod: rowsData.payMethod,
        pensionerId: pensioner_Id,
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: "Successfully added", classes: "#43a047 green darken-1" });
          window.location.reload();
          // filter data after posted new data // just for myself
          // const newData = getData.filter((item) => item._id !== result._id);
          // newData.unshift(result);
        }
      })
      .catch((err) => console.log(err))
  };

  const addRowsData = (e) => {
    setRowsData({ ...rowsData, [e.target.name]: e.target.value });
  }


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Month</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>

          <TableRow style={toggleMenu ? { background: "rgb(235, 233, 233)" } : { display: "none" }}>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">
              <select name="month" id="" onChange={(e) => addRowsData(e)}>
                <option>Select month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </TableCell>
            <TableCell className="tableCell">This date</TableCell>
            <TableCell className="tableCell">
              <input
                type="number"
                placeholder="amount"
                name="amount"
                onChange={(e) => addRowsData(e)}
              />
            </TableCell>
            <TableCell className="tableCell">
              <select name="payMethod" id="" onChange={(e) => addRowsData(e)}>
                <option>Select method</option>
                <option value="Debit / Credit card">Debit / Credit card</option>
                <option value="Cash">Cash</option>
              </select>
            </TableCell>
            <TableCell className="tableCell">
              <button className="payButton" onClick={addPension}>Pay</button>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {getData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.month}</TableCell>
              <TableCell className="tableCell">{Date(row.date)}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.payMethod}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
