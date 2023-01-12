import React from "react";
import "./ContactUs.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const form = useRef();

  function sendEmail(event) {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_wxi5yhp",
        "template_g4evqnh",
        form.current,
        "AylC8SYvovoqGOB_4"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    event.target.reset();
  }

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left-left">
          <h1>CONTACT US</h1>
        </div>
        <div className="right-right">
          <form ref={form} onSubmit={sendEmail} className="form_container">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              required
              className="input"
            />

            <input
              type="email"
              placeholder="Email"
              name="user_email"
              required
              className="input"
            />

            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              className="input"
            />

            <textarea
              name="message"
              cols="50"
              rows="10"
              className="input"
              placeholder="Message"
            />

            <button type="submit" className="green_btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
