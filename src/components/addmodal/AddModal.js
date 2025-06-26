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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPost({ title, message });
    setTitle("");
    setMessage("");
    toggleAddModal();
  };
  return (
    <Modal isOpen={addModal} toggle={toggleAddModal} centered>
      <ModalHeader>Add Post</ModalHeader>

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
          </Button>{" "}
          <Button color="secondary" onClick={toggleAddModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddModal;
