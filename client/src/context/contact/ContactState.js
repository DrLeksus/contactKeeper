import React, { useReducer } from "react";
// import uuid from "uuid";
import contactReducer from "./contactReducer";
import ContactContext from "./contactContext";
// import {
//   ADD_CONTACT,
//   DELETE_CONTACT,
//   SET_CURRENT,
//   CLEAR_CURRENT,
//   UPDATE_CONTACT,
//   CLEAR_FILTER,
//   FILTER_CONTACTS
// } from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@johnson.com",
        phone: "555-you-wish",
        type: "professional"
      },
      {
        id: 2,
        name: "Dave Rubin",
        email: "dave@camo.com",
        phone: "555-you-want",
        type: "personal"
      },
      {
        id: 3,
        name: "Ms Piggy",
        email: "oink@oink.com",
        phone: "555-more-more",
        type: "personal"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  // Delte contact

  // Set current contact

  // Clear current contact

  // Update contact

  // Filter contact

  // Clear filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
