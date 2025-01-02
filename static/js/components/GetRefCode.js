import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const GetRefCode = () => {
  // const [searchParams] = useSearchParams();
  // const ref_code = searchParams.get('ref');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref_code = urlParams.get("ref");
    if (ref_code) {
      localStorage.setItem("ref_code", ref_code);
    }
  }, []);
  return <></>;
};
export default GetRefCode;
