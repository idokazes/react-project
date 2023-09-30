import { useContext } from "react";
import { GeneralContext } from "../App";
import "./Account.css";
import { RoleTypes } from "../config";

export default function Account() {
  const { user, roleType } = useContext(GeneralContext);

  function getKeyByValue(object, value) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return key;
      }
    }
    return null;
  }

  return (
    <>
      {user && (
        <div className="account-container">
          <div className="account-overlay">
            <h1 className="account-title">פרטי משתמש</h1>
            <div className="account-content">
              <div className="account-text ">
                <h3>
                  {`שם מלא:  `}
                  {`${user.firstName} ${user.middleName} ${user.lastName}`}
                </h3>
              </div>
              <div className="account-text ">
                <h3>
                  {`סוג משתמש:`} {getKeyByValue(RoleTypes, roleType)}
                </h3>
              </div>
              <div className="account-text ">
                <h3>
                  {`כתובת מייל:`} {user.email}
                </h3>
              </div>
              <div className="account-text ">
                <h3>
                  {`טלפון:`} {user.phone}
                </h3>
              </div>
              <div className="account-text ">
                <h3>
                  {`כתובת:  `}  
                  {`${user.street} ${user.houseNumber}, ${user.city} ${user.country}`}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
