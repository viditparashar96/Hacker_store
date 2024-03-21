import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/Login";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import { login, logout } from "./store/authSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(login(token));
        console.log(token);
      } else {
        dispatch(logout());
        navigate("/login");
        console.log("No token");
      }
    })();
  }, [dispatch, navigate]);
  return (
    <main className="">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
          {/* <Route path="/add-product" element={<AddProduct />} /> */}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
