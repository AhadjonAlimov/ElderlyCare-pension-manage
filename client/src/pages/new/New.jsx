import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import "../toast.scss";


const New = ({ title }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [pensioner, setPensioner] = useState({
    name: "",
    phoneNum: "",
    email: "",
    address: "",
    pension: 0,
    imgUrl: "",
  });
  const [calc, setCalc] = useState({
    gender: "",
    age: 0,
    experience: 0,
    salary: 0,
  });


  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ElderCare");
      data.append("cloud_name", "elderlycare1");
      fetch("https://api.cloudinary.com/v1_1/elderlycare1/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json())
        .then((data) => {
          setPensioner({ ...pensioner, imgUrl: data.url });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const postData = () => {
    fetch("/createpensioner", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "AA " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: pensioner.name,
        phoneNum: pensioner.phoneNum,
        email: pensioner.email,
        age: calc.age,
        address: pensioner.address,
        pension: pensioner.pension,
        photo: pensioner.imgUrl,
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: "Successfully added", classes: "#43a047 green darken-1" });
          navigate('/users');
        }
      })
  };

  const calculate = () => {
    if (calc.gender === "male" && calc.age >= 60) {
      if (calc.experience >= 25) {
        let percentage = (calc.experience - 25) + 55;
        const result = (calc.salary / 100) * percentage;
        return setPensioner({ ...pensioner, pension: Math.round(result) });
      } else if (calc.experience < 25 && calc.experience >= 7) {
        return setPensioner({ ...pensioner, pension: 460000 });
      } else {
        return setPensioner({ ...pensioner, pension: 0 });
      }
    } else if (calc.gender === "female" && calc.age >= 55) {
      if (calc.experience >= 20) {
        let percentage = (calc.experience - 20) + 55
        const result = (calc.salary / 100) * percentage;
        return setPensioner({ ...pensioner, pension: Math.round(result) });
      } else if (calc.experience < 20 && calc.experience >= 7) {
        return setPensioner({ ...pensioner, pension: 460000 });
      } else {
        return setPensioner({ ...pensioner, pension: 0 });
      }
    }
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="infoSide">
            <h2>Pensioner info</h2>
            <div className="image">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="No image"
              />
              <br />
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <br />
            <div className="infoInput">
              <div className="infoType">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Jon Doe"
                  value={pensioner.name}
                  onChange={(e) => setPensioner({ ...pensioner, name: e.target.value })}
                />
              </div>
              <div className="infoType">
                <label>Phone Number</label>
                <input
                  type="number"
                  placeholder="+1 123 456 7890"
                  value={pensioner.phoneNum}
                  onChange={(e) => setPensioner({ ...pensioner, phoneNum: e.target.value })}
                />
              </div>
              <div className="infoType">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="example@mail.com"
                  value={pensioner.email}
                  onChange={(e) => setPensioner({ ...pensioner, email: e.target.value })}
                />
              </div>
              <div className="infoType">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="address"
                  value={pensioner.address}
                  onChange={(e) => setPensioner({ ...pensioner, address: e.target.value })}
                />
              </div>
              <br />
              <br />
            </div>
          </div>
          <br />
          <div className="calcSide">
            <h2>Calculator</h2>
            <div className="gender">
              <p>Gender:</p>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={(e) => setCalc({
                  ...calc,
                  gender: e.target.value
                })}
                checked={calc.gender === 'male'}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={(e) => setCalc({
                  ...calc,
                  gender: e.target.value
                })}
                checked={calc.gender === 'female'}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="calcInput">
              <div className="calcType">
                <label>Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder={calc.gender === "female" ? "+55" : "+60"}
                  // value={calc.age}
                  onChange={(e) => setCalc({
                    ...calc,
                    age: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="calcType">
                <label>Work experience (Year)</label>
                <input
                  type="number"
                  id="experience"
                  placeholder={calc.gender === "female" ? "+20" : "+25"}
                  // value={calc.experience}
                  onChange={(e) => setCalc({
                    ...calc,
                    experience: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="calcType">
                <label>Your salary for 5 years in a row</label>
                <input
                  type="number"
                  id="salary"
                  placeholder="1 000 000"
                  // value={calc.salary}
                  onChange={(e) => setCalc({
                    ...calc,
                    salary: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="calcType">
                <label>Your estimated pension</label>
                <input
                  type="number"
                  id="pension"
                  disabled
                  placeholder="..."
                  value={pensioner.pension}
                />
              </div>
              <div className="calcType">
                <button style={{ width: "unset", padding: "5px 10px" }} onClick={calculate}>Calculate</button>
              </div>
            </div>
            <br />
            <p><b>Note:</b> This application works in accordance with the region of Uzbekistan and there may be some shortcomings.</p>
            <br />
            <button onClick={() => postData()}>ADD</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
