import React from "react";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Contact Support</a>
            </div>
            <div className="footer-copy">
                &copy; {new Date().getFullYear()} TimeTracker. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
