import { footerLinks } from "../constants/navbar-links";

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p>
          More ways to shop: Find an Apple Store or other retailer new you.
          Order now
        </p>
        <img src="/logo.svg" alt="Apple Logo" />
      </div>

      <hr />

      <div className="links">
        <p>Copyright &copy; 2024 Apple Inc. All rights reserved</p>

        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
