import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const generos = {
  Action: "Ação",
  Adventure: "Aventura",
  Animation: "Animação",
  Biography: "Biografia",
  Comedy: "Comédia",
  Crime: "Crime",
  Documentary: "Documentário",
  Drama: "Drama",
  Family: "Família",
  Fantasy: "Fantasia",
  History: "História",
  Horror: "Terror",
  Music: "Música",
  Mystery: "Mistério",
  Romance: "Romance",
  SciFi: "Ficção Científica",
  Sport: "Esporte",
  Thriller: "Suspense",
  War: "Guerra",
  Western: "Faroeste"
};

const traduzirGeneros = (texto, language) => {
  if (!texto) return "";

  if (language === "en") return texto;

  return texto
    .split(",")
    .map((g) => generos[g.trim()] || g)
    .join(", ");
};

const MovieDescription = (props) => {

  const [movieDesc, setMovieDesc] = useState({});
  const [plotTraduzido, setPlotTraduzido] = useState("");

  useEffect(() => {

    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then(async (data) => {

        setMovieDesc(data);

        // Se idioma for inglês, não traduz
        if (props.language === "en") {
          setPlotTraduzido(data.Plot);
          return;
        }

        // Traduzir sinopse para PT
        try {

          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(data.Plot)}`
          );

          const translated = await res.json();

          setPlotTraduzido(translated[0][0][0]);

        } catch (error) {

          console.error("Erro ao traduzir:", error);
          setPlotTraduzido(data.Plot);

        }

      })
      .catch((error) => console.error(error));

  }, [props.movieID, props.apiUrl, props.language]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>

      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt={movieDesc.Title} />

          <button className={styles.btnClose} onClick={props.click}>
            {props.language === "pt" ? "Fechar" : "Close"}
          </button>

          <div className={styles.movieType}>
            <div>

              <img src="/jjflix.png" alt="Logo" />

              {movieDesc.Type === "movie"
                ? props.language === "pt"
                  ? "🎬 Filme"
                  : "🎬 Movie"
                : props.language === "pt"
                ? "📺 Série"
                : "📺 Series"}

              <h1>{movieDesc.Title}</h1>

              <a
                href={`https://google.com/search?q=${encodeURIComponent(
                  movieDesc.Title + " assistir online"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.language === "pt" ? "▶️ Assistir" : "▶️ Watch"}
              </a>

            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>

          <div className={styles.containerFlex}>
            ⭐ {props.language === "pt" ? "Avaliação" : "Rating"}: {movieDesc.imdbRating} |
            ⏱ {props.language === "pt" ? "Duração" : "Runtime"}: {movieDesc.Runtime} |
            📅 {props.language === "pt" ? "Lançamento" : "Released"}: {movieDesc.Released}
          </div>

          <div className={styles.containerFlex}>
            <p>
              🎭 {props.language === "pt" ? "Elenco" : "Cast"}: {movieDesc.Actors}
            </p>

            <p>
              🎬 {props.language === "pt" ? "Gênero" : "Genre"}:{" "}
              {traduzirGeneros(movieDesc.Genre, props.language)}
            </p>
          </div>

        </div>

        <div className={styles.desc}>
          <p>
            📖 {props.language === "pt" ? "Sinopse" : "Plot"}:{" "}
            {plotTraduzido || (props.language === "pt" ? "Carregando..." : "Loading...")}
          </p>
        </div>

      </div>

    </div>
  );
};

export default MovieDescription;