import React, { useReducer } from "react";
import contactReducer from "./contactReducer";
import ContactContext from "./contactContext";
import axios from "axios";
import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      console.log("err from getContatcs", err);
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delte contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // Clear contact
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
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

  // Filter contacts
  const filterContacts = searchText => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: searchText
    });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        getContacts,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
