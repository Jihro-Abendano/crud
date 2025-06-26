import React, { useEffect, useState } from "react";
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
      setTitle(selectedPost.title || "");
      setMessage(selectedPost.message || "");
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPost({ postId: selectedPost.postId, title, message });

    toggleEditModal();
  };

  return (
    <Modal isOpen={editModal} toggle={toggleEditModal} centered>
      {" "}
      <ModalHeader>Edit Post</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              id="message"
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditModal;
