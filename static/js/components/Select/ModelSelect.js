import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useModel } from "../../services/mediaService";
import { toImageUrl } from "../../utils/file";

const style = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    background: "#25282D",
    border: "0.5px solid rgb(255, 255, 255);",
    borderRadius: 15,
    minWidth: 300,
    color: "white",
    height: 45,
  }),

  menu: (baseStyles, state) => ({
    ...baseStyles,
    background: "linear-gradient(to right, #36373b 2%, #171920 100%)",
    border: "none",
    zIndex: 1000,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
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

export const ModelSelect = ({ id, value, setValue }) => {
  const { data, isLoading } = useModel(id);
  const newData = useMemo(() => {
    const defaultModel = {
      value: undefined,
      label: "Default Model",
      image: null,
    };
    if (!data?.data) return [defaultModel];
    const d = [...data?.data]
      .sort((a, b) => b.id - a.id)
      .map((e) => ({
        value: e.file_key || e.model_name,
        label: e.model_name,
        image: e.thumbnail,
      }));
    return [defaultModel, ...d];
  }, [isLoading, data?.data]);
  const selectedOption =
    newData?.find((option) => option.value === value) || null;
  const CustomSingleValue = ({ data }) => (
    <div className="pl-4 flex items-center gap-4 w-full absolute  bottom-1">
      {data?.image && (
        <img
          src={toImageUrl(data?.image)}
          alt={data.label}
          width={30}
          height={30}
          className="object-cover rounded-lg aspect-[1]"
        />
      )}
      <div className="flex flex-col ">
        <p className="flex gap-2 items-center text-gray-400 text-lg">
          <svg
            viewBox="0 0 18 19"
            focusable="false"
            class="chakra-icon css-hgxz4z"
            width="14"
            height="14"
            fill="#9ca3af"
          >
            <path d="M7.80104 0.787254C8.16562 0.597626 8.57911 0.497803 9 0.497803C9.42089 0.497803 9.83438 0.597617 10.1989 0.787227C10.1993 0.787412 10.1996 0.787598 10.2 0.787783L16.8 4.18914C17.1645 4.37892 17.4672 4.65182 17.6779 4.98043C17.8885 5.30906 17.9996 5.68186 18 6.06142V12.8646C17.9996 13.2442 17.8885 13.6175 17.6779 13.9461C17.4672 14.2747 17.1645 14.5475 16.8 14.7373L16.798 14.7383L10.2 18.1387C10.1995 18.139 10.1991 18.1392 10.1987 18.1394C9.83417 18.329 9.42079 18.4287 9 18.4287C8.57921 18.4287 8.16583 18.3289 7.80127 18.1394C7.80085 18.1392 7.80043 18.1389 7.8 18.1387L1.20199 14.7383L1.2 14.7373C0.835519 14.5475 0.532779 14.2747 0.322159 13.9461C0.111528 13.6175 0.000432 13.2447 0 12.8651V6.0619C0.000432 5.68233 0.111528 5.30906 0.322159 4.98043C0.532779 4.65182 0.835519 4.37892 1.2 4.18914L1.20198 4.18811L7.8 0.787783C7.80035 0.787607 7.80069 0.787431 7.80104 0.787254ZM9 1.42544C8.75931 1.42544 8.52274 1.4826 8.31425 1.59115L8.3123 1.59218L1.71429 4.9925C1.71398 4.99266 1.71368 4.99282 1.71338 4.99297C1.50551 5.1014 1.33284 5.25716 1.21266 5.44467C1.09234 5.63239 1.02886 5.84534 1.02857 6.06215V12.8643C1.02886 13.0812 1.09234 13.2941 1.21266 13.4819C1.33285 13.6693 1.50555 13.8252 1.71346 13.9335C1.71373 13.9337 1.71318 13.9334 1.71346 13.9335L8.31425 17.3354C8.52274 17.4439 8.75931 17.5011 9 17.5011C9.24069 17.5011 9.47726 17.4439 9.68575 17.3354L9.6877 17.3344L16.2857 13.934C16.286 13.9339 16.2855 13.9342 16.2857 13.934C16.4937 13.8256 16.6672 13.6693 16.7873 13.4819C16.9077 13.294 16.9712 13.081 16.9714 12.8641V6.06238C16.9712 5.84548 16.9077 5.63245 16.7873 5.44467C16.6672 5.25716 16.4945 5.1014 16.2866 4.99297C16.2863 4.99282 16.286 4.99266 16.2857 4.9925L9.6877 1.59218L9.68575 1.59115C9.47726 1.4826 9.24069 1.42544 9 1.42544Z"></path>
            <path d="M0.323352 4.94381C0.465572 4.72208 0.780181 4.6463 1.02604 4.77457L8.99967 8.9344L16.9733 4.77457C17.2192 4.6463 17.5337 4.72208 17.676 4.94381C17.8182 5.16555 17.7342 5.44927 17.4884 5.57754L9.25723 9.87178C9.0979 9.9549 8.90144 9.9549 8.74212 9.87178L0.511015 5.57754C0.265145 5.44927 0.181131 5.16555 0.323352 4.94381Z"></path>
            <path d="M9.00013 8.99878C9.28411 8.99878 9.51441 9.20648 9.51441 9.4626V18.034C9.51441 18.2901 9.28411 18.4978 9.00013 18.4978C8.71614 18.4978 8.48584 18.2901 8.48584 18.034V9.4626C8.48584 9.20648 8.71614 8.99878 9.00013 8.99878Z"></path>
          </svg>
          model
        </p>

        <p>{data.label}</p>
      </div>
    </div>
  );
  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="custom-option pl-4 p-1 flex items-center gap-4 hover:bg-[#ff5c01]"
      >
        {data?.image && (
          <img
            src={toImageUrl(data?.image)}
            alt={data.label}
            width={50}
            height={50}
            className="object-cover rounded-lg aspect-[1]"
          />
        )}
        <div className="flex flex-col ">
          <p className="flex gap-2 items-center text-gray-400 text-lg">
            <svg
              viewBox="0 0 18 19"
              focusable="false"
              class="chakra-icon css-hgxz4z"
              width="14"
              height="14"
              fill="#9ca3af"
            >
              <path d="M7.80104 0.787254C8.16562 0.597626 8.57911 0.497803 9 0.497803C9.42089 0.497803 9.83438 0.597617 10.1989 0.787227C10.1993 0.787412 10.1996 0.787598 10.2 0.787783L16.8 4.18914C17.1645 4.37892 17.4672 4.65182 17.6779 4.98043C17.8885 5.30906 17.9996 5.68186 18 6.06142V12.8646C17.9996 13.2442 17.8885 13.6175 17.6779 13.9461C17.4672 14.2747 17.1645 14.5475 16.8 14.7373L16.798 14.7383L10.2 18.1387C10.1995 18.139 10.1991 18.1392 10.1987 18.1394C9.83417 18.329 9.42079 18.4287 9 18.4287C8.57921 18.4287 8.16583 18.3289 7.80127 18.1394C7.80085 18.1392 7.80043 18.1389 7.8 18.1387L1.20199 14.7383L1.2 14.7373C0.835519 14.5475 0.532779 14.2747 0.322159 13.9461C0.111528 13.6175 0.000432 13.2447 0 12.8651V6.0619C0.000432 5.68233 0.111528 5.30906 0.322159 4.98043C0.532779 4.65182 0.835519 4.37892 1.2 4.18914L1.20198 4.18811L7.8 0.787783C7.80035 0.787607 7.80069 0.787431 7.80104 0.787254ZM9 1.42544C8.75931 1.42544 8.52274 1.4826 8.31425 1.59115L8.3123 1.59218L1.71429 4.9925C1.71398 4.99266 1.71368 4.99282 1.71338 4.99297C1.50551 5.1014 1.33284 5.25716 1.21266 5.44467C1.09234 5.63239 1.02886 5.84534 1.02857 6.06215V12.8643C1.02886 13.0812 1.09234 13.2941 1.21266 13.4819C1.33285 13.6693 1.50555 13.8252 1.71346 13.9335C1.71373 13.9337 1.71318 13.9334 1.71346 13.9335L8.31425 17.3354C8.52274 17.4439 8.75931 17.5011 9 17.5011C9.24069 17.5011 9.47726 17.4439 9.68575 17.3354L9.6877 17.3344L16.2857 13.934C16.286 13.9339 16.2855 13.9342 16.2857 13.934C16.4937 13.8256 16.6672 13.6693 16.7873 13.4819C16.9077 13.294 16.9712 13.081 16.9714 12.8641V6.06238C16.9712 5.84548 16.9077 5.63245 16.7873 5.44467C16.6672 5.25716 16.4945 5.1014 16.2866 4.99297C16.2863 4.99282 16.286 4.99266 16.2857 4.9925L9.6877 1.59218L9.68575 1.59115C9.47726 1.4826 9.24069 1.42544 9 1.42544Z"></path>
              <path d="M0.323352 4.94381C0.465572 4.72208 0.780181 4.6463 1.02604 4.77457L8.99967 8.9344L16.9733 4.77457C17.2192 4.6463 17.5337 4.72208 17.676 4.94381C17.8182 5.16555 17.7342 5.44927 17.4884 5.57754L9.25723 9.87178C9.0979 9.9549 8.90144 9.9549 8.74212 9.87178L0.511015 5.57754C0.265145 5.44927 0.181131 5.16555 0.323352 4.94381Z"></path>
              <path d="M9.00013 8.99878C9.28411 8.99878 9.51441 9.20648 9.51441 9.4626V18.034C9.51441 18.2901 9.28411 18.4978 9.00013 18.4978C8.71614 18.4978 8.48584 18.2901 8.48584 18.034V9.4626C8.48584 9.20648 8.71614 8.99878 9.00013 8.99878Z"></path>
            </svg>
            model
          </p>

          <p>{data.label}</p>
        </div>
      </div>
    );
  };

  return isLoading || !newData.length ? null : (
    <div>
      <h2 className="sec-ttl">Custom model</h2>
      <Select
        options={newData}
        id="select2"
        menuPosition="fixed"
        menuPortalTarget={document.body}
        placeholder="Custom model..."
        styles={style}
        menuPlacement="auto"
        onChange={(newValue) => {
          setValue(newValue.value);
        }}
        value={selectedOption}
        components={{
          SingleValue: CustomSingleValue,
          Option: CustomOption,
        }}
      />
    </div>
  );
};

