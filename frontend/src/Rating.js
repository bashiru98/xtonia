import React from "react";
import "./Rating.css";
function Rating(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        <i
          className={
            props.value >= 1
              ? "fa fa-star"
              : props.value >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 2
              ? "fa fa-star"
              : props.value >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 3
              ? "fa fa-star"
              : props.value >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 4
              ? "fa fa-star"
              : props.value >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 5
              ? "fa fa-star"
              : props.value >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <div>({props.text ? props.text : ""})</div>
    </div>
  );
}

export default Rating;
