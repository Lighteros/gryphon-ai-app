import React, { useMemo, useState } from "react";
import { Styles } from "../../data/template/demo-data";
import { useDebounce } from "../../hooks/useDebounce";
import { motion } from "framer-motion";
const SearchStyleModal = ({ onSelect, onClose }) => {
  const [keyword, setKeyword] = useState("");

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
            // maxHeight: '80vh',
            overflowY: "auto",
            padding: "20px",
            background: "#000",
          }}
        >
          <div
            className="popup__close "
            onClick={() => onClose()}
            style={{ padding: "4px", zIndex: 1 }}
          ></div>

          <div className="p-content__wrap">
            <div className="expore">
              <div className="expore-search">
                <button></button>
                <input
                  className="input-search-styles"
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  type="text"
                  placeholder="Search styles"
                />
              </div>

              <StyleList keyword={keyword} onSelect={onSelect} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StyleList = ({ keyword: query, onSelect }) => {
  const keyword = useDebounce(query);

  const searchData = useMemo(() => {
    if (!keyword) return Styles.slice(0, 48);
    return Styles.filter((x) => {
      return x.prompt.toLowerCase().includes(keyword.toLowerCase());
    }).slice(0, 48);
  }, [keyword]);

  return (
    <>
      <p className="sec-ttl">
        {keyword ? `Result (${searchData.length})` : "Recommended style"}
      </p>
      <div className="expore-list">
        {searchData.map((item, index) => {
          return (
            <p
              key={index}
              className="expore-list__item"
              onClick={() => onSelect(item)}
            >
              <img src={item.thumbnail} alt="stabilityworld" />
            </p>
          );
        })}
      </div>
    </>
  );
};

export default SearchStyleModal;
