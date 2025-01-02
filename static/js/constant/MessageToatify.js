import { toast } from "react-toastify";

export const error_duplicate_email = () =>
  toast.error("Email has been used!", {
    className: "toast-message",
  });
// export const error_login = () =>
//   toast.error('Login failed!', {
//     className: 'toast-message'
//   });
export const login_success = () =>
  toast.success("Login Success!", {
    className: "toast-message",
  });

export const check_mail = () =>
  toast.warning("Please check email!", {
    className: "toast-message",
  });

export const reset_password_success = () =>
  toast.success("Reset password Success!", {
    className: "toast-message",
  });
export const reset_password_fail = () =>
  toast.error("Reset password failed!", {
    className: "toast-message",
  });
