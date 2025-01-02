import {
  CloseButton,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import ModalLib from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    borderRadius: 20,
    border: 0,
    transform: "translate(-50%, -50%)",
    zIndex: 2000,
    // display: 'flex',
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1999,
    backdropFilter: "blur(10px)",
  },
};
const Modal = ({
  children,
  isOpen,
  closeModal,
  zIndex = 1006,
  background = "#000",
  boxShadow = "0px 0px 100px 0px rgba(255, 107, 0, 0.12)",
}) => {
  customStyles.overlay.zIndex = zIndex;
  customStyles.content.boxShadow = boxShadow;
  customStyles.content.background = background;
  return (
    <ModalLib
      id="Modal-Container"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </ModalLib>
  );
};

export default Modal;

export const ModalHeadless = ({
  children,
  isOpen,
  closeModal,
  zIndex = 1006,
  background = "#000",
  boxShadow = "0px 0px 100px 0px rgba(255, 107, 0, 0.12)",
}) => {
  customStyles.overlay.zIndex = zIndex;
  customStyles.content.boxShadow = boxShadow;
  customStyles.content.background = background;
  return (
    <Dialog
      open={isOpen}
      onClose={() => closeModal(false)}
      className="relative z-[1] md:w-[50vw] "
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
        <DialogPanel
          transition={isOpen}
          className=" max-w-[100vw] bg-[#1D1F23] rounded-xl bg-white/5 backdrop-blur-2xl duration-300 transform-[scale(95%)] data-[closed]:opacity-0 relative"
        >
          <CloseButton
            className="popup__close "
            style={{ zIndex: 2, display: isOpen ? "block" : "none" }}
          ></CloseButton>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
