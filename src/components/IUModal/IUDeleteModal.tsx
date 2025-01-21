import { Button, Modal } from "antd";
import { useState } from "react";

const IUDeleteModal = ({
  children,
  showModal,
  isModalOpen,
  setIsModalOpen,
}) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default IUDeleteModal;
