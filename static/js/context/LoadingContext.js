import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

const Context = createContext({
  showLoading: true,
  toggleLoading: (type) => undefined,
});
const LoadingContextProvider = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true);

  const toggleLoading = useCallback((show, processing) => {
    if (show === undefined) setShowLoading((x) => !x);
    else setShowLoading(show);
  }, []);

  const contextValue = useMemo(
    () => ({
      toggleLoading,
      showLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showLoading]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export const useAppLoading = () => {
  return useContext(Context);
};
export default LoadingContextProvider;
