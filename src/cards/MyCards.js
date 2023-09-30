import { useContext, useEffect, useState } from "react";
import { GeneralContext, TOKEN } from "../App";
import { search } from "../components/Searchbar"
import SingleCard from "./SingleCard"
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Cards.css";

export default function MyCards() {

  const [myCards, setMyCards] = useState([]);
  const { setLoader, searchWord, user } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setMyCards(data)
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoader(false));
  }, []);

  console.log(user);

  return (
    <>
    {myCards && 
    
    <div className="Cards">
      <header>
        <h1>הכרטיסיות שלי</h1>
      </header>

      <div className="row">
        {myCards
          .filter((c) => search(searchWord, c.title, c.description, c.subTitle))
          .map((c) => (
            <SingleCard key={c.id} c={c} setCards={setMyCards} cards={myCards}/>
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
    }
    </>
  )
}
