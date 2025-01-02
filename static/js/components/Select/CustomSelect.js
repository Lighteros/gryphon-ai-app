import React, { useMemo } from "react";
import Select from "react-select";

const style = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    background: "rgb(255 255 255 / 0.05)",
    borderRadius: 8,
    color: "white",
    height: 36,
    border: "none",
  }),

  menu: (baseStyles, state) => ({
    ...baseStyles,
    background: "#1D1F23",
    border: "none",
    zIndex: 9999,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    zIndex: 9999,
    backgroundColor: state.isSelected
      ? "#ff5c01"
      : "linear-gradient(to right, #36373b 2%, #171920 100%)",
    color: "white",
    ":hover": {
      backgroundColor: state.isSelected ? "#ff5c01" : "gray",
      color: state.isSelected ? "white" : "white",
    },
  }),
};

export const CustomSelect = ({
  data,
  value,
  setValue,
  position = "bottom",
  disabled = false,
}) => {
  const newData = useMemo(() => {
    if (!data) return [];
    const arr = data?.map((e) => {
      return { value: e.key, label: e.value };
    });
    return arr;
  }, [data]);
  const selectedOption = newData.find((option) => option.value === value);
  return !newData.length ? null : (
    <Select
      options={newData}
      id="select2"
      menuPosition="fixed"
      menuPortalTarget={document.body}
      styles={style}
      menuPlacement={position}
      onChange={(newValue) => {
        setValue(newValue.value);
      }}
      value={selectedOption}
      defaultValue={newData[0]}
      isDisabled={disabled}
    />
  );
};
// export const ServiceSelect = ({ value, setValue }) => {
//   const { data, isLoading } = useServiceList();
//   const newData = useMemo(() => {
//     return data?.data?.map((e) => {
//       return { value: e.id, label: e.name };
//     });
//   }, [isLoading]);

//   return (
//     <Select
//       options={newData}
//       placeholder="Select service..."
//       styles={style}
//       value={value}
//       onChange={(e) => {
//         setValue(e);
//       }}
//     />
//   );
// };
