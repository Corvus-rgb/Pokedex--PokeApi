import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./pokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API ="https://pokeapi.co/api/v2/pokemon?limit=500";

  useEffect(() => {
    let isMounted = true;

    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        const detailedPokemonData = data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          const data = await res.json();
          console.log(data);
          return data;
        });

        const detailedResponses = await Promise.all(detailedPokemonData);

        if (isMounted) {
          setPokemon(detailedResponses);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        if (isMounted) {
          setLoading(false);
          setError(error);
        }
      }
    };

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, [API]);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        <img
          src="/src/assets/porygonZ.gif"
          alt="Loading"
        />
        <span>Calculating...</span>
      </div>
    );
  }

  if (error) {
  return (
    <div className="error">
      <h1 className="error-msg">
        <i className="ri-error-warning-line"></i> Error
      </h1>
    </div>
  );
}

  return (
    <>
      <section className="container">
        <header className="title">
          <h1>PokéApi</h1>
          <img
            src="/src/assets/porygon1.gif"
            alt="Porygon1"
          />
          <h1>Archive</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search your favorite Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Mensaje de Pok-not found*/}
        {searchData.length === 0 && search && (
          <div className="no-results">
            
            <p>No Pokémon found matching "{search}"</p>
            <span> <img src="/src/assets/unown.png" alt="Unown"/>  </span> 
          </div>
        )}

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};