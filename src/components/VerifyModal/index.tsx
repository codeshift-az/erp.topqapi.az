import { useState, useEffect } from "react";

// Reactstrap
import { Modal, ModalBody, Spinner } from "reactstrap";

interface Props {
  show: boolean;
  status: any;
  icon?: string;
  action: string;
  message: string;
  onClose: () => void;
  onVerify: () => void;
}

const VerifyModal = ({ show, icon, status, action, message, onClose, onVerify }: Props) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (show && isDone && status.lastAction === action && status.success) {
      setIsDone(false);
      onClose();
    }
  }, [status, onClose]);

  const handleVerify = () => {
    setIsDone(true);
    onVerify();
  };

  return (
    <Modal size="sm" isOpen={show} toggle={onClose} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button
            type="button"
            onClick={onClose}
            className="btn-close position-absolute end-0 top-0 m-3"></button>

          <div className="avatar-sm mb-4 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
              <i className={icon ? icon : "mdi mdi-trash-can-outline"}></i>
            </div>
          </div>

          <p className="text-muted font-size-16 mb-4">{message}</p>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-danger" onClick={handleVerify}>
              {status.loading ? <Spinner size="sm" /> : "Bəli"}
            </button>

            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Xeyr
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default VerifyModal;
