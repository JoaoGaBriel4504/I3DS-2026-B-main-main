import React from "react";
import styles from "./Rodape.module.css";

const Rodape = ({ children, link, language }) => {
  return (
    <footer className={styles.footer}>
      <p>
        {language === "pt"
          ? "Feito com ❤️ por "
          : "Made with ❤️ by "}

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      </p>
    </footer>
  );
};

export default Rodape;