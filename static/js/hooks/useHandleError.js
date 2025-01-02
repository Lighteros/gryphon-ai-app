import { useModal } from "../context/modalContext";
import { useUser } from "../context/AuthContext";

const useHandleError = () => {
  const { openModal } = useModal();
  const { completedStartMission } = useUser();

  const getError = (error) => {
    if (error === "NOT_ENOUGH_CREDIT") {
      if (completedStartMission) {
        openModal("payment");
      } else {
        openModal("airdrop-missions");
      }
    }
  };
  return getError;
};

export default useHandleError;
