import React from "react";
import { Table, Button } from "reactstrap";
const TablePosts = ({
  posts,
  setSelectedPost,
  toggleEditModal,
  toggleDeleteModal,
}) => {
  return (
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
                <Button
                  onClick={() => {
                    setSelectedPost(post);
                    toggleEditModal();
                  }}
                  color="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setSelectedPost(post);
                    toggleDeleteModal();
                  }}
                  color="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TablePosts;
