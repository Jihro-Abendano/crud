import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const usePost = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleAddModal = () => setAddModal((prev) => !prev);
  const toggleEditModal = () => setEditModal((prev) => !prev);
  const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };

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
      console.error("Error adding post: ", err);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      toggleDeleteModal();
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post: ", err);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  });

  return {
    token,
    firstName,
    lastName,
    posts,
    selectedPost,
    setSelectedPost,
    addModal,
    editModal,
    deleteModal,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    handleLogout,
    handleAddPost,
    handleEditPost,
    handleDeletePost,
  };
};

export default usePost;
