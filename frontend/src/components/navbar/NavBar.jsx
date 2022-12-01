import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import L from "../../assets/L.png";

export default function NavBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://new-lookist-api.vercel.app/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="h-20 ml-5 mr-5 bg-biru-muda sticky mt-5 flex items-center rounded-lg">
      <div className="justify-start pl-9 flex-1">
        <img src={L} alt="" className="scale-90" />
      </div>
      <div className="flex-auto">
        <ul className="flex space-x-5 justify-center m-0 p-0 font-medium text-lg">
          <li className="cursor-pointer hover:text-kuning">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="cursor-pointer hover:text-kuning">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="cursor-pointer hover:text-kuning">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="cursor-pointer hover:text-kuning" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-end pr-9">
        {user ? (
          <Link to="/settings">
            <img className="w-10 h-10 rounded-full object-cover cursor-pointer" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="flex space-x-5 justify-center m-0 p-0 font-medium text-lg">
            <li className="cursor-pointer hover:text-kuning">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="cursor-pointer hover:text-kuning">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="text-xl cursor-pointer text-white hover:text-kuning ml-5 fas fa-search"></i>
      </div>
    </div>
  );
}
