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

  const [expired, setExpired] = useState(false);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleViewModal = () => setViewModal((prev) => !prev);
  const toggleAddModal = () => setAddModal((prev) => !prev);
  const toggleEditModal = () => setEditModal((prev) => !prev);
  const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");
    navigate("/");
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/post?orderBy=createdAt&order=DESC", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response.data;
      setPosts(data);
    } catch (err) {
      if (err.response?.status === 403) {
        setExpired(true);
      }
      console.error("Error fetching posts: ", err);
    }
  };

  const handleViewPost = async (post) => {
    try {
      await axios.get(`/post/${post.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toggleViewModal();
    } catch (err) {
      console.error("Error getting post: ", err);
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
      if (err.response?.status === 403) {
        setAddModal(false);

        setExpired(true);
      }
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
      if (err.response?.status === 403) {
        setEditModal(false);
        setExpired(true);
      }
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
      if (err.response?.status === 403) {
        setDeleteModal(false);
        setExpired(true);
      }
      console.error("Error deleting post: ", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    token,
    expired,
    currentPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    firstName,
    lastName,
    posts,
    selectedPost,
    setSelectedPost,
    viewModal,
    addModal,
    editModal,
    deleteModal,
    toggleViewModal,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    handleLogout,
    handleViewPost,
    handleAddPost,
    handleEditPost,
    handleDeletePost,
  };
};

export default usePost;
