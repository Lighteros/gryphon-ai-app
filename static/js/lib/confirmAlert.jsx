import { confirmAlert as confirmAlertLib } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const confirmAlert = ({ isPending, onClick, message = 'Are you sure to do this?', title = 'Confirm to submit' }) => {
  return confirmAlertLib({
    title,
    message,
    isLoading: isPending,
    overlayClassName: '!bg-black/70 backdrop-blur-md ',
    
    buttons: [
      {
        label: 'Confirm',
        className: '!bg-[#01c7cc]',
        onClick
      },
      {
        label: 'Cancel'
      }
    ]
  });
};
export default confirmAlert;
