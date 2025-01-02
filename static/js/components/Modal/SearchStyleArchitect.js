import React, { useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { motion } from "framer-motion";
import { ArchitectStyle } from "../../data/template/architect-data";
const SearchStyleArchitect = ({ onSelect, onClose, list = ArchitectStyle }) => {
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

              <StyleListArchitect
                keyword={keyword}
                onSelect={onSelect}
                list={list}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StyleListArchitect = ({ keyword: query, onSelect, list }) => {
  const keyword = useDebounce(query);

  const searchData = useMemo(() => {
    if (!keyword) return list.slice(0, 48);
    return list
      .filter((x) => {
        return x.style.toLowerCase().includes(keyword.toLowerCase());
      })
      .slice(0, 48);
  }, [keyword]);
  return (
    <>
      <p className="sec-ttl">
        {keyword ? `Result ( ${searchData.length} )` : "Recommended style"}
      </p>
      <div className="expore-list">
        {searchData.map((item) => {
          return (
            <p
              key={item.id}
              className="expore-list__item"
              style={{ aspectRatio: 1 }}
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

export default SearchStyleArchitect;
