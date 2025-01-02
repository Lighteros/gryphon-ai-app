import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ onPageChange, pageCount, pageIndex }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const display = width > 768 ? 3 : 1;
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      className="pagination-list"
      activeClassName="active"
      onPageChange={(p) => onPageChange(p.selected + 1)}
      pageRangeDisplayed={display}
      pageCount={pageCount}
      forcePage={!pageIndex ? undefined : pageIndex - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
      marginPagesDisplayed={display}
    />
  );
};

export default Pagination;
