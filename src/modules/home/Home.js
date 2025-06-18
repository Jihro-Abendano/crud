import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import styles from "./Home.module.scss";
import axios from "../../api/axios";
import AddModal from "../../components/addmodal/AddModal";
import EditModal from "../../components/editmodal/EditModal";

const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  const [selectedPost, setSelectedPost] = useState(null);

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditModal(true);
  };

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
      const response = await axios.get("/post?orderBy=createdAt&order=DESC", {
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

  const handleEditPost = async (updatedPost) => {
    try {
      const token = cookies.get("token");
      await axios.put(`/post/${updatedPost.postId}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error updating post: ", err);
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
      <Table striped responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No posts yet
              </td>
            </tr>
          ) : (
            posts.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td>{post.message}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button onClick={() => openEditModal(post)} color="warning">
                    Edit
                  </Button>{" "}
                  <Button>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Button onClick={toggleAddModal} color="success">
        Create Post
      </Button>{" "}
      <Button color="info">Edit profile</Button>{" "}
      <Button onClick={handleLogout} color="secondary">
        Log out
      </Button>
      <AddModal
        addModal={addModal}
        toggleAddModal={toggleAddModal}
        handleAddPost={handleAddPost}
      />
      <EditModal
        editModal={editModal}
        toggleEditModal={toggleEditModal}
        handleEditPost={handleEditPost}
        selectedPost={selectedPost}
      />
    </section>
  );
};

export default Home;
