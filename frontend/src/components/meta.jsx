import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

// default props
Meta.defaultProps = {
  title: "ShopSpot",
  description: "Brilliant Basic !!",
  content: "electronics, clothing ,cheap price",
};

export default Meta;
