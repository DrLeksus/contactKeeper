import React, { useContext, Fragment, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  useEffect(() => {
    getContacts();
    // !loading && getContacts();
    // eslint-disable-next-line
  }, []);

  const contactContext = useContext(ContactContext);
  // let { contacts, filtered, getContacts, loading } = contactContext;
  let { contacts, filtered, getContacts } = contactContext;

  // if (contacts !== null && contacts.length === 0 && !loading)
  if (contacts !== null && contacts.length === 0)
    return <h4 className="text-center">Please add a contact</h4>;
  filtered && ([contacts, filtered] = [filtered, contacts]);

  return (
    <Fragment>
      {contacts !== null ? (
        // {contacts !== null && !loading ? (
        <TransitionGroup>
          {contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={1000} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
