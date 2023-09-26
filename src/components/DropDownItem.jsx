import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../icons/logout.svg";

export default function DropDownItem({ link, type, Icon }) {
    if (type == "Logout") {
      return (
        <div>
          <button onClick={link} type="button">
            <LogoutIcon />
            {type}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            to={link}
            style={{
              textDecoration: "none",
            }}
          >
            <button type="button">
              <Icon />
              {type}
            </button>
          </Link>
        </div>
      );
    }
}