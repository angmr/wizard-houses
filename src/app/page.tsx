// Home fetches and filters houses, manages the main search, and renders a list of HouseCard components.
// Each house is rendered as a <li> containing a <HouseCard house={house} />.
// Search: The main search bar filters houses by name.
// Loading State: Spinner is shown while loading.

"use client";
import {useState, useEffect} from "react";
import type { House } from "./types";
import styles from "./page.module.css";
import searcbarstyles from "./components/SearchBar.module.css";
import SearchBar from "./components/SearchBar";
import HouseCard from "./components/HouseCard";

export default function Home() {
  const [houses, setHouses] = useState<House[]>([]);
  const [houseSearch, setHouseSearch] = useState("");
  const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses`)
      .then((res) => res.json())
      .then((data) => {       
        setHouses(data);
        setLoading(false);
      });
  }, []);

  // Filter houses by search value
  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(houseSearch.toLowerCase())
  );

  if (loading) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.spinner}>Loading...</div>
      </main>
    </div>
  );
}

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchBar
          value={houseSearch}
          onChange={(e) => setHouseSearch(e.target.value)}
          placeholder="Search houses"
          className={searcbarstyles.housesearch}
        />
        <ul>
          {filteredHouses.map((house) => (
           <li key={house.id}>
            <HouseCard house = {house} />
           </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
