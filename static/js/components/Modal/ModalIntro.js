import React from "react";
import { useModal } from "../../context/modalContext";

const ModalIntro = () => {
  const { openModal, closeModal } = useModal();
  return (
    <div id="popup">
      <div className="popup__close js-close-popup" onClick={closeModal}></div>
      <div style={{ background: "#000" }}>
        {/* <h4 style={{ textAlign: 'start', color: '#FFF', paddingTop: 8 }}>Introduction</h4> */}
        <div>
          <img src="/assets/images/NESAmascot.png" alt="introduction" />
        </div>
      </div>
    </div>
  );
};

export default ModalIntro;
