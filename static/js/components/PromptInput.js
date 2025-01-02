import React from "react";
const PromptInput = (
  {
    disabledInput = false,
    value,
    length,
    setValue,
    placeholder = "Examples: Dark 16th century Pirate Gallion ship, bokeh",
    title = "Description prompt",
    ...rest
  },
  ref
) => {
  return (
    <div style={{ position: "relative", marginBottom: 10, width: "100%" }}>
      <div style={{ position: "relative" }}>
        {/* <div
          style={{
            width: '100%',
            position: 'absolute',
            fontSize: 12,
            top: 5,
            color: '#808080',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <p style={{ padding: 5, paddingLeft: 10 }}> {title}</p>
        </div> */}
        <textarea
          id="edition__message"
          disabled={disabledInput}
          ref={ref}
          value={value}
          className="edition__message"
          style={{
            margin: "1rem 0px",
            borderRadius: "15px",
            border: "0.5px solid #fff",
          }}
          placeholder={placeholder}
          {...rest}
          onChange={(e) => setValue(e.target.value.substring(0, 1024))}
        ></textarea>
      </div>
      {/* <p style={{ position: 'absolute', fontSize: 14, left: 15, bottom: 5, color: '#808080' }}>
        {length || 0}/1024
      </p> */}
    </div>
  );
};

export default React.forwardRef(PromptInput);
