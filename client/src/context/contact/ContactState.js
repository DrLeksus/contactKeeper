import React, { useReducer } from "react";
import uuid from "uuid";
import contactReducer from "./contactReducer";
import ContactContext from "./contactContext";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT
  // CLEAR_FILTER,
  // FILTER_CONTACTS
} from "../types";

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
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // Delte contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Update contact
  const updateContact = contact => {
    console.log("contact", contact);
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  // Filter contact

  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
