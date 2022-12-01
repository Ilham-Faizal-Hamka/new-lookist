import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import NavBar from "../../components/navbar/NavBar";

export default function Single() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SinglePost />
        <Sidebar />
      </div>
    </>
  );
}
