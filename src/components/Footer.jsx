const Footer = () => {
  return (
    <footer>
      <p>
        &copy; 2025{" "}
        {new Date().getFullYear() > 2025 && `- ${new Date().getFullYear()}`}
        Exhibition Curator. All Rights Reserved.
      </p>
      <p>
        Designed by{" "}
        <a href="https://github.com/zairacodes" target="_blank">
          zairacodes
        </a>
      </p>
    </footer>
  );
};

export default Footer;
