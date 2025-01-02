import { Switch } from "@headlessui/react";
import React from "react";
const ResultTrain = () => {
  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          <div className="flex items-center gap-4 justify-between pb-10 text-2xl">
            <div className="flex items-center space-x-2 gap-4">
              <p className="text-3xl font-bold">Preparing training GPU</p>
              <p className="text-[#9C9C9C] font-bold text-2xl">
                Position <span className="text-[#0051dd] text-3xl">1</span> /
                All 1
              </p>
            </div>
            <div className="flex-grow gap-4 mx-4">
              <div className="relative w-full h-6 bg-gray-800 rounded-full">
                <div className="absolute top-0 left-0 h-6 bg-[#0051dd] rounded-full w-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl">Actual cost : 42 power</span>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="#586169"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 flex-col-reverse md:flex-row">
            <div className="container mx-auto p-6 rounded-lg  bg-[#1D1F23] w-full md:w-[70%]">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  LoRA <span className="text-[#0051dd]">5 / 5</span>
                </h1>
                <div className="flex items-center gap-6 text-[#BEBEBE] font-bold">
                  <span className="border-r-[1px] pr-6">Parameters</span>

                  <span>Log View</span>
                  <Switch className="group relative flex h-10 w-16 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#0051dd]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-8 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
                    />
                  </Switch>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                  <label
                    className="swap-policy"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 5,
                      cursor: "pointer",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input type="checkbox" />
                    <span
                      className="check"
                      style={{
                        borderColor: "#01c7cc",
                        width: "2.4rem",
                        height: "2.4rem",
                      }}
                    ></span>
                  </label>
                </div>
                <div>
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                </div>
                <div>
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                </div>
                <div>
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                </div>
                <div>
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                </div>
                <div>
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-center mt-6 md:flex-row gap-6">
                <div className="flex flex-1 items-center gap-4  justify-start">
                  <label className="swap-policy " style={{ marginBottom: 0 }}>
                    <input type="checkbox" />
                    <span className="check"></span>
                    <span className="text-check">Select all</span>
                  </label>
                  <p className="text-[#808080]">
                    {" "}
                    Selected <span className="text-[#0051dd]">0</span>
                  </p>
                </div>
                <div className="flex flex-1 flex-wrap gap-2 w-full ">
                  <button className="bg-[#3D3D3D] flex-1 text-white font-bold py-4 px-10 rounded flex gap-4 items-center justify-center">
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                        fill="#C9C9C9"
                      />
                    </svg>
                    Delete
                  </button>
                  <button className="bg-[#3D3D3D] flex-1 text-white font-bold py-4 px-10 rounded flex gap-4 items-center justify-center">
                    <svg
                      width="18"
                      height="22"
                      viewBox="0 0 18 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.625 6.5H9.75V13.6892L12.2198 11.2198C12.3616 11.0851 12.5505 11.0111 12.746 11.0136C12.9416 11.0161 13.1285 11.0949 13.2668 11.2332C13.4051 11.3715 13.4839 11.5584 13.4864 11.754C13.4889 11.9495 13.4149 12.1384 13.2802 12.2802L9.53016 16.0302C9.38952 16.1707 9.19883 16.2497 9 16.2497C8.80117 16.2497 8.61048 16.1707 8.46984 16.0302L4.71984 12.2802C4.58513 12.1384 4.51114 11.9495 4.51364 11.754C4.51614 11.5584 4.59495 11.3715 4.73325 11.2332C4.87155 11.0949 5.0584 11.0161 5.25398 11.0136C5.44955 11.0111 5.63836 11.0851 5.78016 11.2198L8.25 13.6892V6.5H3.375C2.67904 6.50074 2.01179 6.77754 1.51967 7.26967C1.02755 7.76179 0.750744 8.42904 0.75 9.125V18.875C0.750744 19.571 1.02755 20.2382 1.51967 20.7303C2.01179 21.2225 2.67904 21.4993 3.375 21.5H14.625C15.321 21.4993 15.9882 21.2225 16.4803 20.7303C16.9725 20.2382 17.2493 19.571 17.25 18.875V9.125C17.2493 8.42904 16.9725 7.76179 16.4803 7.26967C15.9882 6.77754 15.321 6.50074 14.625 6.5ZM9.75 1.25C9.75 1.05109 9.67098 0.860322 9.53033 0.71967C9.38968 0.579018 9.19891 0.5 9 0.5C8.80109 0.5 8.61032 0.579018 8.46967 0.71967C8.32902 0.860322 8.25 1.05109 8.25 1.25V6.5H9.75V1.25Z"
                        fill="#C9C9C9"
                      />
                    </svg>
                    Download
                  </button>
                  <button className="bg-[#3D3D3D] flex-1 text-white font-bold py-4 px-10 rounded flex gap-4 items-center justify-center">
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.4903 1.71481C21.5103 1.59457 21.4985 1.4712 21.4562 1.3569C21.4139 1.24261 21.3424 1.14135 21.2489 1.06314C21.1554 0.984927 21.0432 0.932483 20.9232 0.910992C20.8032 0.889501 20.6797 0.899709 20.5649 0.940605L0.964886 7.9406C0.83569 7.98667 0.722877 8.06969 0.640459 8.17933C0.558041 8.28897 0.509651 8.42041 0.501299 8.55732C0.492947 8.69423 0.525002 8.83057 0.593482 8.94942C0.661962 9.06826 0.763848 9.16437 0.886486 9.22581L6.48649 12.0258C6.59685 12.081 6.71985 12.1061 6.84303 12.0985C6.9662 12.0909 7.08518 12.0508 7.18789 11.9824L11.8359 8.88281L9.05409 12.3632C8.99355 12.439 8.94941 12.5265 8.92447 12.6202C8.89953 12.7139 8.89433 12.8117 8.90921 12.9076C8.92408 13.0034 8.9587 13.0951 9.01087 13.1768C9.06305 13.2586 9.13163 13.3286 9.21229 13.3824L17.6123 18.9824C17.7096 19.0471 17.8215 19.0864 17.9378 19.0967C18.0542 19.1071 18.1712 19.0882 18.2784 19.0417C18.3856 18.9952 18.4794 18.9226 18.5513 18.8306C18.6233 18.7386 18.671 18.63 18.6903 18.5148L21.4903 1.71481Z"
                        fill="#C9C9C9"
                      />
                    </svg>
                    Publish
                  </button>
                </div>
              </div>
            </div>
            <div className=" mx-auto p-6   bg-[#1D1F23] rounded-lg w-full md:w-[30%] ">
              <h2 className="text-2xl mb-6 font-bold">Samples</h2>
              <div className="flex flex-col gap-24 items-center">
                <div className="w-full h-full relative">
                  <img
                    alt="Artistic portrait of a lady"
                    className="rounded-lg mb-4"
                    src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                  />
                  <div className="backdrop-blur p-4  absolute bottom-0 w-full text-start right-0">
                    <p className="text-xl font-bold">
                      LoRA05 Step:100 Epoch:5
                      <br />
                      “one lady”
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-6 px-6 rounded">
                    Test LoRA
                  </button>
                  <div className="w-full flex gap-4">
                    <button className="bg-[#3D3D3D] text-white font-bold py-6 px-4 rounded flex-1">
                      Re-train
                    </button>
                    <button className="bg-[#3D3D3D] text-white font-bold py-6 px-4 rounded flex-1">
                      Start New Training
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTrain;
