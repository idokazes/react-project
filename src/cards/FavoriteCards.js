import { useContext, useEffect, useState } from "react";
import { GeneralContext, TOKEN } from "../App";
import "./Cards.css";
import { search } from "../components/Searchbar";
import SingleCard from "./SingleCard";

export default function FavoriteCards() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const { setLoader, user, roleType, snackbar, searchWord, setCards } =
    useContext(GeneralContext);

    useEffect(() => {
      if (user) {
        try {
          fetch(`https://api.shipap.co.il/cards/favorite?token=${TOKEN}`, {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => setFavoriteCards(data));
        } catch (err) {
          throw err;
        }
      }
    }, [user]);

  return (
    <div className="Cards">
      <header>
        <h1>My Favorites</h1>
      </header>

      <div className="row">
        {favoriteCards
          .filter((c) => search(searchWord, c.title, c.description, c.subTitle))
          .map((c) => (
            <SingleCard key={c.id} c={c} setCards={setFavoriteCards} setFavoriteCards={setFavoriteCards} cards={favoriteCards}/>
          ))}
      </div>
    </div>
  );
}