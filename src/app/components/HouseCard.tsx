// Using a single traitSearch state for all house cards causes the following issue:
// the search applies to all houses at once. When you type in the trait search bar for one house,
// it updates the search for all house cards at once.
// Turning each house card into its own component and moving the traitSearch state inside 
// this component solves this issue, as now each card manages its own search input independently.
// 
// Props:
// - house: The house object containing its details (name, animal, founder, colours, traits).

"use client";
import React from "react";
import SearchBar from "./SearchBar";
import searcbarstyles from "./SearchBar.module.css";
import housecardstyles from "./HouseCard.module.css";
import type { House, Trait } from "../types";

const HouseCard: React.FC<{ house: House }> = ({ house }) => {
  const [traitSearch, setTraitSearch] = React.useState("");

  const filteredTraits = house.traits.filter(trait =>
    trait.name.toLowerCase().includes(traitSearch.toLowerCase())
  );

  return (
    <div className={housecardstyles.housecontainer}>
    <div className={housecardstyles.housenamecontainer}>
        <span className={housecardstyles.housename}> {house.name}</span>
        <span className={housecardstyles.houseanimal}> {house.animal}</span>
    </div>
    <div className={housecardstyles.housegradient}
    style={{
        background: `linear-gradient(135deg, ${
        house.houseColours.split(" and ").map((c:string) => c.trim()).join(", ")
    })`
    }}></div>
    <p className={housecardstyles.housefounder}>Founder: <strong>{house.founder}</strong></p>
    <SearchBar
        value={traitSearch}
        onChange={(e) => setTraitSearch(e.target.value)}
        placeholder="Search traits"
        className={searcbarstyles.traitsearch}
    />
    <ul className={housecardstyles.housetraitscontainer}>
        {filteredTraits.map((trait: Trait) => (
          <li className={housecardstyles.housetrait} key={trait.id}>{trait.name}</li>
        ))}
    </ul>
    </div>
  );
};

export default HouseCard;