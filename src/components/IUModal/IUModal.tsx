import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
type TIUModalProps = {
  children: ReactNode;
  item?: any;
};
const IUModal = ({ children, item }: TIUModalProps) => {
  // console.log(item);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
        footer={[]}
      >
        {children}
      </Modal>
    </>
  );
};

export default IUModal;
