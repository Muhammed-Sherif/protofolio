import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Portfolio. Built with React & Laravel expertise.</p>
      </div>
    </footer>
  );
}

export default Footer;
