import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import TextareaAutosize from 'react-textarea-autosize';


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);



  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) { }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) { }
  };

  return (
    <div className="singlePost">
      <div className="p-5 pr-0 flex flex-col">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="w-full h-[300px] rounded-md object-cover" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="m-3 text-playfair text-3xl text-center border-none border-b-2 border-b-slate-400 focus:outline-none bg-biru-abu"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-center m-3 text-playfair text-3xl">
            {title}
            {post.username === user?.username && (
              <div className="float-right text-base">
                <i
                  className="ml-3 cursor-pointer text-blue-500 far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="ml-3 cursor-pointer text-red-600 far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="mb-5 flex justify-between text-base text-kuning">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link ">
              <b className="hover:text-kuning"> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <TextareaAutosize
            className="border-none text-playfair text-lg leading-6 focus:outline-none bg-biru-abu"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="text-lg text-playfair first-letter:ml-5 first-letter:text-3xl first-letter:font-semibold">{desc}</p>
        )}
        {updateMode && (
          <button className="w-[100px] border-none bg-biru-tombol p-1 text-white rounded-md cursor-pointer self-end mt-5" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
