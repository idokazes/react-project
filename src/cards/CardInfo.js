import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TOKEN } from "../App";
import "./cardInfo.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CardInfo() {
  const { id } = useParams();
  const [cardData, setCardData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      try {
        fetch(`https://api.shipap.co.il/cards/${id}?token=${TOKEN}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setCardData(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);
  console.log(cardData);

  return (
    <>
      {cardData && (
        <div
          className="card-info"
          style={{
            backgroundImage: `url(${cardData.imgUrl})`,
          }}
        >
          <div className="card-overlay">
            <div className="content-wrapper">
              <Link to={"/"}>
                <CancelIcon
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    color: "#fff",
                  }}
                />
              </Link>
              <h1 className="content-title">{cardData.title}</h1>
              <h2 className="content-subtitle">{cardData.subtitle}</h2>
              <div className="content-description">{cardData.description}</div>
              <div className="content-phone content-container">
                <LocalPhoneIcon className="content-icon"/>
                <div >{cardData.phone}</div>
              </div>
              <div className="content-email content-container">
                <MailOutlineIcon className="content-icon"/>
                <div >{cardData.email}</div>
              </div>
              <a className="content-web content-container" href={cardData.web} target="blank">
                <LanguageIcon className="content-icon"/>
                <div> {cardData.web}</div>
              </a>
              <div className="content-adress content-container">
                <LocationOnIcon className="content-icon"/>
                <div >
                  {" "}
                  {cardData.houseNumber} {cardData.street} {cardData.country},{" "}
                  {cardData.city}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
