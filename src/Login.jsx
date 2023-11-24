import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContest } from "./Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { logIn, logInWithGoogle } = useContext(AuthContest);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    logIn(email, password)
      .then((res) => {
        console.log(res);
        toast.success("Login Successfully");
        console.log("Location is get");
        console.log(res.user.email);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Password doesn't match");
      });
  };
  return (
    <>
      <p className="text-4xl font-bold text-center my-5  ">Please Login</p>
      <div className="hero ">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control my-1">
                <button className="btn bg-[#ff715b] text-[#FFF]">Login</button>
              </div>
              <button
                onClick={() => {
                  logInWithGoogle()
                    .then((res) => {
                      console.log(res);
                      toast.success("Login Successful");
                      navigate(location?.state ? location.state : "/");
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error(error.messegae);
                    });
                }}
                className="flex px-4 py-2 border-2 rounded-lg"
              >
                <div className="mr-5">
                  <img src={"https://i.ibb.co/1qPR4mG/Logo.png"}></img>
                </div>
                <div>Sign in with Google </div>
              </button>
              <p className="pt-2">
                Don&apos;t have an account?
                <Link
                  className="text-[#7ec6d5FF] font-bold ml-1"
                  to={"/signin"}
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Helmet>
          <title>CrowdChoice | LogIn</title>
        </Helmet>
      </div>
    </>
  );
};

export default Login;
