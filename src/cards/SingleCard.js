import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { GeneralContext, TOKEN } from "../App";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./Cards.css";

export default function SingleCard({ c, setCards, cards }) {
  const { setLoader, user, roleType, snackbar } = useContext(GeneralContext);
  const pathname = useLocation().pathname;
  const isMyCards = pathname === "/my-cards";

  const handleRemoveCard = (id) => {
    if (user?.admin) {
      setLoader(true);
      fetch(`https://api.shipap.co.il/admin/cards/${id}?token=${TOKEN}`, {
        credentials: "include",
        method: "DELETE",
      })
        .then(() => {
          setCards(cards.filter((c) => c.id !== id));
          snackbar("הכרטיסייה נמחקה בהצלחה");
        })
        .catch((err) => {
          console.log(err);
          snackbar("שגיאה במחיקה");
        })
        .finally(() => setLoader(false));
    }
    
    if (user?.business) {
      setLoader(true);
      fetch(`https://api.shipap.co.il/business/cards/${id}?token=${TOKEN}`, {
        credentials: "include",
        method: "DELETE",
      })
        .then(() => {
          setCards(cards.filter((c) => c.id !== id));
          snackbar("הכרטיסייה נמחקה בהצלחה");
        })
        .catch((err) => {
          console.log(err);
          snackbar("שגיאה במחיקה");
        })
        .finally(() => setLoader(false));
    }
  };

  const favorite = (id) => {
    fetch(`https://api.shipap.co.il/cards/${id}/favorite?token=${TOKEN}`, {
      credentials: "include",
      method: "PUT",
    }).then(() => {
      const newList = cards.map((card) => {
        if (card.id === id) {
          return { ...card, favorite: true };
        } else return card;
      });
      setCards(newList);
      snackbar("הכרטיסייה נוספה למועדפים");
    });
  };

  const unfavorite = (id) => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards/${id}/unfavorite?token=${TOKEN}`, {
      credentials: "include",
      method: "PUT",
    })
      .then(() => {
        const newList = cards.map((card) => {
          if (card.id === id) {
            return { ...card, favorite: false };
          } else return card;
        });
        setCards(newList);
        snackbar("הכרטיסייה נמחקה מהמועדפים");
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="single-card">
      <div className="row">
        <Card
          className="column"
          sx={{
            width: 300,
            mb: 5,
            boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.11)",
            borderRadius: "10px",
          }}
          key={c.title}
        >
          <CardMedia
            component="img"
            height="210"
            image={c.imgUrl}
            alt={c.imgAlt}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                color: "black",
                fontSize: 32,
              }}
            >
              {c.title}
            </Typography>
            <Typography style={{ marginTop: 20, fontSize: 16 }}>
              <b>טלפון:</b> {c.phone}
              <br />
              <b>כתובת:</b> {c.houseNumber} {c.street} {c.country}, {c.city}{" "}
              <br />
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "inherit",
            }}
          >
            {(roleType === 3 || isMyCards) && (
              <IconButton
                className="trash-icon"
                onClick={() => handleRemoveCard(c.id)}
                aria-label="delete"
              >
                <DeleteIcon style={{ color: "grey" }} />
              </IconButton>
            )}

            {isMyCards && (
              <Link to={`/edit-card/${c.id}`} className="link">
                <IconButton>
                  <EditIcon style={{ color: "grey" }} />
                </IconButton>
              </Link>
            )}

            <Link to={`/card/${c.id}`} className="link">
              <IconButton>
                <InfoIcon style={{ color: "grey" }} />
              </IconButton>
            </Link>

            {user && (
              <IconButton
                className="heart-icon"
                aria-label="add to favorites"
                onClick={() => (c.favorite ? unfavorite(c.id) : favorite(c.id))}
              >
                <FavoriteIcon style={{ color: c.favorite ? "red" : "grey" }} />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
