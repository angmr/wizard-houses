"use client";
import {useState, useEffect} from "react";
import styles from "./page.module.css";
import searcbarstyles from "./components/SearchBar.module.css";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [houses, setHouses] = useState<any[]>([]);
  const [houseSearch, setHouseSearch] = useState("");
  const [traitSearch, setTraitSearch] = useState("");
  const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    fetch("http://localhost:3001/houses")
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
          {filteredHouses.map((house: any) => (
            <li key={house.id}>
              <div className={styles.housecontainer}>
                <div className={styles.housenamecontainer}>
                  <span className={styles.housename}> {house.name}</span>
                  <span className={styles.houseanimal}> {house.animal}</span>
                </div>
                <div className={styles.housegradient}
                style={{
                  background: `linear-gradient(135deg, ${
                  house.houseColours.split(" and ").map((c:string) => c.trim()).join(", ")
                })`
              }}></div>
                <p className={styles.housefounder}>Founder: <strong>{house.founder}</strong></p>
                <SearchBar
                  value={traitSearch}
                  onChange={(e) => setTraitSearch(e.target.value)}
                  placeholder="Search traits"
                  className={searcbarstyles.traitsearch}
                />
                <ul className={styles.housetraitscontainer}>
                  {house.traits
                    .filter((trait: any) =>
                      trait.name.toLowerCase().includes(traitSearch.toLowerCase())
                    )
                  .map((trait: any, idx: number) => (
                    <li className={styles.housetrait} key={trait.id ?? idx}>{trait.name}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
