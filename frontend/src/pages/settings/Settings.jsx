import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/navbar/NavBar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import profileimage from "../../assets/profile.png"
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex ml-3 mt-3">
        <div className="settingsWrapper p-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl mb-5">Settings</span>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="flex items-center my-2 mx-0">
              <img
                src={file ? profileimage + URL.createObjectURL(file) : PF + user.profilePic}
                alt="" className="w-20 h-20 rounded-2xl object-cover"
              />
              <label htmlFor="fileInput">
                <i className="w-12 h-12 text-white items-center flex justify-center ml-3 cursor-pointer fa-solid fa-user-pen hover:text-kuning"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label className="mt-5">Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none mt-1 w-[350px] bg-biru-abu border-b-[1px] border-b-white placeholder:text-biru-muda"
            />
            <label className="mt-5">Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none mt-1 w-[350px] bg-biru-abu border-b-[1px] border-b-white placeholder:text-biru-muda"
            />
            <label className="mt-5">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none mt-1 w-[350px] bg-biru-abu border-b-[1px] border-b-white"
            />
            <button className="w-[150px] self-start rounded-lg text-white bg-biru-tombol p-2 mt-9 cursor-pointer hover:bg-kuning hover:text-black" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{ color: "green", textAlign: "center", marginTop: "20px" }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
