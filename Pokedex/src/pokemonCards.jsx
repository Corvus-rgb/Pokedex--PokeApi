export const PokemonCards = ({ pokemonData }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={
            pokemonData.sprites?.versions?.['generation-v']?.['black-white']?.animated
              ?.front_default ?? pokemonData.sprites?.front_default
          }
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>
    <div className="Card-pokemonid">
            <div className="pokemon-Number">
              <img src="/src/assets/pokeball.png" alt="Pokeball"/>
              <span className="pokemon-id">#{pokemonData.id}</span>
             </div>
               
      <h1 className="pokemon-name">{pokemonData.name}</h1>
    </div>
      <div className="pokemon-info pokemon-highlight">
        <p>
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>
    
      <div className="grid-three-cols">
        <div className="pokemon-info">
          <span>Height</span>
          <p>{pokemonData.height}</p>
        </div>
        <div className="pokemon-info">
          <span>Weight</span>
          <p>{pokemonData.weight}</p>
        </div>
      </div>
      <div className="grid-three-cols">
        <div className="pokemon-info">
          <span>Abilities</span>
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
        </div>
        <div className="pokemon-info">
          <span>Hidden Ability</span>
          <p>
            {pokemonData.abilities
              .filter((abilityInfo) => abilityInfo.is_hidden)
              .map((abilityInfo) => abilityInfo.ability.name)
              .join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </li>
  );
};