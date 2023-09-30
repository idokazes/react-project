import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import "./Footer.css";
import { GeneralContext } from "../App";

export default function Footer() {
  const { user } = useContext(GeneralContext);
  return (
    <div className="footer-container">
      <Link to="/about" className="footer-link-wrapper">
        <InfoOutlinedIcon/>
        <div className="footer-text">About</div>
      </Link>
      {user && (
        <>
          <Link to="/favorite" className="footer-link-wrapper">
            <StarBorderPurple500OutlinedIcon/>
            <div className="footer-text">Favorites</div>
          </Link>
          <Link to="/my-cards" className="footer-link-wrapper">
            <DashboardOutlinedIcon/>
            <div className="footer-text">My cards</div>
          </Link>
        </>
      )}
    </div>
  );
}
