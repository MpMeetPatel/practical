import "antd/dist/reset.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Index from "./pages";
import AboutUs from "./pages/aboutus";
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
      <nav className="flex justify-between items-center mt-2">
        <div className="text-sm">
          <NavLink to="/signup">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              AboutUs
            </a>
          </NavLink>
          <NavLink to="/profile">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Profile
            </a>
          </NavLink>
          <NavLink to="/signin">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Singin
            </a>
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/aboutus" element={<AboutUs />} />

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
    </CustomRouter>
  );
}

export default App;
