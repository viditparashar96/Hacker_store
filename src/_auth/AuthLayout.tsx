import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth);
  useEffect(() => {
    (() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })();
  }, []);
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="w-full flex flex-1">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
