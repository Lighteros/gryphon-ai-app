import React, { useEffect, useState } from "react";
import ReactJoyride, { STATUS } from "react-joyride";
import AppRoute from "../routes/AppRoute";
import { APP_ROUTE } from "../routes/link";
import { useModal } from "../context/modalContext";
const style = {
  buttonNext: {
    background: "linear-gradient(87deg, #01c7cc 4.51%, #ffa800 95.73%)",
    fontWeight: 700,
  },
  buttonBack: {
    color: "#000",
    fontWeight: 700,
  },
  buttonSkip: {
    fontWeight: 700,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
  },
  buttonClose: {
    fontWeight: 700,
  },
  options: {
    fontWeight: 700,
    width: "100%",

    // backgroundColor: '#000',
    // textColor: '#fff',
    // primaryColor: '#000',
    // border: '1px solid rgba(255, 255, 255, 0.1)'
  },
};
const steps = {
  [APP_ROUTE.TEXT_TO_IMAGE.id]: [
    {
      content: <h3>Instructions for using this feature!</h3>,
      placement: "center",
      target: "body",
    },
    {
      target: ".option__box",
      content: "Select the size for the image you want to create.",
    },
    {
      target: ".option__box1",
      content: "Select the number of images you want to create.",
    },
    {
      target: ".edition-style__list",
      content: "Then, select a style for your image.",
    },

    {
      target: ".edition__message",
      content: "Please type a prompt above to create your first image set!",
    },
    {
      target: ".btn-basic",
      content: "Finally, click this button to begin creating.",
      placement: "top",
    },
  ],
  // [APP_ROUTE.IMAGE_TO_IMAGE.id]: [
  //   {
  //     content: <h3>Instructions for using this feature!</h3>,
  //     placement: 'center',
  //     target: 'body'
  //   },
  //   {
  //     target: '.edition-style__list',
  //     content: 'Then, select a style for your image.'
  //   },

  //   {
  //     target: '.edition__message',
  //     content: 'Please type a prompt above to create your first image set!'
  //   },
  //   {
  //     target: '.edition-update',
  //     content: 'Select the image you want to change the style of.'
  //   },

  //   {
  //     target: '.btn-basic',
  //     content: 'Finally, click this button to begin creating.',
  //     placement: 'top'
  //   }
  // ],
  [APP_ROUTE.FACE_SWAP.id]: [
    {
      content: <h3>Instructions for using this feature!</h3>,
      placement: "center",
      target: "body",
    },
    {
      target: ".swap-list .swap-list__item:first-child",
      content: "Choose the facial image you want to merge into another photo.",
    },
    {
      target: ".swap-list .swap-list__item:last-child",
      content: "Select the image you want to merge the face into.",
    },
    {
      target: ".btn-basic",
      content: "Finally, click this button to begin creating.",
      placement: "top",
    },
  ],
  [APP_ROUTE.TEXT_TO_VIDEO.id]: [
    {
      content: <h3>Instructions for using this feature!</h3>,
      placement: "center",
      target: "body",
    },
    {
      target: ".edition__message",
      content: "Please type a prompt above to create your first video set!",
    },
    {
      target: ".btn-basic",
      content: "Finally, click this button to begin creating.",
      placement: "top",
    },
  ],
  [APP_ROUTE.FACE_DANCE.id]: [
    {
      content: <h3>Instructions for using this feature!</h3>,
      placement: "center",
      target: "body",
    },
    {
      target: ".tab-content",
      content: "Please select the video you want to face dance.",
      placement: "top",
    },
    {
      target: ".swap-list__file",
      content: "Upload your face image.",
      placement: "top",
    },
    {
      target: ".btn-basic",
      content: "Finally, click this button to begin creating.",
      placement: "top",
    },
  ],

  MISSION: [
    {
      content: <h3>Instructions for using this feature!</h3>,
      placement: "center",
      target: "body",
    },
    {
      target: ".mission__name",
      content: "The task name you have to accomplish.",
    },
    {
      target: ".mission__button-action",
      content: "Press to execute the task.",
    },
    {
      target: ".mission__button-verify",
      content:
        "Press the button to check if the task has been completed or not.",
      placement: "top",
    },
  ],
};
const Tutorials = ({ id }) => {
  const [run, setRun] = useState(false);
  const { type, isShow } = useModal();
  useEffect(() => {
    if (isShow && type == "airdrop-missions" && id !== "MISSION") {
      return;
    }
    const l = JSON.parse(localStorage.getItem(`tutorials`));
    let idClear = null;
    if (!l?.includes(id)) {
      idClear = setTimeout(() => {
        setRun(true);
      }, 1500);
    }
    return () => {
      idClear && clearTimeout(idClear);
    };
  }, [id, type, isShow]);
  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status) || type === "beacon") {
      setRun(false);
      const l = JSON.parse(localStorage.getItem(`tutorials`)) || [];
      if (l.includes(id)) return;
      window.scrollTo({ top: 0 });
      l.push(id);
      localStorage.setItem(`tutorials`, JSON.stringify(l));
    }
  };
  return (
    <ReactJoyride
      run={run}
      callback={handleJoyrideCallback}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps[id]}
      // disableOverlayClose={true}
      // disableCloseOnEsc={true}
      styles={style}
    />
  );
};

export default Tutorials;
