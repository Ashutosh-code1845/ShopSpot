import React, { useState } from "react";
import "../css/header.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <form
        className="form-inline my-2 my-lg-0 mr-4 ml-2"
        onSubmit={submitHandler}
      >
        <input
          className="form-control mr-sm-2"
          type="text"
          name="q"
          id="search-box"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        ></input>
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="submit"
          id="butt-effect"
        >
          Search
        </button>
      </form>
    </React.Fragment>
  );
};

export default SearchBox;
