import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import NavBar from "../../components/navbar/NavBar";
import TextareaAutosize from 'react-textarea-autosize';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) { }
  };
  return (
    <>
      <NavBar />
      <div className="pt-12">
        {file && (
          <img className="ml-36 w-[80vw] h-80 rounded-xl object-cover" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="relative" onSubmit={handleSubmit}>
          <div className="flex ml-36 item-center">
            <label htmlFor="fileInput">
              <i className="w-8 h-8 flex items-center justify-center text-xl text-white cursor-pointer mt-[22px] fa-regular fa-image"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="text-3xl border-none p-5 w-[70vw] focus:outline-none bg-biru-abu"
              autoFocus={true}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="flex ml-36 item-center">
            <textarea
              placeholder="Tell your story..."
              type="text"
              className="text-xl h-[100vw] border-none p-5 w-[70vw] focus:outline-none bg-biru-abu"
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <button className="absolute top-5 right-[150px] text-white bg-biru-tombol p-[10px] border-none cursor-pointer text-base rounded-md hover:bg-kuning hover:text-black" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
