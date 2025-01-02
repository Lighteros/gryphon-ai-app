import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  "en-US": {
    EMAIL_NOT_PROVIDED: "Email not specified.",
    EMAIL_INUSED: "Email already in use.",
    PASSWORD_NOT_PROVIDED: "Password not specified.",
    EMAIL_OR_PASSWORD_INCORRECT: "Email or password incorrect.",
    USER_NOT_FOUND: "User not found.",
    USER_LOCKED: "User locked.",
    USER_NOT_ACTIVATED: "User not activated.",
    APP_SERVICE_NOT_FOUND: "App service not found.",
    TOKEN_INVALID: "Invalid token.",
    TOKEN_NOT_PROVIDED: "Token not provided.",
    APIKEY_NOT_PROVIDED: "API key not provided.",
    APIKEY_INVALID: "Invalid API key.",
    AUTHENTICATE_TOKEN_FAILED: 'Authentication token failed."',
    GRANT_TYPE_INVALID: "Invalid grant type",
    INVALID_INPUT_DATA: "Invalid input data",
    UNAUTHORIZED: "Unauthorized.",
    NOT_ENOUGH_CREDIT: "Insufficient credit, please top up your balance",
    REQUIRED_LINK_DISCORD_ACCOUNT: "You must link Discord",
    REQUIRED_WALLET_CONNECT: "You must connect wallet",
    REQUIRED_LINK_TWITTER_ACCOUNT: "You must link X (Twitter)",
  },
});

strings.setLanguage("en-US");
export default strings;
