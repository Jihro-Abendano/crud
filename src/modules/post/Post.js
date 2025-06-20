import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./Post.module.scss";

import usePost from "./usePost";

import TablePosts from "../../components/tableposts/TablePosts";
import PageButtons from "../../components/pagebuttons/PageButtons";
import AddModal from "../../components/addmodal/AddModal";
import EditModal from "../../components/editmodal/EditModal";
import DeleteModal from "../../components/deletemodal/DeleteModal";
import ExpiredModal from "../../components/expiredmodal/ExpiredModal";
import ViewModal from "../../components/viewmodal/ViewModal";

const Post = () => {
  const {
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
    handleViewModal,
    handleAddPost,
    handleEditPost,
    handleDeletePost,
  } = usePost();

  return (
    <section className={styles["post"]}>
      <div className={styles["post-container"]}>
        <div className={styles["post-greeting"]}>
          Hello {firstName || "User"} {lastName || ""}
          <Button onClick={handleLogout} color="secondary">
            Log out
          </Button>
        </div>
        <div className={styles["post-buttons"]}>
          <Button onClick={toggleAddModal} color="success">
            Create Post
          </Button>{" "}
        </div>
        <TablePosts
          posts={currentPosts}
          setSelectedPost={setSelectedPost}
          toggleViewModal={toggleViewModal}
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
        />

        <PageButtons
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <ViewModal
        viewModal={viewModal}
        toggleViewModal={toggleViewModal}
        handleViewModal={handleViewModal}
        selectedPost={selectedPost}
      />

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

      <ExpiredModal expired={expired} handleLogout={handleLogout} />
    </section>
  );
};

export default Post;
