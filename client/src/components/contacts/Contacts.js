import React, { useContext, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  let { contacts, filtered } = contactContext;

  if (contacts.length === 0)
    return <h4 className="text-center">Please add a contact</h4>;
  filtered && ([contacts, filtered] = [filtered, contacts]);

  return (
    <Fragment>
      <TransitionGroup>
        {contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={1000} classNames="item">
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
