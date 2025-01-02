/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useToggle } from "../../hooks/useToggle";
import Button from "../Ui/Button";

const ModalOutput = ({ onSubmit, onBack, isLoading }) => {
  const [toggleModal] = useToggle(false);

  return (
    <>
      <div id="popup" className="popup active">
        <div className="popup__body --advance">
          <div
            className="popup__close js-close-popup"
            onClick={toggleModal}
          ></div>
          <div className="advance-popup">
            <p className="advance-popup__ttl">Output video</p>
            <div className="advance-popup__wrap">
              <p>
                Generating a video requires significant computational resources.
                We understand the eagerness to see your creations come to life
                quickly. If faced with extended wait times, you might consider
                generating a different video. We want to assure you that behind
                the scenes, we've made considerable investments to optimize this
                Al technology. Our primary goal has always been to provide you
                with the best possible experience at the most affordable price.
                Please be patient; we will send you a notification once your
                video is ready. We genuinely appreciate your patience and
                understanding as we strive to strike this balance.
              </p>
              <div
                className="btn-basic --full"
                style={{ marginTop: 20 }}
                onClick={onBack}
              >
                Back
              </div>
              <Button
                variant="border"
                loading={isLoading}
                style={{
                  width: "100%",
                  borderColor: "#d9d8da",
                  margin: "2rem 0",
                }}
                onClick={onSubmit}
              >
                {" "}
                ETA: 15 minutes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalOutput;
