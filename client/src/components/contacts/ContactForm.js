import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  // Local state to this component
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  // Did Update..
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        id: "",
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  /**
  |--------------------------------------------------
  | Handler
  |--------------------------------------------------
  */

  // Input change
  const handleChange = e => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  // Submit form
  const handleSubmit = e => {
    e.preventDefault();
    current === null ? addContact(contact) : updateContact(contact);

    // Clearing back to default
    clearCurrent();
    // setContact({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   type: "personal"
    // });
  };

  // clear
  const clearAll = () => {
    clearCurrent();
    console.log("r we clear?");
  };
  /**
|--------------------------------------------------
| Form
|--------------------------------------------------
*/
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {current ? "Update contact" : "Add contact"}
      </h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <input
        name="phone"
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <div className="dflex" />
      <label>
        <input
          name="type"
          type="radio"
          value="personal"
          onChange={handleChange}
          checked={type === "personal"}
        />{" "}
        Personal{" "}
      </label>
      <label>
        <input
          name="type"
          type="radio"
          value="professional"
          onChange={handleChange}
          checked={type === "professional"}
        />{" "}
        Professional
      </label>
      <div>
        <input
          type="submit"
          value={current ? "Update" : "Add"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <button onClick={clearAll} className="btn btn-dark btn-block">
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;
