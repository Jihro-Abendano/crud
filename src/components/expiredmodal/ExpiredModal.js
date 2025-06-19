import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

const ExpiredModal = ({ expired, handleLogout }) => {
  return (
    <Modal isOpen={expired}>
      <ModalHeader>Session Expired</ModalHeader>
      <ModalBody>
        Your session has expired. Please log in again.
        <Button
          color="primary"
          onClick={() => {
            handleLogout();
          }}
        >
          Go to Login
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ExpiredModal;
