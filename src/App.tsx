import { Space, Button } from "antd";
import "antd/dist/reset.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AboutUs from "./pages/index";
import Profile from "./pages/profile";
import SignIn from "./pages/signin";
import { CustomRouter } from "./utils/CustomRouter";
import { history } from "./utils/history";

function App() {
  const token = localStorage.getItem("token");
  let validToken = null;
  if (!token) {
    validToken = false;
  } else {
    validToken = true;
  }
  if (!validToken) {
    history.replace("/signin");
    // return  ="/signin" replace />;
  }
  return (
    <CustomRouter history={history}>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <nav className="flex justify-between items-center mt-2">
          <div className="text-sm">
            <NavLink to="/">
              <Button type="default">AboutUs</Button>
            </NavLink>
            <NavLink to="/profile">
              <Button type="default">Profile</Button>
            </NavLink>
            <NavLink to="/signin">
              <Button type="default">Singin</Button>
            </NavLink>
            {validToken && (
              <Button
                type="default"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Singout
              </Button>
            )}
          </div>
        </nav>
        <Routes>
          <Route index element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer
          // className="px-4 md:px-6 lg:px-4 w-full max-w-7xl"
          autoClose={3000}
          position="bottom-center"
          hideProgressBar
          pauseOnFocusLoss={false}
          closeButton
          closeOnClick={false}
          draggable={false}
          limit={3}
        />
      </Space>
    </CustomRouter>
  );
}

export default App;
