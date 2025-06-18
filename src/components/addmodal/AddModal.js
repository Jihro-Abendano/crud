import React from "react";
import { useState } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";

const AddModal = ({ addModal, toggleAddModal, handleAddPost }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    handleAddPost({ title, message });
    setTitle("");
    setMessage("");
    toggleAddModal();
  };
  return (
    <Modal isOpen={addModal}>
      <ModalHeader>Add Post</ModalHeader>
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
        <Button color="secondary" onClick={toggleAddModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddModal;
