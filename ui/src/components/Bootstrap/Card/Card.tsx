import React from "react";
import { Link } from "react-router-dom";

export interface Props {
  title: string;
  description: string;
  href?: string;
}

const Card: React.FunctionComponent<Props> = ({ title, description, href }) => (
  <div className="card h-100">
    <div className="card-body">
      {href ? (
        <Link to={href} className="card-title">
          {title}
        </Link>
      ) : (
        <h5 className="card-title">{title}</h5>
      )}
      <p className="card-text">{description}</p>
    </div>
  </div>
);
export default Card;
