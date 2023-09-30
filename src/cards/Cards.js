import { useContext, useEffect, useState } from "react";
import { GeneralContext, TOKEN } from "../App";
import { Link } from "react-router-dom";
import "./Cards.css";
import { search } from "../components/Searchbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SingleCard from "./SingleCard";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const { setLoader, user, roleType, snackbar, searchWord } =
    useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards?token=${TOKEN}`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="Cards">
      <header>
        <h1>Welcome to Easydate</h1>
        <p>מוזמנים לעיין במגוון הרחב של האטרקציות כאן למטה</p>
      </header>

      <div className="row">
        {cards
          .filter((c) => search(searchWord, c.title, c.description, c.subTitle))
          .map((c) => (
            <SingleCard key={c.id} c={c} setCards={setCards} cards={cards}/>
          ))}
      </div>
      {user && (
        <button className="addCard">
          <Link to={"/business/cards/new"}>
            <AddCircleIcon color="#000" />
          </Link>
        </button>
      )}
    </div>
  );
}