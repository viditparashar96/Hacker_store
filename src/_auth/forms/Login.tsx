import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className=" w-full h-screen flex">
      {/* Left Section */}
      <div className="md:w-[45%] h-full bg-zinc-900 p-6 relative hidden md:block">
        <h1 className="text-white font-semibold text-xl ">Hacker Store</h1>
        <div className=" absolute bottom-10 ">
          <h1 className="text-white font-semibold text-xl ">Welcome Back! </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-[55%] w-[100%] h-full  flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
