import { toast as toastLib } from "react-toastify";
import strings from "../../helper/localized-strings";

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
  info: toastLib.info,
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
