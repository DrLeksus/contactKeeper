import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    !filtered && (text.current.value = "");
  });
  // }, [contactContext, filtered, text]);

  const handleChange = e => {
    console.log("text", text);
    text.current.value ? filterContacts(e.target.value) : clearFilter();
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter contacts.."
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactFilter;
