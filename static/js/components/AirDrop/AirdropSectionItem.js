import React from "react";

const AirdropSectionItem = ({
  onClick,
  title,
  note,
  link,
  Icon,
  RightIcon,
  isBool,
}) => {
  if (isBool !== undefined) {
    if (isBool) {
      RightIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
            fill="white"
            fill-opacity="0.1"
          />
          <path
            d="M14.375 6.875L8.53835 13.75L5.625 10.3125"
            stroke="#36BE14"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else
      RightIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle cx="10" cy="10" r="8.75" stroke="white" strokeWidth="2" />
        </svg>
      );
  }
  return (
    <div
      className="item"
      onClick={onClick}
      style={{ cursor: "auto", justifyContent: "space-between", width: "100%" }}
    >
      <div
        className="mission__name"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="icon">{Icon}</div>
        <div
          className="sec"
          style={{ flex: 1, marginLeft: 10, marginRight: 20 }}
        >
          <h5 className="ttl">{title}</h5>
          {note ? <h6 className="note">{note}</h6> : null}
          {/* {link ? (
          <a
            target="_blank"
            href={link}
            className="note"
            style={{
              border: '1px solid',
              width: 'fit-content',
              padding: '2px 5px',
              marginTop: 5,
              borderRadius: 10,
              color: '#326fa8'
            }}
            rel="noreferrer"
          >
            {link}
          </a>
        ) : null} */}
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
        {RightIcon ? (
          RightIcon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.5 3.75L13.75 10L7.5 16.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default AirdropSectionItem;
