import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/jgflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("pt");

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // Alternar tema
  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  // Alternar idioma
  const toggleLanguage = () => {
    const novoIdioma = language === "pt" ? "en" : "pt";
    setLanguage(novoIdioma);
    localStorage.setItem("language", novoIdioma);
  };

  // Carregar preferências salvas
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }

    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Buscar filmes
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  // Filme inicial
  useEffect(() => {
    searchMovies("Hulk");
  }, []);

  return (
    <div id="App">

      {/* BOTÃO DARK/LIGHT */}
      <button className="themeButton" onClick={toggleTheme}>
        {darkMode
          ? language === "pt"
            ? "☀️ Modo Claro"
            : "☀️ Light Mode"
          : language === "pt"
          ? "🌙 Modo Escuro"
          : "🌙 Dark Mode"}
      </button>

      {/* BOTÃO DE IDIOMA */}
      <button className="languageButton" onClick={toggleLanguage}>
        {language === "pt" ? "🇧🇷 PT-BR" : "🇺🇸 EN"}
      </button>

      <img
        id="Logo"
        src={logo}
        alt={
          language === "pt"
            ? "Logotipo do serviço de streaming JGFLIX"
            : "JGFLIX streaming service logo"
        }
      />

      {/* BUSCA */}
      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={
            language === "pt"
              ? "Procurar por filmes"
              : "Search for movies"
          }
        />

        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt={language === "pt" ? "Botão de pesquisa" : "Search button"}
        />
      </div>

      {/* LISTA DE FILMES */}
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              Title={movie.Title}
              Year={movie.Year}
              Poster={movie.Poster}
              Type={movie.Type}
              imdbID={movie.imdbID}
              apiUrl={apiUrl}
              language={language}
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">
          {language === "pt"
            ? "🤬 Filme não encontrado 😭, pesquise por outro"
            : "🤬 Movie not found 😭, try another search"}
        </h2>
      )}

      <Rodape
  link={"https://github.com/JoaoGaBriel4504"}
  language={language}
>
  JoaoGabriel
</Rodape>

    </div>
  );
};

export default App;