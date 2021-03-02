import React from "react";
import Meta from "./meta";

const ShopBot = () => {
  return (
    <React.Fragment>
      <Meta title="ShopSpot | Help" />
      <div className="container">
        <iframe
          title="ShopBot"
          className="col col-md-12 col-12 px-0"
          height="600"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/26b7f627-170b-40a3-9f70-069215e64dff"
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default ShopBot;
