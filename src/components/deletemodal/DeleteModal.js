import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const DeleteModal = ({
  deleteModal,
  toggleDeleteModal,
  handleDeletePost,
  selectedPost,
}) => {
  return (
    <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
      <ModalHeader toggle={toggleDeleteModal}>Delete Post</ModalHeader>
      <ModalBody>
        Are you sure you want to delete {selectedPost?.title}?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => handleDeletePost(selectedPost)}>
          Delete
        </Button>
        <Button color="secondary" onClick={toggleDeleteModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
