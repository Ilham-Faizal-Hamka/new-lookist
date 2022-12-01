import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ibnu from "../../assets/ibnu.png"


export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://lookist-api.vercel.app/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar m-5 p-7 bg-abu-abu rounded-lg flex flex-col items-center h-[700px]">
      <div className="flex flex-col items-start">
        <span className="my-2 mx-auto p-1 w-4/5 border-y-white border-y-2 text-md text-white font-semibold leading-5 text-center items-center">Contact Us</span>
        <img
          src={Ibnu}
          alt="" className="mt-4 mx-auto"
        />
        <p className="px-2 mt-3 font-semibold items-start">
          Want help?
        </p>
        <p className="px-2 items-start">
          We have friendly customer service resp on staff who are ready to help.
        </p>
        <a href="mailto: lookist2022@gmail.com" className="flex space-x-2 mt-4 px-2 items-start">
          <i className="pt-1 fa-solid fa-envelope"></i>
          <p className="px-2">
            lookist2022@gmail.com
          </p>
        </a>
        <p className="px-2 mt-4 font-semibold items-start">
          Openration Hours :
        </p>
        <p className="px-2 items-start">
          9am-6pm WIB
        </p>

      </div>
      <div className="flex flex-col items-center mt-3">
        <span className="m-2 p-1 w-4/5 border-y-white border-y-2 text-xs text-white font-semibold leading-5 text-center">CATEGORIES</span>
        <ul className="mb-8 list-none">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="inline-block w-1/2 mt-4 cursor-pointer">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
