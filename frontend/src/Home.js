import React from "react";
import "./Home.css";
import Product from "./Product";
function Home(props) {
  const category = props.match.params.id ? props.match.params.id : "";
  return (
    <div className="home">
      <img
        className="home-image"
        src="https://images.unsplash.com/photo-1574307469572-8c85b75c8903?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        alt=""
      />

      <div className="home-row">
        <Product category={category} />
      </div>
    </div>
  );
}

export default Home;
