import React, { useContext, useEffect } from "react";
import ContactFilter from "../contacts/ContactFilter";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    // console.log("axios.defaults.headers.common", axios.defaults.headers.common);
    // isAuthenticated && loadUser();
    loadUser();
    // localStorage.token && loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
