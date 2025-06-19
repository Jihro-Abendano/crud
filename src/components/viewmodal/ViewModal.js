import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewModal = ({ viewModal, toggleViewModal, selectedPost }) => {
  if (!selectedPost) return null;

  return (
    <Modal isOpen={viewModal} toggle={toggleViewModal}>
      <ModalHeader toggle={toggleViewModal}>View Post</ModalHeader>
      <ModalBody>
        <h5>Title:</h5>
        <p>{selectedPost.title}</p>
        <h5>Message:</h5>
        <p>{selectedPost.message}</p>
        <h5>Created At:</h5>
        <p>{new Date(selectedPost.createdAt).toLocaleDateString()}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleViewModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewModal;
