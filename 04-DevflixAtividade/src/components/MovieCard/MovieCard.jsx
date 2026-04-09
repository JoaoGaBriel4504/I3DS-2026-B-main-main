import { useState, useEffect } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {

  const [modalAberto, setModalAberto] = useState(false);
  const [titulo, setTitulo] = useState(props.Title);

  const alternarModal = () => {
    setModalAberto(!modalAberto);
  };

  // Traduzir tipo dependendo do idioma
  const traduzirTipo = (tipo) => {

    if (props.language === "en") return tipo;

    switch (tipo) {
      case "movie":
        return "Filme";
      case "series":
        return "Série";
      case "episode":
        return "Episódio";
      default:
        return tipo;
    }
  };

  // Traduzir título apenas quando idioma for PT
  useEffect(() => {

    const traduzirTitulo = async () => {

      if (props.language === "en") {
        setTitulo(props.Title);
        return;
      }

      try {

        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(props.Title)}`
        );

        const data = await res.json();

        setTitulo(data[0][0][0]);

      } catch (error) {
        console.error("Erro ao traduzir título:", error);
        setTitulo(props.Title);
      }

    };

    traduzirTitulo();

  }, [props.Title, props.language]);

  return (
    <>
      <div className={styles.movie} onClick={alternarModal}>

        {/* Ano */}
        <div>
          <p>{props.Year}</p>
        </div>

        {/* Poster */}
        <div>
          <img src={props.Poster} alt={titulo} />
        </div>

        {/* Informações */}
        <div>
          <span>{traduzirTipo(props.Type)}</span>
          <h3>{titulo}</h3>
        </div>

      </div>

      {modalAberto && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          click={alternarModal}
          language={props.language}
        />
      )}
    </>
  );
};

export default MovieCard;