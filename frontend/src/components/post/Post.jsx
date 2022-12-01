import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://new-lookist-api.vercel.app/images/";
  return (
    <div className="w-[400px] h-[460px] mt-0 mr-[58px] mb-10 bg-abu-abu p-5 rounded-lg ">
      {post.photo && <img className="w-full h-72 object-cover rounded-lg" src={PF + post.photo} alt="" />}
      <div className="flex flex-col items-center">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="text-xs text-kuning leading-5 mt-4 mr-2 cursor-pointer">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="text-2xl font-bold font-playfair mt-4 cursor-pointer hover:text-kuning">{post.title}</span>
        </Link>
        <hr />
        <span className="italic text-sm mt-4">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc font-playfair text-base mt-4 overflow-hidden text-ellipsis ">{post.desc}</p>
    </div>
  );
}
