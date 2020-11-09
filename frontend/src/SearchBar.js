import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { listProducts } from "./actions/productAction";
import { useDispatch } from "react-redux";
import "./Header.css";

const SearchBar = (props) => {
  const [searchKeyword, setSearchKeyWord] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(listProducts(category, searchKeyword));
  };

  return (
    <div className="header-search">
      <input
        type="text"
        className="header-searchInput"
        name="searchKeyword"
        onChange={(e) => setSearchKeyWord(e.target.value)}
      />
      <SearchIcon
        type="submit"
        className="header-searchIcon"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SearchBar;
