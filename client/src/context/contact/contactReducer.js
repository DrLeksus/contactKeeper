import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  FILTER_CONTACTS
} from "../types";

export default (state, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case GET_CONTACTS:
      console.log("GET_CONTACTS");
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      console.log("ADD_CONTACT");
      return {
        ...state,
        loading: false,
        contacts: [...state.contacts, action.payload]
      };
    case DELETE_CONTACT:
      console.log("DELETE_CONTACT");
      return {
        ...state,
        loading: false,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    case SET_CURRENT:
      console.log("SET_CURRENT");
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      console.log("CLEAR_CURRENT");
      return {
        ...state,
        loading: false,
        current: null
      };
    case CLEAR_CONTACTS:
      console.log("CLEAR_CONTACTS");
      return {
        ...state,
        contacts: null,
        loading: false
      };
    case UPDATE_CONTACT:
      console.log("UPDATE_CONTACT");
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case FILTER_CONTACTS:
      console.log("FILTER_CONTACTS");
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      console.log("CLEAR_FILTER");
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
