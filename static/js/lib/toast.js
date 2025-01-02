import { toast as toastLib } from "react-toastify";
import strings from "../helper/localized-strings";
import { ZodError } from "zod";
const toast = {
  success(message = "Successfully.", options) {
    toastLib.success(message, options);
  },
  error(
    message = "Cannot submit request. Check your internet connection.",
    options
  ) {
    if (API_ERROR_MESSAGE[message]) {
      message = API_ERROR_MESSAGE[message];
    }
    if (message instanceof ZodError) {
      const errorMessages = message.errors.map((issue) => ({
        message: `${issue.message}`,
      }));
      message = errorMessages.flatMap((x) => x.message).join(", ");
    }
    toastLib.error(message, options);
  },
  errorCustom(
    message = "Cannot submit request. Check your internet connection.",
    options
  ) {
    toastLib.error(message, options);
  },
  loading(message, options) {
    toastLib.info("Please wait!", options);
  },
  promise(promise) {
    return toastLib.promise(promise, {
      error: `Cannot submit request`,

      success: {
        render({ data }) {
          return `Successfully`;
        },
      },
      pending: "Please wait!",
    });
  },
  dismiss: toastLib.dismiss,
  info: toastLib.info,
  confirmBox: ({
    content,
    onConfirm,
    onCancel,
    cancelText = "Cancel",
    confirmText = "Confirm",
    isLoading,
    title = "Confirmation",
  }) =>
    toastLib(
      (t) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <h5 style={{ fontSize: 16 }}>{title}</h5>
          <p style={{ textAlign: "center" }}> {content}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <button
              className="btn"
              style={{
                minHeight: 32,
                minWidth: 72,
                background: "rgba(255, 255, 255, .3)",
                fontSize: 12,
              }}
              onClick={() => {
                onCancel && onCancel();
                toastLib.dismiss(t.id);
              }}
            >
              {cancelText}
            </button>
            <button
              className="btn"
              style={{ minHeight: 32, minWidth: 72, fontSize: 12 }}
              onClick={() => {
                onConfirm(() => toastLib.dismiss(t.toastProps.toastId));
              }}
            >
              {isLoading ? (
                <>
                  {" "}
                  <svg
                    className="animate-spin"
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.29183 14.0418H3.12516C2.8489 14.0418 2.58394 13.9321 2.38859 13.7367C2.19324 13.5414 2.0835 13.2764 2.0835 13.0002C2.0835 12.7239 2.19324 12.4589 2.38859 12.2636C2.58394 12.0682 2.8489 11.9585 3.12516 11.9585H7.29183C7.5681 11.9585 7.83305 12.0682 8.0284 12.2636C8.22375 12.4589 8.3335 12.7239 8.3335 13.0002C8.3335 13.2764 8.22375 13.5414 8.0284 13.7367C7.83305 13.9321 7.5681 14.0418 7.29183 14.0418ZM8.05225 10.021C8.24742 10.215 8.51143 10.3239 8.78662 10.3239C9.06182 10.3239 9.32583 10.215 9.521 10.021C9.61863 9.92416 9.69612 9.80895 9.74901 9.68201C9.80189 9.55508 9.82912 9.41893 9.82912 9.28141C9.82912 9.1439 9.80189 9.00775 9.74901 8.88081C9.69612 8.75388 9.61863 8.63867 9.521 8.54183L6.57308 5.60433C6.37381 5.43368 6.11748 5.3445 5.85532 5.35463C5.59315 5.36476 5.34447 5.47344 5.15895 5.65895C4.97344 5.84447 4.86476 6.09315 4.85463 6.35532C4.8445 6.61748 4.93368 6.87381 5.10433 7.07308L8.05225 10.021ZM12.5002 2.5835C12.2239 2.5835 11.9589 2.69324 11.7636 2.88859C11.5682 3.08394 11.4585 3.3489 11.4585 3.62516V7.79183C11.4585 8.0681 11.5682 8.33305 11.7636 8.5284C11.9589 8.72375 12.2239 8.8335 12.5002 8.8335C12.7764 8.8335 13.0414 8.72375 13.2367 8.5284C13.4321 8.33305 13.5418 8.0681 13.5418 7.79183V3.62516C13.5418 3.3489 13.4321 3.08394 13.2367 2.88859C13.0414 2.69324 12.7764 2.5835 12.5002 2.5835ZM21.8752 11.9585H17.7085C17.4322 11.9585 17.1673 12.0682 16.9719 12.2636C16.7766 12.4589 16.6668 12.7239 16.6668 13.0002C16.6668 13.2764 16.7766 13.5414 16.9719 13.7367C17.1673 13.9321 17.4322 14.0418 17.7085 14.0418H21.8752C22.1514 14.0418 22.4164 13.9321 22.6117 13.7367C22.8071 13.5414 22.9168 13.2764 22.9168 13.0002C22.9168 12.7239 22.8071 12.4589 22.6117 12.2636C22.4164 12.0682 22.1514 11.9585 21.8752 11.9585ZM12.5002 17.1668C12.2239 17.1668 11.9589 17.2766 11.7636 17.4719C11.5682 17.6673 11.4585 17.9322 11.4585 18.2085V22.3752C11.4585 22.6514 11.5682 22.9164 11.7636 23.1117C11.9589 23.3071 12.2239 23.4168 12.5002 23.4168C12.7764 23.4168 13.0414 23.3071 13.2367 23.1117C13.4321 22.9164 13.5418 22.6514 13.5418 22.3752V18.2085C13.5418 17.9322 13.4321 17.6673 13.2367 17.4719C13.0414 17.2766 12.7764 17.1668 12.5002 17.1668ZM16.8752 15.9064C16.7783 15.8088 16.6631 15.7313 16.5362 15.6784C16.4092 15.6255 16.2731 15.5983 16.1356 15.5983C15.9981 15.5983 15.8619 15.6255 15.735 15.6784C15.608 15.7313 15.4928 15.8088 15.396 15.9064C15.202 16.1016 15.0931 16.3656 15.0931 16.6408C15.0931 16.916 15.202 17.18 15.396 17.3752L18.3439 20.2918C18.5382 20.4796 18.7977 20.5845 19.0679 20.5845C19.338 20.5845 19.5976 20.4796 19.7918 20.2918C19.9858 20.0967 20.0947 19.8326 20.0947 19.5575C20.0947 19.2823 19.9858 19.0182 19.7918 18.8231L16.8752 15.9064ZM8.07308 15.9064L5.12516 18.8647C5.02804 18.9612 4.95086 19.0758 4.89804 19.2021C4.84521 19.3283 4.81778 19.4638 4.81729 19.6006C4.81681 19.7375 4.84329 19.8731 4.89522 19.9998C4.94715 20.1264 5.02352 20.2416 5.11995 20.3387C5.21639 20.4358 5.33102 20.513 5.45729 20.5658C5.58355 20.6187 5.71899 20.6461 5.85585 20.6466C5.99272 20.6471 6.12835 20.6206 6.25499 20.5687C6.38162 20.5167 6.49679 20.4404 6.59391 20.3439L9.54183 17.396C9.63946 17.2992 9.71696 17.184 9.76984 17.057C9.82273 16.9301 9.84995 16.7939 9.84995 16.6564C9.84995 16.5189 9.82273 16.3827 9.76984 16.2558C9.71696 16.1289 9.63946 16.0137 9.54183 15.9168C9.34666 15.7228 9.08265 15.6139 8.80746 15.6139C8.53226 15.6139 8.26825 15.7228 8.07308 15.9168V15.9064ZM16.9272 9.98975L19.8752 7.06266C19.9728 6.96583 20.0503 6.85062 20.1032 6.72368C20.1561 6.59674 20.1833 6.46059 20.1833 6.32308C20.1833 6.18557 20.1561 6.04942 20.1032 5.92248C20.0503 5.79554 19.9728 5.68033 19.8752 5.5835C19.68 5.38949 19.416 5.28059 19.1408 5.28059C18.8656 5.28059 18.6016 5.38949 18.4064 5.5835L15.4585 8.53141C15.2878 8.73069 15.1987 8.98701 15.2088 9.24918C15.2189 9.51134 15.3276 9.76003 15.5131 9.94554C15.6986 10.1311 15.9473 10.2397 16.2095 10.2499C16.4716 10.26 16.728 10.1708 16.9272 10.0002V9.98975Z"
                      fill="white"
                    />
                  </svg>
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      ),
      {
        autoClose: 20000,
        position: "top-center",
        className: "center",
      }
    ),
};
export default toast;
export const API_ERROR_MESSAGE = {
  EMAIL_NOT_PROVIDED: strings.EMAIL_NOT_PROVIDED,
  EMAIL_INUSED: strings.EMAIL_INUSED,
  PASSWORD_NOT_PROVIDED: strings.PASSWORD_NOT_PROVIDED,
  EMAIL_OR_PASSWORD_INCORRECT: strings.EMAIL_OR_PASSWORD_INCORRECT,
  USER_NOT_FOUND: strings.USER_NOT_FOUND,
  USER_LOCKED: strings.USER_LOCKED,
  USER_NOT_ACTIVATED: strings.USER_NOT_ACTIVATED,
  APP_SERVICE_NOT_FOUND: strings.APP_SERVICE_NOT_FOUND,
  TOKEN_INVALID: strings.TOKEN_INVALID,
  TOKEN_NOT_PROVIDED: strings.TOKEN_NOT_PROVIDED,
  APIKEY_NOT_PROVIDED: strings.APIKEY_NOT_PROVIDED,
  APIKEY_INVALID: strings.APIKEY_INVALID,
  AUTHENTICATE_TOKEN_FAILED: strings.AUTHENTICATE_TOKEN_FAILED,
  GRANT_TYPE_INVALID: strings.GRANT_TYPE_INVALID,
  INVALID_INPUT_DATA: strings.INVALID_INPUT_DATA,
  UNAUTHORIZED: strings.UNAUTHORIZED,
  NOT_ENOUGH_CREDIT: strings.NOT_ENOUGH_CREDIT,
  REQUIRED_LINK_DISCORD_ACCOUNT: strings.REQUIRED_LINK_DISCORD_ACCOUNT,
  REQUIRED_WALLET_CONNECT: strings.REQUIRED_WALLET_CONNECT,
  REQUIRED_LINK_TWITTER_ACCOUNT: strings.REQUIRED_LINK_TWITTER_ACCOUNT,
};
