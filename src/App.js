import { useState, createContext, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { RoleTypes } from "./config";
import Footer from "./components/Footer";
import Snackbar from "./components/Snackbar";

export const GeneralContext = createContext();
export const TOKEN = "d2960c7d-3431-11ee-b3e9-14dda9d4a5f0";

export default function App() {
  const [searchWord, setSearchWord] = useState("");
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

    const snackbar = text => {
        setSnackbarText(text);
        setTimeout(() => setSnackbarText(''), 3000);
    }

  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
      })
      .catch((err) => {
        setRoleType(RoleTypes.none);
      })
      .finally(() => setLoader(false));
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        setLoader,
        roleType,
        setRoleType,
        searchWord,
        setSearchWord,
        isDarkMode,
        handleDarkModeToggle,
        snackbar,
      }}
    >
      <div
        className="app"
        style={{ backgroundColor: isDarkMode ? "#1a1625" : "#fff" }}
      >
        <Navbar />
        <Router />
        <Footer />
        {loader && <Loader />}
        {snackbarText && <Snackbar text={snackbarText} />}
      </div>
    </GeneralContext.Provider>
  );
}
