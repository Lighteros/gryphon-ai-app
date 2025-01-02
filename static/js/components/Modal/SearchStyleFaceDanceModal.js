import React from "react";
import { motion } from "framer-motion";
const SearchStyleFaceDanceModal = ({ onSelect, onClose, data }) => {
  return (
    <div className="popup__body">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="p-content"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "20px",
            background: "#000",
          }}
        >
          <div
            className="popup__close "
            onClick={() => onClose()}
            style={{ padding: "6px", zIndex: 1 }}
          ></div>

          <div className="p-content__wrap">
            <div className="expore">
              <StyleListFaceDance onSelect={onSelect} data={data} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StyleListFaceDance = ({ onSelect, data }) => {
  return (
    <div className="expore-list">
      {data.map((item) => {
        return (
          <p
            key={item.id}
            className="expore-list__item"
            onClick={() => onSelect(item)}
          >
            <img src={item.thumbnail} alt="stabilityworld" loading="lazy" />
          </p>
        );
      })}
    </div>
  );
};

export default SearchStyleFaceDanceModal;
