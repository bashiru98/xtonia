import React, { Fragment, useState } from "react";

import "./Header.css";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CloseIcon from "@material-ui/icons/Close";

import { Link } from "react-router-dom";
import { logout } from "./actions/userActions";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./SearchBar";
const Header = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location = "/";
  };

  return (
    <Fragment>
      <div className="sidebar ">
        <div className="top-sidebar">
          <h3 className="category">Category</h3>
          <CloseIcon className="closebutton" onClick={closeMenu}></CloseIcon>
        </div>

        <ul>
          <li>
            <Link
              className="item-link"
              to="/category/computers"
              onClick={closeMenu}
            >
              Computers
            </Link>
          </li>
          <li>
            <Link
              className="item-link"
              to="/category/electronics"
              onClick={closeMenu}
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              computers1
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Computers
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Computers
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              {" "}
              Shirts
            </Link>
          </li>
          <li>
            <Link className="item-link" to="/" onClick={closeMenu}>
              Shirts
            </Link>
          </li>
        </ul>
      </div>
      <nav className="header">
        <button className="hm-icon" onClick={openMenu}>
          &#9776;
        </button>

        <Link to="/">
          <img
            className="header-logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>
        <SearchBar {...props} />
        <div className="headerNav">
          {userInfo ? (
            <Link to="/profile" className="headerLink">
              <div className="header-option">
                <span className="header-optionLineOne">Welcome </span>
                <span className="header-optionLineTwo">{userInfo.name}</span>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="headerLink">
              <div className="header-option">
                <span className="header-optionLineOne">Welcome </span>
                <span className="header-optionLineTwo">Login</span>
              </div>
            </Link>
          )}

          <Link to="/" className="headerLink">
            <div className="header-option">
              <span className="header-optionLineOne">Returns &</span>
              <span className="header-optionLineTwo">Orders</span>
            </div>
          </Link>
          {userInfo && (
            <Link to="/logout" className="headerLink">
              <div className="header-option" onClick={handleLogout}>
                <span className="header-optionLineOne">Logout</span>
                <span className="header-optionLineTwo">account</span>
              </div>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <a href="#" className="headerLink">
                admin
              </a>
              <ul className="dropdown-content">
                <li>
                  <div className="drop-links">
                    <Link className="dropdown-link1" to="/orders">
                      Orders
                    </Link>

                    <Link className="dropdown-link2" to="/products">
                      Products
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <Link to="/" className="headerLink">
            <div className="header-option">
              <span className="header-optionLineOne">Your</span>
              <span className="header-optionLineTwo">Prime</span>
            </div>
          </Link>
          <Link to="/cart" className="headerLink">
            <div className="header-optionBasket">
              <ShoppingBasketIcon />
              <span className="header-optionLineTwo header-basketCount">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
