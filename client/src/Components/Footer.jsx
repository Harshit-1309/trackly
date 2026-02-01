import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
                <Link to="/contact" className="footer-link">Contact Support</Link>
            </div>
            <div className="footer-copy">
                &copy; {new Date().getFullYear()} Gooner Technologies Pvt Ltd. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
