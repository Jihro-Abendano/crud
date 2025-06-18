import React, { useEffect } from "react"; // Make sure useEffect is imported
import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const EditModal = ({
  editModal,
  toggleEditModal,
  handleEditPost,
  selectedPost,
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title || ""); // Initialize with existing title
      setMessage(selectedPost.message || ""); // Initialize with existing message
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPost({ postId: selectedPost.postId, title, message });

    toggleEditModal();
  };

  return (
    <Modal isOpen={editModal} toggle={toggleEditModal}>
      {" "}
      <ModalHeader>Edit Post</ModalHeader>{" "}
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </FormGroup>{" "}
          <FormGroup>
            {" "}
            <Label for="message">Message</Label>
            <Input
              id="message"
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggleEditModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
