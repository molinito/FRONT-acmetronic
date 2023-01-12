import React from "react";
import "./Footer.css";
import { Nav } from "react-bootstrap";
import face from "../../Assets/faceb.png";
import instagram from "../../Assets/instagram.png";
import twitter from "../../Assets/twitter.png";

function Footer() {
  return (
    <div className="footer">
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/shop">Shopping</a>
      </li>
      <li>
        <a href="/about">Privacy policy</a>
      </li>
      <li>
        <a href="/about">Terms and conditions</a>
      </li>
      <li>
        <a href="/about">Frequently asked questions</a>
      </li>
      <li>
        <a href="/contact">Contact us</a>
      </li>

      <div className="footerText">
        <p>© 2022 ACMEtronics. Todos los derechos reservados.</p>
      </div>

      <Nav className="auto">
        <h5>Follow us :</h5>
        <Nav.Link href="https://facebook.com/ACMEtronics">
          <img src={face} />
        </Nav.Link>
        <Nav.Link href="https://instagram.com/ACMEtronics">
          <img src={instagram} />
        </Nav.Link>
        <Nav.Link href="https://twitter.com/ACMEtronics">
          <img src={twitter} />
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Footer;
