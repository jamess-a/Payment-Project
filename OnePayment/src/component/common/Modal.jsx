import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Modal = ({ open, Topic, Message, Status, onClose }) => {
  if (open) {
    withReactContent(Swal)
      .fire({
        title: Topic,
        text: Message,
        icon: Status,
        confirmButtonText: "Close",
      })
      .then(() => {
        if (onClose) onClose();
      });
  }
  return null;
};

export default Modal;
