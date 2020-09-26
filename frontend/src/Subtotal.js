import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";

function Subtotal({ history, cartItems }) {
  const handleCheckout = () => {
    history.location.push("/signin?redirect=shipping");
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
              <strong>{`${value}`}</strong>{" "}
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
