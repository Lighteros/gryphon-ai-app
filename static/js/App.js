import "./App.css";
import Modal from "react-modal";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import ModalContainer from "./components/ModalContainer";
import GetRefCode from "./components/GetRefCode";
import Footer from "./components/Footer/Footer";
import AppRoute from "./routes/AppRoute";
import CatchAuthToken from "./components/CatchAuthToken";
import LoadingContextProvider from "./context/LoadingContext";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Web3ModalProvider } from "./context/WagmiContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollTop from "./components/ScrollTop";
Modal.setAppElement("#root");
window.history.replaceState({}, "");
function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCoAZOA3qEXELUjgZe1iNdl7uCX1qmjal4",
      authDomain: "stabilitylanding.firebaseapp.com",
      projectId: "stabilitylanding",
      storageBucket: "stabilitylanding.appspot.com",
      messagingSenderId: "1000402894428",
      appId: "1:1000402894428:web:4fbe9309d47c87fb2d7099",
      measurementId: "G-9W4NZYVDMX",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }, []);

  return (
    <ErrorBoundary>
      <Web3ModalProvider>
        <LoadingContextProvider>
          <AuthContextProvider>
            <div className="App">
              <ToastContainer
                transition={Bounce}
                autoClose={3000}
                position="top-right"
                theme="dark"
              />
              <AppRoute />

              <ScrollTop />
            </div>
            <ModalContainer />
            <GetRefCode />
            <CatchAuthToken />
          </AuthContextProvider>
        </LoadingContextProvider>
      </Web3ModalProvider>
    </ErrorBoundary>
  );
}

export default App;