const CustomSingleValue = ({ data }) => (
  <div className="pl-4 flex items-center gap-4 w-full absolute  p-4">
    {data?.image && (
      <img
        src={toImageUrl(data?.image)}
        alt={data.label}
        width={30}
        height={30}
        className="object-cover rounded-lg aspect-[1]"
      />
    )}
    <div className="flex flex-col ">
      <p>{data.label}</p>
    </div>
  </div>
);
const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="custom-option pl-4 p-1 flex items-center gap-4 hover:bg-[#ff5c01]"
    >
      {data?.image && (
        <img
          src={toImageUrl(data?.image)}
          alt={data.label}
          width={50}
          height={50}
          className="object-cover rounded-lg aspect-[1]"
        />
      )}
      <div className="flex flex-col ">
        <p>{data.label}</p>
      </div>
    </div>
  );
};
export const CoinSelect = ({ value, setValue, listData, isLoading }) => {
  const newData = useMemo(() => {
    if (!listData) return [];
    return listData?.map((e) => ({
      value: e.currency,
      label: e.name,
      image: e.image,
    }));
  }, [listData]);
  const selectedOption =
    newData?.find((option) => option.value === value) || null;

  return isLoading || !newData.length ? null : (
    <div>
      <h2 className="sec-ttl">Select coin</h2>
      <Select
        options={newData}
        id="select2"
        menuPosition="fixed"
        menuPortalTarget={document.body}
        placeholder="Search coin..."
        styles={style}
        menuPlacement="auto"
        onChange={(newValue) => {
          setValue(newValue.value);
        }}
        value={selectedOption}
        components={{
          SingleValue: CustomSingleValue,
          Option: CustomOption,
        }}
      />
    </div>
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
