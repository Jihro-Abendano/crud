import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./Post.module.scss";

import usePost from "./usePost";

import TablePosts from "../../components/tableposts/TablePosts";
import AddModal from "../../components/addmodal/AddModal";
import EditModal from "../../components/editmodal/EditModal";
import DeleteModal from "../../components/deletemodal/DeleteModal";

const Post = () => {
  const {
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
  } = usePost();

  if (!token) return <Navigate to="/" replace />;

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
      <span></span>
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

export default Post;
