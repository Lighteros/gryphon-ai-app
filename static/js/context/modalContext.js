import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const ModalContext = createContext({
  type: "",
  isShow: false,
  data: null,

  openModal: (type, data) => undefined,
  closeModal: () => undefined,
});
const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({
    type: "",
    isShow: false,
    data: null,
  });

  const openModal = useCallback(
    (type, data) =>
      setModal({
        type,
        isShow: true,
        data,
      }),
    []
  );
  const closeModal = useCallback(() => {
    setModal({
      type: "",
      isShow: false,
      data: null,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      isShow: modal.isShow,
      type: modal.type,
      data: modal.data,
      openModal,
      closeModal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modal.isShow, modal.data, modal.type]
  );
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  return useContext(ModalContext);
};
export default ModalContextProvider;
