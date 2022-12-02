import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import NavBar from "../../components/navbar/NavBar";
import Lookist from "../../assets/lookist.png"


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location = "/";
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="BackgroundRegisterLogin object-contain bg-fixed fixed w-screen h-screen" >
        <NavBar />
        <div className="items-start p-5 justify-center min-h-min w-[450px] bg-white top-1/2 left-1/2 relative -translate-x-1/2 -translate-y-[290px] bg-opacity-30 rounded-xl border ">
          <img src={Lookist} alt="" className="scale-[0.70] mx-auto" />
          <form className="flex flex-col mt-0 w-[400px] mx-auto" onSubmit={handleSubmit}>
            <label className="mt-4">Username</label>
            <input
              type="text"
              className="rounded-md text-black p-3"
              placeholder="Enter your username..."
              ref={userRef}
            />
            <label className="mt-4">Password</label>
            <input
              type="password"
              className="rounded-md text-black p-3"
              placeholder="Enter your password..."
              ref={passwordRef}
            />
            {error && <div className="mt-4 bg-red-400 text-white rounded-md p-2">{error}</div>}
            <button className="mt-4 cursor-pointer bg-biru-tombol border text-white rounded-lg p-2 hover:bg-kuning hover:text-black" type="submit" disabled={isFetching}>
              Login
            </button>
            <div className="mt-4">
              Don't have an account ? <Link className="link text-kuning hover:text-biru-muda" to="/register" >Register now!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
