import { useEffect, createContext, useReducer } from "react";
import Home from "./pages/home/Home";
import { Login, SignUp } from "./pages/login/index";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { userInfo } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { userReducer, initialState } from "./reducer/userReducer";


export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }else{
      navigate("/login");
    }
  },[]);


  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login className="App login" />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":_id" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInfo} title="Add New User" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { darkMode } = useContext(DarkModeContext);


  return (
    <UserContext.Provider value={{state, dispatch}}>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    </UserContext.Provider>

  );
}

export default App;
