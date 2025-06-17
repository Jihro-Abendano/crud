import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./Home.module.scss";
import axios from "../../api/axios";
import AddModal from "../../components/addmodal/AddModal";

const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");

    navigate("/");
  };

  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const response = await axios.get("/post?orderBy=title&order=DESC", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data.data);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    try {
      const token = cookies.get("token");
      await axios.post("/post", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error adding posts: ", err);
    }
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={styles["home"]}>
      <div className={styles["home-greeting"]}>
        Hello {firstName || "User"} {lastName || ""}
      </div>

      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.postId}>
              {post.title}
              {post.message}
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={toggleAddModal}>Create Post</Button>
      <Button>Edit profile</Button>
      <Button onClick={handleLogout}>Log out</Button>

      <AddModal
        addModal={addModal}
        toggleAddModal={toggleAddModal}
        handleAddPost={handleAddPost}
      />
    </section>
  );
};

export default Home;
