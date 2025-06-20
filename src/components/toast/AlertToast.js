import React from "react";
import { Toast, ToastHeader } from "reactstrap";

const AlertToast = ({ toast }) => {
  return (
    <div className="pb-2">
      <Toast isOpen={toast.visible} className={toast.toastColor}>
        <ToastHeader>{toast.message}</ToastHeader>
      </Toast>
    </div>
  );
};

export default AlertToast;
