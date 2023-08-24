import React from "react";
import "./Footer.css";
import data from "../../assets/jsondata/footerdata.json";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-items">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.header}</h2>
              <div className="footer-list">
                {item.footer.map((item, index) => {
                  return (
                    <Link to={item.url} key={index}>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
