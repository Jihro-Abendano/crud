import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./Home.module.scss";
import axios from "../../api/axios";
import TablePosts from "../../components/tableposts/TablePosts";
import AddModal from "../../components/addmodal/AddModal";
import EditModal from "../../components/editmodal/EditModal";
import DeleteModal from "../../components/deletemodal/DeleteModal";

const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const [selectedPost, setSelectedPost] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");

    navigate("/");
  };

  const fetchPosts = async (page = 1) => {
    try {
      const response = await axios.get(
        "/post?orderBy=createdAt&order=DESC&limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data, meta } = response.data;
      setPosts(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    try {
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

  const handleDeletePost = async (post) => {
    try {
      await axios.delete(`/post/${post.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toggleDeleteModal();
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post: ", err);
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
      <Button onClick={toggleAddModal} color="success">
        Create Post
      </Button>
      <Button color="info">Edit profile</Button>
      <Button onClick={handleLogout} color="secondary">
        Log out
      </Button>

      <TablePosts
        posts={posts}
        setSelectedPost={setSelectedPost}
        toggleEditModal={toggleEditModal}
        toggleDeleteModal={toggleDeleteModal}
      />

      <Button>Previous</Button>
      <span>
        Page {currentPage} of {meta.totalPages}
      </span>
      <Button>Next</Button>
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
      <DeleteModal
        deleteModal={deleteModal}
        toggleDeleteModal={toggleDeleteModal}
        handleDeletePost={handleDeletePost}
        selectedPost={selectedPost}
      />
    </section>
  );
};

export default Home;
