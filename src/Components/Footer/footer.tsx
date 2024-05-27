import React from "react";
import "../../Styles/_main.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-heading">About</h3>
        <ul className="footer-links">
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/faqs">FAQs</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Legal</h3>
        <ul className="footer-links">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/disclaimer">Disclaimer</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Contact Us</h3>
        <ul className="footer-links">
          <li>
            <a href="/address">Address</a>
          </li>
          <li>
            <a href="/phone">Phone</a>
          </li>
          <li>
            <a href="/email">Email</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
