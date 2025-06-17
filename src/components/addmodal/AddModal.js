import React from "react";
import { useState } from "react";
import { Modal } from "reactstrap";

const AddModal = ({ addModal, toggleAddModal, handleAddPost }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    handleAddPost({ title, message });
    setTitle("");
    setMessage("");
    toggleAddModal();
  };
  return <Modal i>adadsad</Modal>;
};

export default AddModal;
